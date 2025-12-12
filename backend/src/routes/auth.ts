import type { Request, Response } from "express";
import { Router } from "express";
import type { PrismaClient } from "../db/generated/prisma/client";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";
import { authMiddleware, type AuthRequest } from "../middleware/authMiddleware";

export function createAuthRouter(prisma: PrismaClient) {
  const router = Router();

  /**
   * @route POST /auth/signup
   * @description Register a new user
   * @body { email: string, password: string, name: string, role?: 'USER' | 'RESTAURANT' | 'ADMIN' }
   * @returns { id, email, name, role, token }
   */
  router.post("/signup", async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, name, role = "USER" } = req.body;

      // Validate input
      if (!email || !password || !name) {
        res
          .status(400)
          .json({ error: "Email, password, and name are required" });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ error: "Password must be at least 6 characters" });
        return;
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(409).json({ error: "User with this email already exists" });
        return;
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * @route POST /auth/login
   * @description Login user and get JWT token
   * @body { email: string, password: string }
   * @returns { id, email, name, role, token }
   */
  router.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Compare password
      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * @route POST /auth/logout
   * @description Logout user (token invalidation happens on client-side)
   * @returns { message: string }
   */
  router.post(
    "/logout",
    authMiddleware,
    (req: AuthRequest, res: Response): void => {
      try {
        // Token invalidation is typically handled on client-side by removing the token
        // This endpoint can be used for server-side logging
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  /**
   * @route GET /auth/me
   * @description Get current user profile
   * @returns { id, email, name, role }
   */
  router.get(
    "/me",
    authMiddleware,
    async (req: AuthRequest, res: Response): Promise<void> => {
      try {
        if (!req.user) {
          res.status(401).json({ error: "User not authenticated" });
          return;
        }

        const user = await prisma.user.findUnique({
          where: { id: req.user.id },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (!user) {
          res.status(404).json({ error: "User not found" });
          return;
        }

        res.status(200).json(user);
      } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  return router;
}

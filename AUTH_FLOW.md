# Frontend-Backend Authentication Flow

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Frontend (Vite)                       │
│                      http://localhost:5173                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AuthPage.tsx (Sign In / Sign Up)                             │
│       ↓                                                         │
│  useAuth() hook (from AuthContext)                            │
│       ↓                                                         │
│  api.ts (Axios Instance with Interceptors)                    │
│  • Request: Auto-adds JWT token from localStorage             │
│  • Response: Auto-logout on 401 Unauthorized                  │
│       ↓                                                         │
│  CORS enabled requests to backend                             │
│                                                                 │
│  App.tsx wraps all components with <AuthProvider>             │
│  • Global auth state accessible everywhere                    │
│  • Token persists on page refresh                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    HTTP/HTTPS Requests
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Express Backend                               │
│                  http://localhost:5000                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CORS Middleware (allows http://localhost:5173)              │
│       ↓                                                         │
│  /api/auth/signup  - Register new user                        │
│  /api/auth/login   - Authenticate user                        │
│  /api/auth/me      - Get profile (protected)                  │
│  /api/auth/logout  - Clear session                            │
│       ↓                                                         │
│  authMiddleware.ts                                            │
│  • Verifies JWT token from Authorization header               │
│  • Extracts user ID from token payload                        │
│       ↓                                                         │
│  utils/auth.ts                                                │
│  • hashPassword() - bcrypt hashing (10 rounds)                │
│  • comparePassword() - bcrypt verification                    │
│  • generateToken() - JWT creation (7-day expiry)              │
│  • verifyToken() - JWT validation                             │
│       ↓                                                         │
│  Prisma Client                                                │
│       ↓                                                         │
│  PostgreSQL Database (Docker: postgres-db)                    │
│  • users table with roles (USER, RESTAURANT, ADMIN)           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Sign-Up Flow

```
User Input (email, password, name, role)
         ↓
AuthPage validates input
         ↓
useAuth().signup() called
         ↓
axios POST /api/auth/signup
         ↓
Backend:
  • Hash password with bcrypt
  • Create user in PostgreSQL
  • Generate JWT token
  • Return token + user data
         ↓
Frontend:
  • Store token in localStorage ('authToken')
  • Store user data in localStorage ('user')
  • Update AuthContext state
  • Redirect to dashboard
         ↓
All future requests auto-attach token via interceptor
```

## Login Flow

```
User Input (email, password)
         ↓
AuthPage validates input
         ↓
useAuth().login() called
         ↓
axios POST /api/auth/login
         ↓
Backend:
  • Find user by email
  • Compare password with hash using bcrypt
  • Generate JWT token
  • Return token + user data
         ↓
Frontend:
  • Store token in localStorage ('authToken')
  • Store user data in localStorage ('user')
  • Update AuthContext state
  • Redirect to dashboard
         ↓
All future requests auto-attach token via interceptor
```

## Protected Route Flow

```
App needs user data
         ↓
useAuth() returns user from context
         ↓
If user exists → Show dashboard
         ↓
Axios automatically adds:
  Authorization: Bearer {token}
         ↓
Backend middleware verifies token
         ↓
If valid → Process request
If invalid (401) → Interceptor clears token & redirects to home
```

## Logout Flow

```
User clicks Logout button
         ↓
useAuth().logout() called
         ↓
axios POST /api/auth/logout
         ↓
Frontend:
  • Clear token from localStorage
  • Clear user data from localStorage
  • Clear AuthContext state
  • Redirect to home page
         ↓
All authentication state cleared
User must login again to access protected routes
```

## State Management (AuthContext)

```
AuthContext provides:
├── user: User | null
│   ├── id: string
│   ├── email: string
│   ├── name: string
│   ├── role: 'USER' | 'RESTAURANT' | 'ADMIN'
│   └── createdAt: string
│
├── token: string | null (JWT token from /api/auth)
│
├── isLoading: boolean (while auth request is pending)
│
├── error: string | null (last error message)
│
├── signup(): Promise<void>
│   └── Calls /api/auth/signup
│
├── login(): Promise<void>
│   └── Calls /api/auth/login
│
└── logout(): Promise<void>
    └── Calls /api/auth/logout
```

## localStorage Schema

```
localStorage:
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cm45w6...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2024-12-12T10:30:00Z"
  }
}
```

## JWT Token Structure

```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "userId": "cm45w6...",
  "iat": 1702372200,
  "exp": 1702977000  (7 days later)
}

Signature:
HMAC SHA256(
  base64UrlEncode(header) + "." + 
  base64UrlEncode(payload),
  JWT_SECRET
)
```

## Error Handling

```
Auth Errors (returned to frontend):
├── 400 Bad Request
│   ├── "Email already in use"
│   ├── "Invalid email format"
│   └── "Password too short"
│
├── 401 Unauthorized
│   ├── "Invalid email or password"
│   └── "Token expired or invalid"
│
└── 500 Internal Server Error
    └── Database or server error

Frontend handles:
├── Display error message in UI
├── Auto-retry on specific errors
├── Clear token on 401 (auto-logout)
└── Log errors for debugging
```

## Security Features

✅ **Password Security**
  - Bcrypt hashing with 10 salt rounds
  - Never stored in plain text
  - Compared securely with timing-safe methods

✅ **Token Security**
  - JWT with HS256 algorithm
  - 7-day expiration (auto-logout)
  - Signed with JWT_SECRET from environment

✅ **Transport Security**
  - CORS configured for frontend origin only
  - HTTP-only localStorage (JavaScript can access for this setup)
  - Could upgrade to secure cookies for production

✅ **Request Validation**
  - Email format validation
  - Password strength requirements
  - Role-based access control

✅ **Automatic Protection**
  - Axios interceptors auto-attach token
  - Auto-logout on invalid token (401)
  - Token cleared on page reload if expired

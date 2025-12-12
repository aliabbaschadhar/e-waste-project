# Quick API Testing Guide

## 🧪 Test Endpoints

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "USER"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Profile (Protected - use token from login/signup)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📊 Expected Responses

**Successful Signup (201):**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Successful Login (200):**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Get Profile (200):**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "createdAt": "2025-12-12T00:00:00.000Z",
  "updatedAt": "2025-12-12T00:00:00.000Z"
}
```

---

## 🔴 Common Errors

| Error | Status | Cause |
|-------|--------|-------|
| "Email already exists" | 409 | User already registered |
| "Invalid email or password" | 401 | Wrong credentials |
| "Authorization header missing" | 401 | No token provided |
| "Invalid token" | 401 | Token is invalid/malformed |
| "Token expired" | 401 | Token older than 7 days |

---

## 🛠️ Using Postman/Insomnia

1. Set variable `token` to the token from login response
2. Use `Authorization: Bearer {{token}}` header for protected routes
3. All requests use `Content-Type: application/json`

**Variables to set:**
- `baseUrl` = `http://localhost:5000`
- `token` = (paste JWT from login response)

---

**See `IMPLEMENTATION_SUMMARY.md` for complete details**

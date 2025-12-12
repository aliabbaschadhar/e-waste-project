# Quick Start Guide - Frontend-Backend Auth Integration

## 🎯 Start Here (2 minutes)

### 1. Start Backend
```bash
cd backend
bun src/index.ts
```
Expected output: `Server listening on http://localhost:5000`

### 2. Start Frontend (new terminal)
```bash
cd frontend
bun run dev
```
Expected output: `Local: http://localhost:5173`

### 3. Open Browser
Navigate to `http://localhost:5173` and test:
- Create new account
- Login with credentials
- Refresh page (stay logged in)
- Logout

---

## 📋 Common Tasks

### Test Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@test.com",
    "password":"pass123",
    "name":"Test User",
    "role":"USER"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@test.com",
    "password":"pass123"
  }'
```

### Test Protected Route
```bash
curl -H "Authorization: Bearer {token}" \
  http://localhost:5000/api/auth/me
```

### Check Health
```bash
curl http://localhost:5000/health
```

---

## 🔧 Configuration Files

### Backend `.env`
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ewaste
JWT_SECRET=your-super-secret-key-min-32-chars-long
PORT=5000
```

### Frontend (optional) `.env.local`
```
VITE_API_URL=http://localhost:5000
```

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `backend/src/index.ts` | Express server + CORS |
| `backend/src/routes/auth.ts` | Auth endpoints |
| `frontend/src/services/api.ts` | Axios setup |
| `frontend/src/services/authContext.tsx` | Auth state |
| `frontend/src/pages/AuthPage.tsx` | Login/signup UI |
| `frontend/src/App.tsx` | Main app component |

---

## 🔑 Using Auth in Components

```typescript
import { useAuth } from './services';

function MyComponent() {
  const { user, login, signup, logout, isLoading, error } = useAuth();
  
  // user = { id, email, name, role, createdAt }
  // token stored automatically in localStorage
  
  return (
    <>
      {user ? (
        <p>Welcome {user.name}!</p>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
}
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | `lsof -i :5000` then kill process |
| Port 5173 in use | `lsof -i :5173` then kill process |
| "Cannot connect to API" | Check backend running + CORS config |
| "Token invalid" | Clear localStorage, login again |
| Build errors | `bun install` and check TypeScript errors |

---

## 🔒 Security Notes

- Tokens expire in **7 days**
- Passwords hashed with **bcrypt (10 rounds)**
- CORS allows only **localhost:5173**
- JWT signed with **JWT_SECRET** env var
- Invalid tokens = **auto-logout**

---

## 📊 Architecture Overview

```
┌──────────────────────┐
│  React Frontend      │
│  (localhost:5173)    │
└──────────┬───────────┘
           │ useAuth() + Axios
           │ Auto-attach token
           │
┌──────────▼───────────┐
│  Express Backend     │
│  (localhost:5000)    │
└──────────┬───────────┘
           │ Verify JWT
           │
┌──────────▼───────────┐
│  PostgreSQL DB       │
│  (Docker)            │
└──────────────────────┘
```

---

## ✨ Features

✅ JWT authentication  
✅ Bcrypt password hashing  
✅ Auto-token attachment  
✅ Auto-logout on 401  
✅ Token persistence  
✅ Role-based access (USER/RESTAURANT/ADMIN)  
✅ Global state management  
✅ Type-safe API  
✅ Error handling  

---

## 🆘 Need Help?

1. Check error message in browser console
2. Check terminal where server is running
3. Review `INTEGRATION_COMPLETE.md` for detailed info
4. Check `AUTH_FLOW.md` for architecture details
5. Review backend logs: `curl http://localhost:5000/health`

---

**Happy coding! 🚀**

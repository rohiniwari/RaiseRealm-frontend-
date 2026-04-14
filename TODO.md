# Role-Based User Authentication & Dashboards

## Plan
- Add role selector to Register
- Extend AuthContext for role
- Split Dashboard into CreatorDashboard.jsx, BackerDashboard.jsx
- Protected routes + role guard
- Role-specific UI/analytics

## Steps (0/7)

### 1. Backend Ready?
- [ ] Assume backend handles role in register/login response

### 2. Frontend Core
- [ ] Register.jsx: Add role dropdown (creator/backer)
- [ ] AuthContext.jsx: Add role to user object
- [ ] services/authService.js: Pass role in register

### 3. Dashboards
- [ ] Create CreatorDashboard.jsx (projects, analytics, updates)
- [ ] Create BackerDashboard.jsx (contributions, supported, comments)
- [ ] Update Dashboard.jsx → role router

### 4. Protection
- [ ] ProtectedRoute component (role check)
- [ ] Update App.jsx routes

### 5. UI Polish
- [ ] Header adapt role (Creator/Backer tabs)
- [ ] Role badges/personalized greeting

### 6. Test
- [ ] npm run build
- [ ] Test register → role → dashboard

**Next**: Update Register.jsx with role field.


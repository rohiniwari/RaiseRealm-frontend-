# Project Discovery & Search Enhancement (0/10)

## Scope
Upgrade Projects.jsx + backend for smart search/filter/sort w/ debounce, sliders, infinite scroll.

## Backend Plan
**Current**: getProjects(category, search, sort=newest/popular/ending, limit/offset)
**Add**: min_goal/max_goal, status, sort=backers,ending_soon (end_date < 30days), tags (if field)

**Files**:
- backend/controllers/projectController.js: Extend getProjects query (join contributions count, range filters)
- backend/DATABASE_SCHEMA.sql: Add index on goal_amount, status

## Frontend Plan
**Current**: Basic form submit → reload
**Upgrade**:
- Debounce search (300ms)
- Filters: category dropdown, range slider (goal), status toggle, sort dropdown
- Infinite scroll (react-window or useEffect page++)
- Keyword highlight in cards
- Sidebar (desktop)/topbar (mobile)

**Files**:
- frontend/src/pages/Projects.jsx: Debounce + filters + infinite
- New: frontend/src/components/ui/slider.jsx (shadcn)
- projectService.getProjects(page, filters)

## Steps
### Backend (First)
- [ ] 1. Add DB indexes (goal_amount, status)
- [ ] 2. Extend projectController.getProjects (min_goal, max_goal, status, sort=backers)
- [ ] 3. Backend test (curl /projects?min_goal=1000&sort=backers)

### Frontend
- [ ] 4. Install shadcn slider `npx shadcn-ui@latest add slider`
- [ ] 5. Projects.jsx: Debounce (lodash/useDebounce), useState filters, useEffect fetch
- [ ] 6. Infinite scroll (react-infinite-scroll-component)
- [ ] 7. Sidebar filters UI (collapsible)
- [ ] 8. Keyword highlight (mark.js or simple bold)
- [ ] 9. Empty/loading states
- [ ] 10. Test + deploy

**Next**: Backend first - DB indexes + controller upgrade.


# AssessFlow Dashboard

A production-ready patient assessment management dashboard built with React, TypeScript, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **UI Components:** ShadCN UI (Radix primitives)
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **State Management:** React hooks (custom `useAssessments` hook)

## Project Structure

```
src/
├── components/
│   ├── ui/              # ShadCN base components
│   ├── layout/          # Header, Layout
│   └── dashboard/       # Domain-specific components
├── hooks/
│   └── useAssessments.ts   # Single source of truth for app state
├── lib/
│   └── utils.ts         # Utility functions
├── types/
│   └── index.ts         # TypeScript definitions
└── data/
    └── assessments.json # Mock data
```

## Architecture Decisions

### 1. Centralized State Hook (`useAssessments`)

**Decision:** All app state lives in one custom hook.

**Why:**
- Single source of truth for data, filters, pagination, and selection
- Easy to test - logic is decoupled from UI
- Components become pure renderers of props
- No prop drilling issues

**Contract:**
```typescript
{
  data: Assessment[]           // paginated & filtered
  allFilteredData: Assessment[] // filtered but not paginated
  stats: DashboardStats
  filters: FilterState
  pagination: PaginationState
  selectedAssessment: Assessment | null

  // Actions
  setSearch, setStatus, setType, setPage, selectAssessment, clearFilters
}
```

### 2. ShadCN UI for Components

**Decision:** Use ShadCN's Sheet for the detail panel instead of custom implementation.

**Why:**
- Pre-built accessibility (ARIA, keyboard nav, focus trap)
- Smooth animations out of the box
- Customizable with Tailwind
- No reinventing the wheel

### 3. Logic-First Development

**Decision:** Built and tested the hook before any UI.

**Why:**
- Validates business logic independently
- Catches edge cases early
- UI becomes "just skin" over proven logic
- 19 tests cover all critical paths

### 4. Simple Score Gauge

**Decision:** Used basic SVG arc math instead of a charting library.

**Why:**
- No external dependencies for a single component
- ~50 lines of code vs. importing a library
- Fully accessible (shows numeric value)
- Good enough for the use case

## Tradeoffs & Simplifications

| Feature | Decision | Reason |
|---------|----------|--------|
| Date Filter | Static "Last 30 days" | Not specified in requirements, avoided scope creep |
| Sorting | Not implemented | Not in requirements |
| Real API | Mock data only | As specified |
| Pixel-perfect | "Close enough" | 15% of grade, high effort for diminishing returns |
| Dark mode | Not implemented | Not required, would add complexity |

## What I'd Change with More Time

### With a Real Backend

1. **React Query for data fetching:**
   ```typescript
   const { data, isLoading, error } = useQuery(['assessments', filters], fetchAssessments)
   ```

2. **Optimistic updates for selection:**
   - Pre-render panel while fetching full assessment details

3. **Server-side pagination:**
   - Currently client-side, would need API support

### For Production Scale

1. **Virtualization for large lists:**
   - Use `@tanstack/react-virtual` for 1000+ items

2. **Search debouncing:**
   - Currently instant, would add 300ms debounce

3. **Error boundaries:**
   - Graceful degradation per component

4. **Analytics:**
   - Track filter usage, time-to-select, etc.

5. **i18n:**
   - Date formatting, labels, accessibility text

## Testing Strategy

**What's tested (4 test suites, 19 tests):**
- Combined filters work correctly
- Pagination respects boundaries
- Search matches name AND ID
- Selection/deselection

**What's NOT tested (by design):**
- Snapshot tests (brittle, low value)
- UI component rendering (ShadCN handles this)
- Visual regression (would need Chromatic/Percy)

## Time Spent

- Setup & configuration: ~15 min
- Core hook & logic: ~25 min
- Tests: ~15 min
- UI components: ~60 min
- Detail panel: ~25 min
- Polish & documentation: ~20 min
- **Total: ~2.5 hours**

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Run tests in watch mode
npm run test:run   # Run tests once
npm run lint       # Run ESLint
```

## Live Demo

[Deployed on Vercel](https://psynth-ai.vercel.app) *(if deployed)*

---

Built with care for the Psynth technical assessment.

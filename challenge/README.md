# Psynth Front-End Engineer & Designer Take-Home Test

## AssessFlow – Patient Assessment Dashboard

---

## Overview

Welcome to the Psynth technical assessment! This test evaluates your ability to translate a design specification into a production-ready React application using modern tooling and best practices.

You will build a **Patient Assessment Dashboard** – a responsive, mobile-first interface for managing psychological assessments. This simulates a real feature from a clinical software platform.

---

## Time & Submission

| Item               | Details                                 |
| ------------------ | --------------------------------------- |
| **Estimated Time** | 2-4 hours                               |
| **Deadline**       | 48 hours from receiving this test       |
| **Submission**     | GitHub repository link                  |
| **Bonus**          | Live deployment (Vercel, Netlify, etc.) |

---

## What You're Building

A dashboard interface with the following views and components:

### 1. Assessment List View (Required)

- Header with logo, navigation, and user avatar
- Page title section with "New Assessment" button
- Statistics cards row (4 cards showing key metrics)
- Filter bar with search, status dropdown, type dropdown, and date filter
- Data table showing assessments (desktop view)
- Card-based layout for assessments (mobile view)
- Pagination controls

### 2. Assessment Detail Panel (Required)

- Slide-over panel that opens when clicking a table row
- Patient header with avatar, name, and metadata
- Assessment information grid
- Score gauge visualization (semicircle gauge)
- Subscale scores with progress bars
- Clinician notes section
- Footer with action buttons

### 3. Responsive Behavior (Required)

- Desktop: Full table view, horizontal filters
- Mobile (<768px): Cards instead of table, stacked filters, full-width slide-over

---

## Technical Requirements

### Must Use

- **React** (functional components with hooks)
- **TypeScript** (strongly preferred, JavaScript acceptable)
- **ShadCN UI** (https://ui.shadcn.com/) - Use their components as your base
- **Tailwind CSS** (comes with ShadCN)

### State Management

- Use React's built-in state (useState, useReducer) or any lightweight solution
- No specific library required, but show good state architecture

### Data

- Use the provided mock data (see `mock-data/assessments.json`)
- Implement client-side filtering and search
- Implement client-side pagination

### No Backend Required

- All data should be mocked locally
- No API calls needed (simulate with mock data)

---

## Design Reference

The `design-reference.html` file in this package is your **design specification**.

**How to use it:**

1. Open `design-reference.html` in a browser
2. Use browser DevTools to inspect exact values:
   - Colors (CSS custom properties are defined)
   - Spacing (padding, margins, gaps)
   - Typography (font sizes, weights)
   - Border radius values
   - Shadow values
3. Match the design as closely as possible

**Design Tokens (from the reference file):**

```css
/* Primary Colors */
--color-primary-50: #EEF4FF;
--color-primary-100: #DCE8FF;
--color-primary-500: #4A7DFF;
--color-primary-600: #3366FF;
--color-primary-700: #2952CC;

/* Status Colors */
--color-success-500: #10B981;
--color-warning-500: #F59E0B;
--color-error-500: #EF4444;

/* Neutrals */
--color-gray-50 through --color-gray-900

/* Spacing Scale */
4, 8, 12, 16, 20, 24, 32, 40, 48, 64 (pixels)

/* Border Radius */
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-full: 9999px;
```

---

## Functional Requirements

### Search & Filtering

- [ ] Search input filters by patient name or assessment ID
- [ ] Status dropdown filters by: All, Completed, In Progress, Pending, Cancelled
- [ ] Type dropdown filters by assessment type
- [ ] Filters should work in combination
- [ ] Show empty state when no results match

### Table/Card Interactions

- [ ] Clicking a row/card opens the detail slide-over panel
- [ ] Hover states on table rows
- [ ] Action buttons (View, Download, More) should be clickable (can be no-op)

### Slide-over Panel

- [ ] Opens from the right side with animation
- [ ] Backdrop overlay that closes panel on click
- [ ] Close button in header
- [ ] Scrollable content area
- [ ] Fixed footer with action buttons

### Pagination

- [ ] Show current page indicator
- [ ] Previous/Next navigation
- [ ] Page number buttons
- [ ] Display "Showing X-Y of Z" text
- [ ] 5 items per page

### Responsive Behavior

- [ ] Breakpoint at 768px
- [ ] Mobile: Navigation hidden, filters stacked, cards instead of table
- [ ] Stats grid: 2 columns on mobile, 4 on desktop

---

## Evaluation Criteria

Your submission will be evaluated on:

### Design Implementation (40%)

| Criteria          | Weight | Description                                                         |
| ----------------- | ------ | ------------------------------------------------------------------- |
| Pixel Accuracy    | 15%    | How closely does your implementation match the design reference?    |
| Responsive Design | 10%    | Does the mobile view work correctly? Proper breakpoints?            |
| Visual Polish     | 10%    | Attention to details: spacing consistency, alignment, shadows, etc. |
| Component Styling | 5%     | Proper use of ShadCN + Tailwind, consistent with design tokens      |

### Engineering Quality (60%)

| Criteria                   | Weight | Description                                                        |
| -------------------------- | ------ | ------------------------------------------------------------------ |
| Component Architecture     | 15%    | Well-structured, reusable components with clear responsibilities   |
| Code Quality               | 15%    | Clean, readable code. Proper TypeScript usage. Good naming.        |
| State Management           | 10%    | Appropriate state handling, no prop drilling, good data flow       |
| Functionality              | 10%    | All features work: filtering, search, pagination, panel open/close |
| Performance Considerations | 5%     | No unnecessary re-renders, proper memoization where needed         |
| Project Setup              | 5%     | Clean project structure, README with setup instructions            |

### Bonus Points

- Deployed live demo (+5%)
- Loading skeletons / loading states (+3%)
- Smooth animations and transitions (+3%)
- Unit tests for key functionality (+4%)
- Accessibility considerations (ARIA labels, keyboard navigation) (+3%)
- Empty state design implementation (+2%)

---

## Deliverables

### Required

1. **GitHub Repository** containing:

   - Complete source code
   - `README.md` with:
     - Setup instructions (how to run locally)
     - Brief description of your approach
     - Any assumptions or decisions you made
     - Time spent on the project
   - Any notes on what you would improve with more time

2. **Working Application** that runs locally with:
   ```bash
   npm install
   npm run dev
   ```

### Nice to Have

- Live deployment URL (Vercel, Netlify, etc.)
- Brief Loom video (2-3 min) walking through your implementation

---

## Getting Started

### Recommended Setup

```bash
# Create new project with Vite + React + TypeScript
npm create vite@latest assessflow-dashboard -- --template react-ts
cd assessflow-dashboard

# Install dependencies
npm install

# Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Initialize ShadCN
npx shadcn@latest init

# Add components you'll need
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add card
npx shadcn@latest add sheet
npx shadcn@latest add avatar
npx shadcn@latest add dropdown-menu
```

### Project Structure Suggestion

```
src/
├── components/
│   ├── ui/              # ShadCN components
│   ├── layout/          # Header, Layout wrapper
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── StatsCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── AssessmentTable.tsx
│   │   ├── AssessmentCard.tsx
│   │   ├── AssessmentDetail.tsx
│   │   └── Pagination.tsx
│   └── common/          # Shared components
├── hooks/               # Custom hooks
├── lib/                 # Utilities
├── types/               # TypeScript types
├── data/                # Mock data
└── App.tsx
```

---

## Tips for Success

1. **Start with the design tokens** – Set up your Tailwind config with the exact colors from the design reference

2. **Build mobile-first** – Start with the mobile layout, then add desktop styles

3. **Use ShadCN intelligently** – Customize their components to match the design, don't force-fit

4. **Focus on the core first** – Get the main table/cards working before the detail panel

5. **Test responsiveness continuously** – Use browser DevTools to switch viewports often

6. **Commit frequently** – Show your thought process through your git history

7. **Don't over-engineer** – This is a 2-4 hour test, not a production app. Make pragmatic decisions.

---

## Questions?

If you have any questions about the requirements, please email [RECRUITER_EMAIL]. We're happy to clarify anything that's unclear.

**Good luck! We're excited to see what you build.**

---

## Files Included

```
psynth-frontend-test/
├── README.md                    # This file
├── design-reference/
│   └── design-reference.html    # Visual design specification
├── mock-data/
│   └── assessments.json         # Mock data for the dashboard
└── starter-files/               # Optional helper files
    ├── types.ts                 # TypeScript type definitions
    └── utils.ts                 # Utility functions (filtering, formatting, etc.)
```

### About the Starter Files

The `starter-files/` folder contains **optional** TypeScript files you can copy into your project:

- **types.ts** – Complete type definitions for all data structures (Patient, Assessment, FilterState, etc.). Use these directly or as a reference.

- **utils.ts** – Helper functions for common operations:
  - `filterAssessments()` – Filter logic for search, status, and type
  - `paginateItems()` – Pagination helper
  - `formatDate()` / `formatTime()` – Date formatting
  - `getScoreRange()` / `getScoreColors()` – Score color coding
  - `getStatusColors()` – Status badge styling

These are provided to save you time on boilerplate. Feel free to use them as-is, modify them, or write your own implementations.

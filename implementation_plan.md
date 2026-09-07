# BML Portal Extension — Implementation Plan

Extend the existing Bharat Minerals Limited corporate portal with 4 new public pages and 5 internal CS&IT portal pages, while preserving the current "Sleek Industrial Glassmorphism" design system.

## Existing Design System (Preserved)

| Token | Value |
|---|---|
| `--primary-dark` | `#0A1128` |
| `--accent` | `#FFB81C` (amber) |
| `--accent-copper` | `#C85A17` |
| `--glass-bg` | `rgba(255,255,255,0.72)` |
| Font | Inter, 17px base |
| Radius | 12px / 20px |
| Nav | Dark sticky glassmorphism bar |
| Cards | `.gateway-card`, `.product-card`, `.tech-card`, `.doc-tile`, `.directory-card` |

## Updated Site Map

```
Public Website
├── index.html .................. Home (existing — nav update only)
├── about.html .................. About NMDC [NEW]
├── business.html ............... Operations (existing — nav update only)
├── csit.html ................... CS&IT Department [NEW]
├── digital-initiatives.html .... Digital Initiatives [NEW]
├── tenders.html ................ Procurement (existing — nav update only)
├── governance.html ............. Governance & Contact (existing — enhanced contact form)
│
CS&IT Internal Portal
├── portal.html ................. Dashboard [NEW]
├── documents.html .............. Document Management [NEW]
├── assets.html ................. Asset Management [NEW]
├── tickets.html ................ Ticket Management [NEW]
├── audit-logs.html ............. Audit Logs [NEW]
│
Shared Resources
├── styles.css .................. Master stylesheet (existing — extended)
├── portal.css .................. Portal-specific styles [NEW]
├── shared.js ................... Extracted common JS [NEW]
└── hero-banner.png ............. Hero image (existing)
```

## Updated Navigation Structure

**Public pages** — extend the existing navbar with dropdowns:

```
Home | About | Our Business | CS&IT ▾ | Procurement | Governance & Contact
                                │
                                ├── CS&IT Department
                                ├── Digital Initiatives
                                └── CS&IT Portal →
```

**Portal pages** — separate sidebar navigation inside the portal:

```
Portal Sidebar:
  Dashboard
  Documents
  Assets
  Tickets
  Audit Logs
  ← Back to Main Site
```

## Proposed Changes

### Phase 1: Shared Infrastructure

---

#### [NEW] [shared.js](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/shared.js)

Extract the duplicated JS (i18n, resizeText, toggleMobileMenu, scroll shadow) into a single shared file. All pages will include this instead of inline `<script>` blocks. Each page will only need to define its page-specific `translations` object.

#### [MODIFY] [styles.css](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/styles.css)

Add new component styles for:
- `.stat-counter` — animated statistics cards with count-up
- `.timeline` — corporate timeline component
- `.initiative-card` — digital initiative showcase card with status badge
- `.contact-form` — styled form with validation states
- `.nav-dropdown` — dropdown menu for the CS&IT nav item
- Minor refinements to existing components (no breaking changes)

#### [NEW] [portal.css](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/portal.css)

Portal-specific styles:
- `.portal-layout` — sidebar + content grid
- `.portal-sidebar` — dark sidebar with navigation
- `.dashboard-card` — KPI summary cards
- `.data-table` — sortable/filterable tables for assets, documents, tickets
- `.kanban-board` — ticket kanban view
- `.modal` — reusable modal component
- `.audit-timeline` — audit log timeline
- Charts via pure CSS bar/donut charts (no external library)

---

### Phase 2: Public Pages

---

#### [NEW] [about.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/about.html)

- Hero section with headline "Empowering India's Mining Excellence Through Innovation"
- About NMDC section with history, mission/vision, core values
- Animated statistics cards (Iron Ore Production, Employees, Mining Projects, Operational Locations, Technology Systems) using IntersectionObserver count-up
- Corporate Timeline (key milestones from 1958 to 2026)
- Digital Transformation Journey section
- Future Vision 2030 section

#### [NEW] [csit.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/csit.html)

- "What We Do" section with 6 service cards (Network Ops, Server Admin, Cyber Security, ERP Support, Helpdesk, Infrastructure Monitoring)
- Department Structure organization display
- Technology Stack grid
- Fiber Network Overview
- Data Center Overview
- Digital Transformation Initiatives

#### [NEW] [digital-initiatives.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/digital-initiatives.html)

- 6 initiative cards (ERP Systems, OITDS Truck Dispatch, CCTV Monitoring, Core Fiber Ring Network, Data Center Infrastructure, Smart Mining Technologies)
- Each card: icon, description, status badge (Live / In Progress / Planned), Learn More button
- Summary metrics ribbon

#### [MODIFY] [governance.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/governance.html)

- Add interactive contact form section with Name, Email, Subject, Message fields
- Form validation (required fields, email format)
- Success/error state display
- Add location information section
- Keep all existing content intact

---

### Phase 3: Portal Pages

---

#### [NEW] [portal.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/portal.html)

Dashboard with:
- 5 KPI cards (Total Assets, Open Tickets, Uploaded Documents, Servers, Network Health)
- Charts section (Assets by Category bar chart, Assets by Location donut chart, Monthly Activity line-style chart) — CSS-only, no external libraries
- Recent Activity feed widget
- Notifications panel
- System Status indicators

#### [NEW] [documents.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/documents.html)

- Document table (Title, Category, Date, Uploaded By, Action buttons)
- Search bar + category filter dropdown
- Upload Document modal with drag-and-drop UI
- Preview/download actions
- Mock data: ~10 sample documents (Notices, Circulars, SOPs, Policies, etc.)

#### [NEW] [assets.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/assets.html)

- Asset table (Asset ID, Name, Category, Location, Status, Assigned User, Last Updated)
- Search, sort by column, filter by status/category
- Pagination (5/10/25 per page)
- Edit Asset modal (pre-filled form)
- Delete confirmation modal
- Mock data: ~20 sample assets

#### [NEW] [tickets.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/tickets.html)

- Dual view: Table View + Kanban View toggle
- Ticket statuses: Open, Assigned, In Progress, Resolved, Closed
- Create Ticket modal
- Status update capability
- Kanban columns with drag indicator styling
- Mock data: ~15 sample tickets

#### [NEW] [audit-logs.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/audit-logs.html)

- Timeline layout with icons and timestamps
- Search, date range filter, user filter
- Mock data: ~20 sample audit entries
- Color-coded action types (create, update, delete, login)

---

### Phase 4: Navigation Updates

---

#### [MODIFY] [index.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/index.html)

- Update navbar to include new links (About, CS&IT dropdown with Portal)
- Update footer Quick Links
- Switch inline JS to `shared.js` include

#### [MODIFY] [business.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/business.html)

- Update navbar and footer links
- Switch inline JS to `shared.js`

#### [MODIFY] [tenders.html](file:///c:/Users/yadua/OneDrive/Documents/Custom%20Office%20TWeb/bml-portal/tenders.html)

- Update navbar and footer links
- Switch inline JS to `shared.js`

## UI Enhancement Strategy

Subtle enhancements while preserving the existing identity:

| Enhancement | Implementation |
|---|---|
| Electric blue accent | `--accent-blue: #3B82F6` used sparingly on portal KPI cards |
| Network-grid bg | Subtle CSS grid pattern on portal sidebar |
| Soft animated gradients | Portal dashboard header gradient shift animation |
| Glassmorphism panels | Extended to all new card types |
| Smooth hover states | Already in the design system, consistently applied |

> [!IMPORTANT]
> No dark theme applied globally. Portal pages use the same light `--base-bg` with dark sidebar only. No neon/cyberpunk effects.

## Responsive Design Strategy

| Breakpoint | Behavior |
|---|---|
| ≥1024px | Full layout, sidebar visible, tables full-width |
| 768–1023px | Sidebar collapsed to icons, 2-column grids → 1 column |
| ≤767px | Hamburger menu, stacked layouts, horizontal-scroll tables |
| ≤480px | Compact spacing, reduced font sizes |

## Verification Plan

### Automated Tests
- Open each page in the browser and verify rendering
- Check navigation links work between all pages
- Test responsive breakpoints at 1200px, 768px, 480px
- Verify form validation on contact form
- Test filter/search/sort on portal tables
- Test modal open/close behavior
- Verify Kanban/Table view toggle on tickets page

### Manual Verification
- Visual comparison of new pages against existing design language
- Confirm no existing page styling is broken

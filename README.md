# NMDC IT Operations Portal (Prototype)

A front-end prototype of a departmental IT operations portal — integrating a public corporate web presence and an internal operations hub for document management, asset tracking, helpdesk ticketing, and audit logging. Developed during vocational training at **NMDC Limited's CS&IT Department, Bacheli Complex (2026)**.

> **Disclaimer:** Prototype by Arnav Yadu, vocational training at NMDC Bacheli Complex, 2026. Not an official NMDC website. All data is sample data.

---

## Live Demo
🔗 **[https://arnav1804.github.io/NMDC-Portal/](https://arnav1804.github.io/NMDC-Portal/)**

---

## Overview & Features

- **Public Web Presence (7 Pages):**
  - Highlighting NMDC corporate background, mineral operations, CS&IT services, digital transformation roadmap, tenders desk, and governance disclosures.
  - Bilingual localization support (English & Hindi) with accessibility text-resizing controls.
- **Role-Based CS&IT Operations Portal:**
  - **Operational Dashboard (`portal.html`):** Real-time KPI counters dynamically aggregated from underlying asset, document, and ticket data stores.
  - **Asset Management (`assets.html` / `assets.js`):** Searchable IT hardware register with multi-column sorting (ID, Name, Date, Warranty) and 10-row pagination.
  - **Document Repository (`documents.html` / `documents.js`):** Categorized repository for departmental circulars, SOPs, and policies with safe HTML modal views.
  - **Service Desk (`tickets.html`):** Incident management supporting priority, status toggles, and assignment workflows.
  - **Audit Logging (`audit-logs.html`):** Automated event logging for user logins, logouts, asset updates, and document uploads.

---

## Demo Credentials

The portal implements client-side Role-Based Access Control (RBAC). Use any of the pre-configured credentials below on `portal-login.html`:

| Role | User Name | Login ID | Password | Permissions |
|---|---|---|---|---|
| **Admin** | Demo User 01 | `admin@nmdc.co.in` | `admin123` | Full access: create, edit, delete, audit logs |
| **Officer** | Demo User 02 | `officer@nmdc.co.in` | `officer123` | Operational access: create/update tickets, assets, docs |
| **Viewer** | Demo User 03 | `viewer@nmdc.co.in` | `viewer123` | Read-only viewing across all modules |

*(Login IDs and passwords are hardcoded prototype identifiers preserved for review convenience).*

---

## Tech Stack & Architecture

- **Markup & Styling:** Vanilla HTML5, CSS3 (`styles.css`, `portal.css`), Tailwind CSS (via CDN).
- **Client Logic:** Vanilla JavaScript (`shared.js`, `assets.js`, `documents.js`) with zero npm build dependencies.
- **Data Persistence:** Client-side `localStorage` stores with automated seed fallback and migration handlers.

> **Note on Tailwind CSS CDN:** The prototype utilizes the Tailwind CSS script CDN for rapid UI experimentation without introducing node modules or a bundler. For production deployment, this would be replaced with a compiled, purged CSS stylesheet.

---

## Project Structure

```
NMDC-Portal/
├── .gitignore
├── LICENSE
├── README.md
├── DESIGN_NOTES.md
├── favicon.svg
├── hero-banner.jpg
├── index.html
├── about.html
├── business.html
├── csit.html
├── digital-initiatives.html
├── tenders.html
├── governance.html
├── portal-login.html
├── portal.html
├── documents.html
├── documents.js
├── assets.html
├── assets.js
├── tickets.html
├── audit-logs.html
├── shared.js
├── styles.css
└── portal.css
```

---

## How to Run Locally

Because this project is a pure static prototype, no build tools or package managers are required:

```bash
# Clone the repository
git clone https://github.com/Arnav1804/NMDC-Portal.git
cd NMDC-Portal

# Run using any lightweight local HTTP server
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

Alternatively, open `index.html` directly in any modern browser.

---

## Limitations & Future Scope

- **Mock Authentication:** Authentication and session management are executed on the client using `localStorage`. Production rollout would integrate OAuth 2.0 / SAML SSO backed by central active directory services.
- **Sample Data:** All employee names, phone numbers, email addresses, and asset serials are illustrative placeholders.
- **Enterprise Integrations:** Future phases could bridge the service desk and asset register directly to NMDC's SAP S/4HANA ERP instance.

---

## Author

**Arnav Yadu**  
Vocational Trainee, CS&IT Department, NMDC Bacheli Complex (2026)  
- GitHub: [@Arnav1804](https://github.com/Arnav1804)  
- LinkedIn: [arnav-yadu-5aa1442937](https://linkedin.com/in/arnav-yadu-5aa1442937)

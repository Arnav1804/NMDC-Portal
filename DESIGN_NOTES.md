# NMDC IT Operations Portal — Design Notes

A static front-end prototype designed for vocational training at NMDC Bacheli Complex, demonstrating an integrated public corporate web presence and an internal CS&IT operations management portal.

## 1. Project Goals
- Modernize the digital presence of the CS&IT department with responsive, accessible industrial design.
- Prototype operational workflows: Helpdesk ticketing, IT asset inventory, document vault, and audit logging.
- Demonstrate client-side state management, role-based access control (RBAC), and bilingual i18n support without back-end dependencies.

## 2. Architecture & Modules
- **Public Portal (7 pages):** `index.html` (Corporate Home), `about.html` (Overview & History), `business.html` (Mining & Production), `csit.html` (CS&IT Department), `digital-initiatives.html` (Technology Projects), `tenders.html` (E-Procurement), and `governance.html` (RTI, Disclosures & Directory).
- **Internal Operations Portal (5 pages):** `portal.html` (Command Dashboard), `tickets.html` (Service Desk), `assets.html` (Hardware Inventory & Analytics), `documents.html` (SOP & Policy Vault), and `audit-logs.html` (Activity Tracking).
- **Authentication:** `portal-login.html` (Session-based RBAC gateway).
- **Shared Assets:** `shared.js` (State store, audit engine, i18n), `styles.css` (Public theme), `portal.css` (Portal theme).

## 3. Data Model & Storage Keys
All portal data is persisted locally in the browser via `localStorage` with seed fallbacks:
- `nmdc_portal_session`: Current user credentials, role, display name, and login timestamp.
- `nmdc_portal_tickets`: Helpdesk incident and service request records.
- `nmdc_portal_assets`: Hardware and network infrastructure register with warranty tracking.
- `nmdc_portal_documents`: Controlled operational documents, circulars, and SOP records.
- `nmdc_portal_audit`: Tamper-evident operational activity and authentication audit log.

## 4. Role-Based Access Control (RBAC)
- **Admin (`Demo User 01`):** Full read, create, edit, delete access across all modules; access to audit logs.
- **Officer (`Demo User 02`):** Create and update permissions for tickets, assets, and documents; read-only for audit logs.
- **Viewer (`Demo User 03`):** Read-only viewing permissions across all modules; action buttons disabled.

## 5. Limitations & Future Scope
- **Prototype Scope:** Client-side static prototype using mock data; not connected to production SAP ERP or Active Directory.
- **Security:** Demo client-side session store; production deployment requires OAuth 2.0 / SAML SSO and secure server-side API endpoints.
- **Data Persistence:** Scoped to the local browser; production requires PostgreSQL or enterprise DBMS integration.

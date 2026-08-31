# NMDC IT Operations Portal (Prototype)

A frontend prototype of a departmental IT operations portal — covering document management, asset tracking, ticketing, governance, and role-based access — built as a self-directed concept project during a vocational training at **NMDC Limited's CS&IT Department, Bacheli Complex**.

> **Note:** This is a self-directed concept prototype built to explore and propose UI/UX and information-architecture improvements for internal departmental workflows. It is **not an official NMDC deliverable** and was not deployed by the organization.

## Live Demo
🔗 https://arnav1804.github.io/NMDC-Portal/

## About the Project

During a vocational training in NMDC's CS&IT department, I studied how departmental workflows, document handling, and access management were structured in a large public-sector enterprise IT environment. Based on pain points raised by technical mentors and departmental staff, I designed and built this portal prototype to demonstrate how those workflows could be digitized and streamlined.

## Features

- **Corporate/Department Landing Page** — overview and navigation hub
- **Document Management** — upload, categorize, and track departmental documents
- **Asset Management** — track IT assets across the department
- **Ticket Management** — raise and track internal IT support tickets
- **Audit Logs** — activity tracking for accountability
- **Role-Based Access** — differentiated views for staff vs. administrators
- **Governance & Tenders modules** — supporting departmental process transparency
- **Dashboard Analytics** — a high-level operational overview

## Tech Stack

- HTML5, CSS3
- Tailwind CSS
- JavaScript (vanilla)
- LocalStorage-based authentication (prototype-level, not production auth)

## Project Structure
 NMDC-Portal/
 ├── index.html # Landing page
 ├── portal.html # Main portal dashboard
 ├── portal-login.html # Login screen
 ├── documents.html / .js # Document management module
 ├── assets.html / .js # Asset tracking module
 ├── tickets.html # Ticketing module
 ├── audit-logs.html # Audit log view
 ├── governance.html # Governance module
 ├── tenders.html # Tenders module
 ├── business.html # Business overview page
 ├── about.html # About page
 ├── digital-initiatives.html # Digital initiatives page
 ├── shared.js # Shared logic across pages
 ├── portal.css / styles.css # Styling
 └── implementation_plan.md # Design/planning notes

 
## How to Run Locally

This is a static frontend prototype with no build step required.

```bash
git clone https://github.com/Arnav1804/NMDC-Portal.git
cd NMDC-Portal
# Open index.html directly in your browser, or serve locally:
python -m http.server 8000
# then visit http://localhost:8000
```

## Status
**Frontend Prototype / Demonstration Version** — built to propose module structure and information architecture, not a production system.

## Author
Arnav Yadu
- LinkedIn: [linkedin.com/in/arnav-yadu-5aa1442937](https://linkedin.com/in/arnav-yadu-5aa1442937)
- GitHub: [github.com/Arnav1804](https://github.com/Arnav1804)

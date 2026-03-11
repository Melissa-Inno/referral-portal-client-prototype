# SmileRoute — Client Prototype

A client-side prototype for **SmileRoute**, a dental referral management platform built by **Innovonyx** (Houston, TX).

---

## About

SmileRoute connects general dentists with specialists, streamlining patient referrals, eliminating paperwork, and improving outcomes across a verified dental network.

This repository is a front-end prototype built with React and Vite. It uses static sample data — no backend or database is connected.

---

## Tech Stack

- **React 19** — UI framework
- **React Router 7** — client-side routing
- **Vite 7** — dev server and build tool
- **Lucide React** — icons
- **CSS custom properties** — theming (light/dark mode)

---

## Features

- Public landing page with pricing, features, reviews, and CTA
- Authenticated app layout with collapsible sidebar
- Dashboard with referral stats
- Submit Referral form
- Referral History (sent & received)
- Specialist Directory
- Account & Billing page
- Account Settings (profile, notifications, appearance)
- Public Profile page
- Light / Dark mode toggle
- Fully responsive — mobile, tablet, and desktop
- Notification bell with popup
- Mobile sidebar drawer

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Run on local network (to preview on mobile)

```bash
npm run dev -- --host
```

Then open the **Network** URL shown in the terminal on your phone (must be on the same Wi-Fi).

### Build for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/        # Shared UI components (Sidebar, TopBar, Badge, ThemeToggle)
├── context/           # Theme context
├── data/              # Static sample data
├── layouts/           # AuthenticatedLayout
├── pages/             # All page components
│   ├── LandingPage
│   ├── LoginPage
│   ├── RegisterPage
│   ├── DashboardPage
│   ├── SubmitReferralPage
│   ├── ReferralHistoryPage
│   ├── DirectoryPage
│   ├── AccountPage
│   ├── AccountSettingsPage
│   └── PublicProfilePage
├── App.jsx
├── App.css            # All styles + responsive breakpoints
└── main.jsx
```

---

## Company

**Innovonyx, Inc.** — Houston, TX
**Version** — v2.6.1

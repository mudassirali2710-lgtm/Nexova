# Nexora | Commercial Embroidery Digitizing & Business Operations Platform

A modern, high-performance web application designed for commercial embroidery digitizing studios, production management, and client fulfillment tracking.

Built with **Next.js 14 App Router**, **React 18**, **Tailwind CSS**, and an executive-tier motion design system powered by **Motion (`motion/react`)**.

---

## 🌟 Key Features

- **Executive KPI Dashboard**: Live tracking of Gross Billings, Active Digitizing Queue, Upfront Deposits, Outstanding Balances, and Completed Deliverables.
- **Workflow Pipeline**: Real-time stage distribution spanning *New*, *In Review*, *Digitizing*, *Production / Ready*, *Completed*, and *Cancelled*.
- **Order Management**: Comprehensive digitizing orders table with multi-parameter filtering (by status, garment placement, assigned department, and payment status) and search.
- **Customer Directory**: Customer CRM tracking commercial clients, apparel brands, total project spend, and outstanding balances.
- **Team & Capacity Matrix**: Studio structure with department capacity gauges, specialist throughput, and SLA completion rates.
- **Business Performance Analytics**: Historical revenue trend charts with dynamic timeframes (*This Month*, *This Quarter*, *Year to Date*, *Custom*) and order throughput metrics.
- **Studio Settings**: Configurable business profile, billing currency defaults, alert preferences, and executive manager credentials.

---

## 🎨 Motion Design System

Nexora features a refined, tactile motion system implemented with `motion/react`:

- **Accessibility**: Automatic fallback for `prefers-reduced-motion` using `useReducedMotion()`.
- **Shared Layout Transitions**: `layoutId` pill indicators that glide smoothly across reporting timeframes.
- **Fluid Overlays**: Animated modals and stacked toast notifications powered by `AnimatePresence` with custom spring and ease curves (`[0.16, 1, 0.3, 1]`).
- **Interactive Visuals**: Animated revenue chart bars and capacity progress indicators.
- **Tactile Feedback**: Subtle micro-interactions on cards, tabs, and action buttons (`whileHover`, `whileTap`).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17+ or later
- **npm** or **yarn** / **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/mudassirali2710-lgtm/Nexova.git

# Navigate to project directory
cd Nexova

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### Production Build

```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Motion**: `motion/react`
- **Icons**: Lucide React
- **Language**: TypeScript

---

## 📄 License

This project is private and proprietary.

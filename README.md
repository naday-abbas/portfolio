# Naday Abbas — Modern 3D Developer Portfolio

A modern, high-performance developer portfolio built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, **React Three Fiber + Drei**, and **Lenis Smooth Scroll**. Designed with a dark monochrome aesthetic, subtle grid textures, and electric violet accents.

---

## ⚡ Features

- **3D Interactive Hero**: Lightweight, lazy-loaded 3D wireframe mesh powered by Three.js and `@react-three/fiber`, reacting smoothly to cursor coordinates with static mobile fallbacks.
- **3D Card Tilts**: Mouse-responsive 3D perspective shifts on project cards and profile portrait.
- **Lenis Smooth Scrolling**: Inertial smooth scrolling across the entire page with `prefers-reduced-motion` compliance.
- **Word-by-Word Hero Reveal**: Staggered motion typography introducing Naday Abbas.
- **Technologies Grid**: Grouped into **Frontend**, **Backend**, and **Workflow Tools** with animated badges and hover lifts.
- **Featured Projects**: High-resolution screenshots of Movie Flix, Beast Games, and Portfolio Website with live links and GitHub repositories.
- **Education Timeline**: Minimalist vertical timeline highlighting academic milestones.
- **Interactive Contact Form**:
  - Live field validation & character counter
  - Honeypot anti-spam protection
  - Direct email copying with feedback toast
  - Web3Forms API integration
- **Desktop-Only Custom Cursor**: Smooth dual-ring cursor with hover-expansion physics (disabled on touch devices).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Form Service**: [Web3Forms](https://web3forms.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/naday-abbas/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory (based on `.env.example`):
```bash
cp .env.example .env
```

Add your Web3Forms access key for the contact form:
```env
VITE_WEB3FORMS_ACCESS_KEY="your_web3forms_access_key_here"
```
*(Get a free key instantly at [web3forms.com](https://web3forms.com) — no backend required)*

### 4. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or the port displayed in your terminal.

---

## 📦 Building for Production

```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

1. Push your code to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `Portfolio` repository.
4. Framework Preset: **Vite** (auto-detected).
5. Add your Environment Variable:
   - Name: `VITE_WEB3FORMS_ACCESS_KEY`
   - Value: `your_web3forms_access_key`
6. Click **Deploy**. Your site will be live on a `*.vercel.app` domain with automatic SSL and CDN caching.

---

## 👤 Author

**Naday Abbas**
- **Role**: Frontend Developer (React · Modern Web)
- **Location**: Karachi, Sindh, Pakistan
- **Email**: [nadaycoding@gmail.com](mailto:nadaycoding@gmail.com)
- **Phone**: +92 300 2132667
- **LinkedIn**: [linkedin.com/in/naday-abbas](https://www.linkedin.com/in/naday-abbas)
- **GitHub**: [github.com/naday-abbas](https://github.com/naday-abbas/)
- **Instagram**: [instagram.com/nadayabbas](https://www.instagram.com/nadayabbas/)
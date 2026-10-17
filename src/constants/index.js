import movieFlixScreenshot from "../assets/projects/project-1.webp";
import aiMallScreenshot from "../assets/projects/project-4.webp";
import beastGamesScreenshot from "../assets/projects/project-2.webp";
import portfolioScreenshot from "../assets/projects/project-3.webp";

export const PERSONAL_INFO = {
  name: "Naday Abbas",
  role: "Frontend Developer (React · Modern Web)",
  location: "Karachi, Sindh, Pakistan",
  email: "nadaycoding@gmail.com",
  phone: "+92 300 2132667",
  availability: "Open to work",
  bio: "Frontend developer and software engineering student with strong proficiency in React, JavaScript (ES6+), HTML5, and Tailwind CSS. Dedicated to component modularity, clean architecture, and intuitive user experiences.",
  degree: "BS in Software Engineering (Sir Syed University, Expected 2026)",
  socials: {
    linkedin: "https://www.linkedin.com/in/naday-abbas",
    github: "https://github.com/naday-abbas/",
    instagram: "https://www.instagram.com/nadayabbas/",
  },
};

export const SKILL_CATEGORIES = [
  {
    category: "Core Frontend",
    description: "Primary building blocks for modern, accessible web interfaces",
    skills: [
      { name: "React", level: "Proficient", icon: "RiReactjsLine", color: "#38bdf8" },
      { name: "JavaScript (ES6+)", level: "Proficient", icon: "DiJavascript1", color: "#facc15" },
      { name: "Tailwind CSS", level: "Proficient", icon: "TbBrandTailwind", color: "#22d3ee" },
      { name: "HTML5", level: "Advanced", icon: "RiHtml5Line", color: "#f97316" },
      { name: "CSS3", level: "Advanced", icon: "FaCss3Alt", color: "#3b82f6" },
    ],
  },
  {
    category: "Architecture & UI",
    description: "Responsive layouts, state management, and modern component design",
    skills: [
      { name: "Responsive Layouts", level: "Core", icon: "FiLayout", color: "#a855f7" },
      { name: "Component Modularity", level: "Core", icon: "FiBox", color: "#38bdf8" },
      { name: "REST API Integration", level: "Practical", icon: "FiServer", color: "#34d399" },
      { name: "State & Hooks", level: "Practical", icon: "FiCode", color: "#818cf8" },
    ],
  },
  {
    category: "Tools & Workflow",
    description: "Version control, build tools, and modern developer environments",
    skills: [
      { name: "Git", level: "Proficient", icon: "FaGitAlt", color: "#f05032" },
      { name: "GitHub", level: "Proficient", icon: "FaGithub", color: "#ffffff" },
      { name: "Vite & npm", level: "Practical", icon: "FiTerminal", color: "#f59e0b" },
      { name: "Vercel / GitHub Pages", level: "Practical", icon: "FiGlobe", color: "#06b6d4" },
    ],
  },
];

export const PROJECTS = [
  {
    id: "movie-flix",
    title: "Movie Flix",
    tagline: "Responsive Movie Discovery & Catalog Application",
    whatIBuilt: "Engineered an interactive entertainment discovery platform using React and Tailwind CSS. Implemented instant query-based filtering, responsive grid layouts, modal previews, and browser localStorage persistence for user favorite watchlists.",
    highlights: [
      "Instant query-based search & genre filtering",
      "Persistent favorites catalog via localStorage",
      "Mobile-first responsive poster grid",
    ],
    image: movieFlixScreenshot,
    altText: "Movie Flix web application interface featuring movie poster grid and search bar",
    technologies: ["React", "JavaScript", "Tailwind CSS", "REST API", "LocalStorage"],
    liveUrl: "https://movieflix-naday-abbas-projects.vercel.app/",
    githubUrl: "https://github.com/naday-abbas/movieflix",
  },
  {
    id: "ai-shopping-mall-system",
    title: "AI Interactive Shopping Mall System",
    tagline: "Smart Shopping Mall & Recommendation System",
    whatIBuilt: "An AI-driven interactive system for smart shopping malls, featuring real-time facial detection and personalized product recommendations.",
    description: "An AI-driven interactive system for smart shopping malls, featuring real-time facial detection and personalized product recommendations.",
    highlights: [
      "Real-time facial detection for demographic analysis",
      "Personalized product recommendation engine",
      "Interactive smart shopping mall web experience",
    ],
    image: aiMallScreenshot,
    altText: "AI Interactive Shopping Mall System interface featuring real-time facial detection and recommendations",
    technologies: ["Jupyter Notebook", "JavaScript", "TypeScript"],
    liveUrl: "https://ai-shopping-mall-system-fyp.vercel.app",
    githubUrl: "https://github.com/naday-abbas/ai-shopping-mall-system-fyp",
  },
  {
    id: "beast-games",
    title: "Beast Games",
    tagline: "Game Exploration & Upcoming Releases Showcase",
    whatIBuilt: "Designed and developed a responsive gaming portal frontend featuring multi-category title exploration, release calendar showcase cards, and custom CSS interactions built with modular structure.",
    highlights: [
      "Custom responsive grid & card architecture",
      "Interactive category sorting & release highlights",
      "Clean semantic markup & cross-browser styling",
    ],
    image: beastGamesScreenshot,
    altText: "Beast Games gaming portal interface featuring 3D game carousel and game catalog",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    liveUrl: "https://naday-abbas.github.io/beast-games/",
    githubUrl: "https://github.com/naday-abbas/Beast-Games",
  },
  {
    id: "homeschool-matchmaker",
    title: "Homeschool Matchmaker",
    tagline: "Homeschool Community & Learning Platform",
    subtitle: "Homeschool Community & Learning Platform",
    whatIBuilt: "A client project built with Bubble.io that helps homeschooling families discover aligned families, specialized educators, field-trip venues, curriculum resources, swap-shop listings, and community events. Integrated Stripe for payments and subscriptions.",
    description: "A client project built with Bubble.io that helps homeschooling families discover aligned families, specialized educators, field-trip venues, curriculum resources, swap-shop listings, and community events. Integrated Stripe for payments and subscriptions.",
    highlights: [
      "Family matching based on shared values, schedules, and learning preferences.",
      "Discover educators, field-trip venues, curriculum resources, swap-shop listings, and community events.",
      "Stripe integration for payments and subscriptions.",
    ],
    image: portfolioScreenshot,
    altText: "Homeschool Matchmaker community and learning platform interface",
    technologies: ["Bubble.io", "Stripe"],
    liveUrl: null,
    githubUrl: null,
    displayHost: "homeschoolmatchmaker.com",
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "Sir Syed University of Engineering and Technology",
    location: "Karachi, Pakistan",
    date: "Graduating 2026",
    status: "Currently Enrolled",
    description: "Rigorous software engineering curriculum emphasizing Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Web Engineering, and Software Design Patterns.",
  },
  {
    degree: "Smart Web Designing Certification",
    institution: "Malaysian Learning Hub",
    location: "Online / Hybrid",
    date: "2023–2024",
    status: "Completed",
    description: "Hands-on intensive training covering modern HTML5 semantics, responsive CSS styling, typography, UX principles, and practical JavaScript frontend scripting.",
  },
  {
    degree: "Intermediate in Pre-Engineering",
    institution: "Bahria Foundation College Kandiaro",
    location: "Sindh, Pakistan",
    date: "2019–2020",
    status: "Completed",
    description: "Foundational education in Mathematics, Physics, and Analytical Problem Solving.",
  },
];

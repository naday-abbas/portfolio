import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "../constants";
import MagneticButton from "./MagneticButton";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FiDownload, FiArrowDown, FiMapPin, FiMail } from "react-icons/fi";
import HeroTechOrbitCard from "./HeroTechOrbitCard";
import { prefersReducedMotion } from "../utils/webgl";

const ROTATING_TAGLINES = [
  "Crafting responsive React applications & modular components",
  "Translating Figma & UI designs into production-grade frontend code",
  "Optimizing client-side state, API integration, and web performance",
  "Pursuing BS in Software Engineering at Sir Syed University",
];

export default function Hero() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    setReducedMotion(isReduced);

    if (isReduced) {
      setDisplayedText(ROTATING_TAGLINES[0]);
      return;
    }

    let timeout;
    const currentFullText = ROTATING_TAGLINES[taglineIdx];

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setTaglineIdx((prev) => (prev + 1) % ROTATING_TAGLINES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, taglineIdx]);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative min-h-[95vh] lg:min-h-[100dvh] flex flex-col justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Soft Ambient Aurora Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[450px] bg-gradient-to-r from-violet-600/10 via-cyan-500/8 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bio & Info (order-1 on mobile/tablet and desktop) */}
          <div className="order-1 lg:order-1 lg:col-span-6 xl:col-span-6 flex flex-col items-start">
            {/* Status & Location Meta Header (Clean zero-pill metadata) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="font-semibold uppercase tracking-wider text-cyan-300">
                {PERSONAL_INFO.availability}
              </span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <FiMapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.location}
              </span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">BS Software Eng '26</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-2">
              Naday Abbas<span className="text-cyan-400">.</span>
            </h1>

            {/* Role Header */}
            <div className="mb-3">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                {PERSONAL_INFO.role}
              </span>
            </div>

            {/* Recruiter-Ready Tagline */}
            <div className="min-h-[2.5rem] mb-3 sm:mb-4 flex items-center">
              <span className="text-sm sm:text-base font-mono text-cyan-300/90 font-medium">
                {displayedText}
              </span>
              {!reducedMotion && (
                <span className="w-2 h-4 bg-cyan-400 ml-1 inline-block animate-pulse" />
              )}
            </div>

            {/* Developer Summary Bio */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl mb-6 sm:mb-7 font-normal">
              Frontend developer with strong practical skills in React, modern JavaScript (ES6+), HTML5, and Tailwind CSS. Passionate about engineering clean, responsive, and accessible user interfaces with reliable client-side state and thoughtful design details.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto">
              <MagneticButton
                href="#projects"
                onClick={scrollToProjects}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/40 transition-all border border-violet-400/30 group"
              >
                <span>View Projects</span>
                <FiArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                onClick={scrollToContact}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0d1428] hover:bg-[#131b35] text-zinc-200 hover:text-white font-medium text-sm sm:text-base border border-white/15 hover:border-cyan-400/50 transition-all shadow-md group"
              >
                <FiMail className="mr-2 w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Get in Touch</span>
              </MagneticButton>
            </div>

            {/* Verified External Channels */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-zinc-300">
              <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-semibold mr-1">
                Channels
              </span>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naday Abbas on LinkedIn"
                className="p-2.5 rounded-full bg-[#0d1428] hover:bg-violet-600/25 text-zinc-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naday Abbas on GitHub"
                className="p-2.5 rounded-full bg-[#0d1428] hover:bg-violet-600/25 text-zinc-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naday Abbas on Instagram"
                className="p-2.5 rounded-full bg-[#0d1428] hover:bg-violet-600/25 text-zinc-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="Instagram Profile"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Orbit Card (order-2 on mobile/tablet and desktop) */}
          <div className="order-2 lg:order-2 lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            {/* Soft Ambient Radial Backing Glow */}
            <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,rgba(34,211,238,0.12)_45%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

            <HeroTechOrbitCard />
          </div>
        </div>
      </div>
    </section>
  );
}

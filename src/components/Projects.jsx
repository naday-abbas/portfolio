import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { PROJECTS } from "../constants";
import { FiExternalLink, FiGithub, FiLayers, FiGlobe, FiCheck } from "react-icons/fi";
import { prefersReducedMotion } from "../utils/webgl";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isReduced = prefersReducedMotion();

  // 3D Tilt calculation & light-follow glare
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 26 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 26 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isReduced ? ["0deg", "0deg"] : ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isReduced ? ["0deg", "0deg"] : ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    if (isReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    setGlare({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  let displayHost = project.displayHost || "project.app";
  if (project.liveUrl) {
    try {
      const url = new URL(project.liveUrl);
      displayHost = url.hostname.replace("www.", "");
    } catch {
      displayHost = project.displayHost || "project.app";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative max-w-2xl lg:max-w-none mx-auto w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="p-5 sm:p-6 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#0d1428]/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl transition-all duration-300 shadow-2xl overflow-hidden relative"
      >
        {/* Violet to Cyan glow on hover */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-violet-600/15 to-cyan-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Dynamic Light-Follow Glare Highlight */}
        {!isReduced && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Screenshot inside Browser-Window Mockup Frame */}
          <div
            className="lg:col-span-6 relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-[#060913] shadow-xl group-hover:border-cyan-400/50 transition-colors w-full md:max-w-[540px] lg:max-w-none mx-auto"
            style={{ transform: isReduced ? "none" : "translateZ(20px)" }}
          >
            {/* Browser Header Bar */}
            <div className="px-3.5 sm:px-4 py-2 bg-[#0a0f1d] border-b border-white/10 flex items-center justify-between gap-3">
              {/* Traffic light window dots */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-[260px] mx-auto px-3 py-0.5 rounded-md bg-black/40 border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center justify-center gap-1.5 truncate">
                <FiGlobe className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{displayHost}</span>
              </div>

              <div className="w-8" aria-hidden="true" />
            </div>

            {/* Screenshot Image with object-fit: contain on subtle theme-matching background */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0f1d] flex items-center justify-center p-1 sm:p-1.5">
              <img
                src={project.image}
                alt={project.altText || `${project.title} interface preview`}
                loading="lazy"
                width={640}
                height={400}
                className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Project Details & Technical Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Clean Section Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              <FiLayers className="w-3.5 h-3.5" />
              <span>Project 0{index + 1}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
              {project.title}
            </h3>

            {/* Tagline */}
            <p className="text-xs sm:text-sm lg:text-base text-zinc-300 font-medium mb-2.5 sm:mb-3">
              {project.tagline}
            </p>

            {/* Project Overview */}
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-3.5 sm:mb-4">
              {project.whatIBuilt}
            </p>

            {/* Technical Highlights */}
            {project.highlights && (
              <ul className="mb-4 sm:mb-5 space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-zinc-300">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Stack (Zero-Pill Typography with Separators) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-zinc-300 mb-5 sm:mb-6 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg bg-black/40 border border-white/10">
              <span className="text-zinc-500 uppercase font-semibold text-[11px]">Technologies:</span>
              {project.technologies.map((tech, i) => (
                <span key={tech} className="flex items-center gap-2">
                  <span className="text-cyan-300/90 font-medium">{tech}</span>
                  {i < project.technologies.length - 1 && (
                    <span className="text-zinc-600" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Actions: Live Demo + GitHub */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-violet-600/30 hover:shadow-cyan-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>Live Demo</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#0a0f1d] hover:bg-[#151e36] text-zinc-200 hover:text-white text-xs sm:text-sm font-medium border border-white/15 hover:border-cyan-400/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <FiGithub className="w-4 h-4 text-zinc-300" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Aurora */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-violet-600/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Showcase · Selected Work
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Featured Projects
          </h2>

          <p className="text-base text-zinc-300">
            Frontend web applications built with React, modular state patterns, responsive styling, and modern web standards.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiReactjsLine, RiHtml5Line } from "react-icons/ri";
import { DiJavascript1 } from "react-icons/di";
import { TbBrandTailwind, TbDevices, TbApi } from "react-icons/tb";
import { FaCss3Alt, FaGithub, FaGitAlt, FaBootstrap, FaNodeJs } from "react-icons/fa6";
import { SiMongodb, SiExpress, SiPostman, SiNextdotjs, SiStripe } from "react-icons/si";

const SkillsCanvas = lazy(() => import("./SkillsCanvas"));

const SKILL_GROUPS = [
  {
    id: "frontend",
    title: "Frontend Development",
    accentDot: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    dividerHighlight: "via-cyan-400/80",
    staggerDelay: 0,
    conicBeam:
      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(34,211,238,0.25) 310deg, rgba(34,211,238,1) 360deg)",
    internalGlow: "bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent",
    hoverShadow: "hover:shadow-lg hover:shadow-cyan-950/30",
    iconBorderHover: "group-hover/card:border-cyan-400/40",
    titleHover: "group-hover/card:text-cyan-300",
    skills: [
      {
        name: "Next.js",
        desc: "Building React-based web applications with page routing and reusable interfaces.",
        icon: <SiNextdotjs className="w-5 h-5 text-white" aria-hidden="true" />,
      },
      {
        name: "React.js",
        desc: "Reusable components, hooks, and interactive interfaces.",
        icon: <RiReactjsLine className="w-5 h-5 text-cyan-400" aria-hidden="true" />,
      },
      {
        name: "JavaScript (ES6+)",
        desc: "Application logic, modern syntax, and interactive functionality.",
        icon: <DiJavascript1 className="w-5 h-5 text-yellow-400" aria-hidden="true" />,
      },
      {
        name: "HTML5",
        desc: "Semantic structure for accessible web pages.",
        icon: <RiHtml5Line className="w-5 h-5 text-orange-500" aria-hidden="true" />,
      },
      {
        name: "CSS3",
        desc: "Custom styling, layouts, transitions, and animations.",
        icon: <FaCss3Alt className="w-5 h-5 text-blue-500" aria-hidden="true" />,
      },
      {
        name: "Tailwind CSS",
        desc: "Responsive interfaces with utility-based styling.",
        icon: <TbBrandTailwind className="w-5 h-5 text-cyan-300" aria-hidden="true" />,
      },
      {
        name: "Bootstrap",
        desc: "Responsive layouts and component-based styling.",
        icon: <FaBootstrap className="w-5 h-5 text-purple-400" aria-hidden="true" />,
      },
      {
        name: "Responsive Web Design",
        desc: "Interfaces that adapt across mobile, tablet, and desktop.",
        icon: <TbDevices className="w-5 h-5 text-teal-400" aria-hidden="true" />,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    accentDot: "bg-violet-400 shadow-[0_0_8px_#c084fc]",
    dividerHighlight: "via-violet-400/80",
    staggerDelay: 1.35,
    conicBeam:
      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(192,132,252,0.25) 310deg, rgba(192,132,252,1) 360deg)",
    internalGlow: "bg-gradient-to-b from-violet-500/10 via-transparent to-transparent",
    hoverShadow: "hover:shadow-lg hover:shadow-violet-950/30",
    iconBorderHover: "group-hover/card:border-violet-400/40",
    titleHover: "group-hover/card:text-violet-300",
    skills: [
      {
        name: "Node.js",
        desc: "Backend application development and server-side logic.",
        icon: <FaNodeJs className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
      },
      {
        name: "Express.js",
        desc: "Building backend routes and REST endpoints with Node.js.",
        icon: <SiExpress className="w-5 h-5 text-white" aria-hidden="true" />,
      },
      {
        name: "REST APIs",
        desc: "Integrating APIs and contributing to REST endpoint development.",
        icon: <TbApi className="w-5 h-5 text-indigo-400" aria-hidden="true" />,
      },
      {
        name: "MongoDB",
        desc: "CRUD operations and application data handling.",
        icon: <SiMongodb className="w-5 h-5 text-emerald-500" aria-hidden="true" />,
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    accentDot: "bg-gradient-to-r from-cyan-400 to-violet-400 shadow-[0_0_8px_#818cf8]",
    dividerHighlight: "via-cyan-400/50 via-violet-400/70",
    staggerDelay: 2.7,
    conicBeam:
      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168,85,247,0.3) 305deg, rgba(34,211,238,1) 360deg)",
    internalGlow: "bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent",
    hoverShadow: "hover:shadow-lg hover:shadow-indigo-950/30",
    iconBorderHover: "group-hover/card:border-cyan-400/40",
    titleHover: "group-hover/card:text-cyan-300",
    skills: [
      {
        name: "Git & GitHub",
        desc: "Version control and project repository management.",
        icon: (
          <div className="flex items-center justify-center gap-1 w-full h-full px-0.5" aria-hidden="true">
            <FaGitAlt className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
            <FaGithub className="w-3.5 h-3.5 text-white flex-shrink-0" />
          </div>
        ),
      },
      {
        name: "Bubble.io",
        desc: "Client application development with visual workflows.",
        icon: (
          <svg
            viewBox="0 0 14 14"
            fill="none"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              d="M8.43939 3.63487C7.18121 3.63487 5.94112 4.17502 4.99437 5.237V0H3.12085V8.81681C3.12085 8.81702 3.12085 8.81722 3.12085 8.81747C3.12085 11.6797 5.44115 14 8.30342 14C11.1657 14 13.486 11.6797 13.486 8.81747C13.486 5.95523 11.3016 3.63487 8.43939 3.63487ZM8.30342 12.0039C6.54358 12.0039 5.11694 10.5772 5.11694 8.81744C5.11694 7.0576 6.54358 5.63096 8.30342 5.63096C10.0632 5.63096 11.4899 7.0576 11.4899 8.81744C11.4899 10.5773 10.0632 12.0039 8.30342 12.0039Z"
              fill="currentColor"
              className="text-white group-hover/card:text-cyan-300 transition-colors"
            />
            <path
              d="M1.75886 11.4368C1.05105 11.4368 0.477295 12.0106 0.477295 12.7183C0.477295 13.4261 1.05105 13.9999 1.75886 13.9999C2.46667 13.9999 3.04042 13.4261 3.04042 12.7183C3.04042 12.0106 2.46667 11.4368 1.75886 11.4368Z"
              fill="#2563EB"
            />
          </svg>
        ),
      },
      {
        name: "Postman",
        desc: "Testing API requests, responses, and CRUD workflows.",
        icon: <SiPostman className="w-5 h-5 text-orange-400" aria-hidden="true" />,
      },
      {
        name: "Stripe",
        desc: "Payments & Subscriptions",
        icon: <SiStripe className="w-5 h-5 text-[#635BFF]" aria-hidden="true" />,
      },
    ],
  },
];

export default function Technologies() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Scoped CSS for perimeter border-beam and reduced motion */}
      <style>{`
        @keyframes tech-border-beam {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .tech-border-beam-spin {
          animation: tech-border-beam 3.8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-border-beam-spin {
            animation: none;
          }
        }
      `}</style>

      {/* 3D Floating Translucent Glass Shapes Drifting Background with Mouse Parallax */}
      <Suspense fallback={null}>
        <SkillsCanvas />
      </Suspense>

      {/* Soft Ambient Aurora Accents (Non-clipping) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-violet-600/10 via-cyan-500/8 to-transparent blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1428] border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Tech Stack</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3"
          >
            Technologies
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-zinc-300"
          >
            The focused frontend, backend, and workflow tools I use to build responsive web experiences.
          </motion.p>
        </div>

        {/* Three Clearly Separated Full-Width Category Groups Stacked Vertically */}
        <div className="space-y-10 sm:space-y-12">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="w-full space-y-5">
              {/* Category Heading with Accent Dot and Animated Traveling Divider Light */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3.5 w-full">
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${group.accentDot}`}
                    aria-hidden="true"
                  />
                  <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
                    {group.title}
                  </h3>
                </div>

                {/* Thin horizontal divider with staggered traveling highlight light */}
                <div className="relative flex-1 h-[1px] bg-white/10 overflow-hidden rounded-full">
                  {!prefersReducedMotion && (
                    <motion.div
                      className={`absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent ${group.dividerHighlight} to-transparent`}
                      initial={{ left: "-30%" }}
                      animate={{ left: "115%" }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: group.staggerDelay,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Skill Count Indicator */}
                <span className="text-xs font-mono text-zinc-400 flex-shrink-0">
                  {group.skills.length} {group.skills.length === 1 ? "Skill" : "Skills"}
                </span>
              </div>

              {/* Aligned rows of equal-sized cards: Desktop 4 cols, Tablet 2 cols, Mobile 1 col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 items-stretch">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`group/card relative p-[1px] rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 ${group.hoverShadow} h-full min-h-[136px] flex flex-col`}
                  >
                    {/* Fine static border */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-20 transition-colors duration-300 group-hover/card:border-transparent" />

                    {/* Subtle animated light segment traveling around perimeter on hover */}
                    {!prefersReducedMotion && (
                      <div
                        className="absolute -inset-[150%] tech-border-beam-spin opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                        style={{ background: group.conicBeam }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Card Inner Surface */}
                    <div className="relative z-10 w-full h-full rounded-[15px] bg-[#0c1322]/90 backdrop-blur-md p-5 flex flex-col justify-start overflow-hidden flex-1">
                      {/* Faint internal gradient highlight revealed on hover */}
                      <div
                        className={`absolute inset-0 rounded-[15px] ${group.internalGlow} opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none`}
                        aria-hidden="true"
                      />

                      {/* Content: Consistent Icon Box, Title, and Description */}
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-2.5">
                          <div
                            className={`w-10 h-10 rounded-xl bg-[#070b16] border border-white/10 flex items-center justify-center flex-shrink-0 ${group.iconBorderHover} shadow-inner transition-all duration-300`}
                          >
                            <div className="group-hover/card:scale-[1.06] transition-transform duration-300 flex items-center justify-center">
                              {skill.icon}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4
                              className={`text-sm sm:text-base font-bold text-white ${group.titleHover} transition-colors tracking-tight truncate`}
                            >
                              {skill.name}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                          {skill.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



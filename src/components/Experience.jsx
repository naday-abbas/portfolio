import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin, FiChevronRight } from "react-icons/fi";

const EXPERIENCES = [
  {
    company: "HZ Tech",
    companyMeta: "Karachi, Pakistan",
    isCurrentEmployer: true,
    roles: [
      {
        id: "hz-junior",
        role: "Junior Web Developer",
        dates: "May 2026 – Present",
        isCurrent: true,
        summary:
          "Contribute to client application development and project delivery, combining implementation with documentation and client communication.",
        responsibilities: [
          "Develop and refine client application interfaces and workflows using Bubble.io.",
          "Contribute to requirements clarification, prototypes, and project milestones.",
          "Prepare project documentation, progress updates, and delivery materials.",
          "Communicate with clients to clarify requirements and report progress.",
          "Collaborate with senior developers and teammates throughout implementation and delivery.",
        ],
        technologies: [
          "Bubble.io",
          "Application Development",
          "Documentation",
          "Client Communication",
        ],
      },
      {
        id: "hz-intern",
        role: "Web Developer Intern",
        dates: "January 2026 – April 2026",
        isCurrent: false,
        summary:
          "Supported client application development while gaining practical experience in collaborative project delivery.",
        responsibilities: [
          "Contributed to a client project alongside fellow interns and senior developers.",
          "Assisted with application implementation, prototypes, and documentation.",
          "Incorporated feedback during development and supported project handover.",
        ],
        technologies: [
          "Bubble.io",
          "Prototyping",
          "Team Collaboration",
        ],
      },
    ],
  },
  {
    company: "Techmire Solutions",
    companyMeta: "Karachi, Pakistan",
    isCurrentEmployer: false,
    roles: [
      {
        id: "techmire-backend",
        role: "Back End Developer Intern",
        dates: "April 2025 – July 2025",
        isCurrent: false,
        summary:
          "Assisted senior developers with backend API functionality and database operations.",
        responsibilities: [
          "Assisted in developing Node.js and Express.js REST APIs for backend application functionality.",
          "Assisted with MongoDB CRUD operations and backend data handling while working alongside senior developers.",
        ],
        technologies: [
          "Node.js",
          "Express.js",
          "REST APIs",
          "MongoDB",
        ],
      },
    ],
  },
];

export default function Experience() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Aurora */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-gradient-to-r from-cyan-600/8 via-violet-600/8 to-transparent blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1428] border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Professional Journey</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3"
          >
            Work Experience
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-zinc-300"
          >
            Practical experience building applications and contributing to client project delivery.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Continuous Slim Timeline Rail */}
          <div
            className="absolute left-4 sm:left-6 md:left-[260px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400/50 via-violet-500/30 to-white/10 rounded-full"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {EXPERIENCES.map((employer) => (
              <div key={employer.company} className="relative">
                {/* Company Header Tag */}
                <div className="flex items-center gap-3 mb-6 pl-10 sm:pl-16 md:pl-[286px]">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 flex-shrink-0">
                    <FiBriefcase className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
                      <span>{employer.company}</span>
                      {employer.isCurrentEmployer && (
                        <span className="text-[11px] font-mono font-medium text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 px-2.5 py-0.5 rounded-full">
                          Current Employer
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono flex items-center gap-1 mt-0.5">
                      <FiMapPin className="w-3 h-3 text-cyan-400" aria-hidden="true" />
                      <span>{employer.companyMeta}</span>
                    </p>
                  </div>
                </div>

                {/* Connected Stages under this employer */}
                <div className="space-y-8">
                  {employer.roles.map((role, rIdx) => {
                    const isHovered = hoveredRole === role.id;
                    const isLastInEmployer = rIdx === employer.roles.length - 1;

                    return (
                      <motion.div
                        key={role.id}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5, delay: rIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => setHoveredRole(role.id)}
                        onMouseLeave={() => setHoveredRole(null)}
                        className="relative flex flex-col md:flex-row items-start group"
                      >
                        {/* Milestone Node on Rail */}
                        <div
                          className={`absolute left-4 sm:left-6 md:left-[260px] -translate-x-1/2 top-6 z-20 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                            role.isCurrent
                              ? "bg-[#060913] border-cyan-400 shadow-[0_0_12px_#22d3ee]"
                              : isHovered
                              ? "bg-[#060913] border-violet-400 shadow-[0_0_10px_#a855f7]"
                              : "bg-[#0c1324] border-white/30"
                          }`}
                          aria-hidden="true"
                        >
                          {/* Inner pulse dot for current role */}
                          {role.isCurrent && !prefersReducedMotion ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-80" />
                          ) : (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                role.isCurrent
                                  ? "bg-cyan-400"
                                  : isHovered
                                  ? "bg-violet-400"
                                  : "bg-white/40"
                              }`}
                            />
                          )}
                        </div>

                        {/* Desktop Left Column: Dates and Progression Metadata (Hidden on Mobile) */}
                        <div className="hidden md:block w-[250px] pr-6 text-right pt-5 flex-shrink-0">
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-300 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/10 whitespace-nowrap">
                            <FiCalendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                            <span>{role.dates}</span>
                          </div>
                          {role.isCurrent && (
                            <div className="mt-1.5 text-[11px] font-mono font-medium text-cyan-300">
                              Active Position
                            </div>
                          )}
                          {!role.isCurrent && employer.roles.length > 1 && (
                            <div className="mt-1.5 text-[11px] font-mono text-zinc-400">
                              Promoted to Junior
                            </div>
                          )}
                        </div>

                        {/* Right Content Column: Role Card */}
                        <div className="w-full pl-10 sm:pl-16 md:pl-8 flex-1">
                          <div
                            className={`rounded-2xl p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 border ${
                              role.isCurrent
                                ? "bg-[#0c1324]/90 border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-950/20"
                                : "bg-[#0c1324]/75 border-white/10 hover:border-violet-500/40 shadow-md"
                            }`}
                          >
                            {/* Mobile Dates Header (Shown only on small screens) */}
                            <div className="md:hidden flex items-center justify-between gap-2 mb-3">
                              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10 whitespace-nowrap">
                                <FiCalendar className="w-3 h-3 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                                <span>{role.dates}</span>
                              </span>
                              {role.isCurrent && (
                                <span className="text-[11px] font-mono font-medium text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30">
                                  Current
                                </span>
                              )}
                            </div>

                            {/* Role Title and Hierarchy Accent */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <h4
                                className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                                  role.isCurrent
                                    ? "text-white group-hover:text-cyan-300"
                                    : "text-zinc-100 group-hover:text-violet-300"
                                }`}
                              >
                                {role.role}
                              </h4>

                              {role.isCurrent ? (
                                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                  Current Role
                                </span>
                              ) : (
                                <span className="text-xs font-mono text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                                  Completed
                                </span>
                              )}
                            </div>

                            {/* Summary */}
                            <p className="text-sm text-zinc-300 leading-relaxed font-normal mb-4">
                              {role.summary}
                            </p>

                            {/* Responsibilities Bullet List (Readable immediately without tabs/hover) */}
                            <div className="mb-5">
                              <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
                                Key Responsibilities
                              </h5>
                              <ul className="space-y-2">
                                {role.responsibilities.map((resp, i) => (
                                  <li
                                    key={i}
                                    className="text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-2"
                                  >
                                    <FiChevronRight
                                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                        role.isCurrent ? "text-cyan-400" : "text-violet-400"
                                      }`}
                                      aria-hidden="true"
                                    />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technology Labels */}
                            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold mr-1">
                                Tech:
                              </span>
                              {role.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className={`text-xs font-mono font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                                    role.isCurrent
                                      ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/25 group-hover:border-cyan-400/40"
                                      : "bg-white/[0.03] text-zinc-300 border-white/10 group-hover:border-violet-500/30"
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

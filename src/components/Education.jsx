import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiAward, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";

export default function Education() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const areasOfStudy = [
    "Programming",
    "Databases",
    "Web Technologies",
    "Software Design",
  ];

  return (
    <section id="education" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Aurora */}
      <div
        className="absolute top-1/2 right-1/4 w-[550px] h-[320px] bg-gradient-to-r from-violet-600/8 via-cyan-500/8 to-transparent blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1428] border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Academic Background</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3"
          >
            Education
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-zinc-300"
          >
            A foundation in software engineering, strengthened through practical web-development training.
          </motion.p>
        </div>

        {/* Thin horizontal accent above composition with slow, soft luminance pulse */}
        <div className="relative w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 via-violet-400/25 to-transparent mb-10">
          {!prefersReducedMotion && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 via-violet-400/50 to-transparent animate-pulse opacity-60 pointer-events-none"
              style={{ animationDuration: "5s" }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Asymmetric Hierarchy Layout: Natural Content Height & Top-Aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Prominent Degree Panel (~2/3 width) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 xl:col-span-8 rounded-2xl sm:rounded-3xl bg-[#0c1324]/90 border border-cyan-500/25 hover:border-cyan-400/50 backdrop-blur-xl p-5 sm:p-7 md:p-8 transition-colors duration-300 relative overflow-hidden flex flex-col group shadow-xl"
          >
            {/* Faint atmospheric gradient */}
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-violet-600/5 to-transparent blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Header: Label, Icon, and Single Status Chip */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-colors shadow-inner flex-shrink-0">
                    <FiBookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25">
                    Degree Program
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-medium shadow-sm">
                  <FiClock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>In progress</span>
                </div>
              </div>

              {/* Degree Title with strongest hierarchy */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2 leading-snug">
                Bachelor of Science in Software Engineering
              </h3>

              {/* Full University Name */}
              <p className="text-base sm:text-lg font-medium text-zinc-200 mb-3.5">
                Sir Syed University of Engineering & Technology
              </p>

              {/* Rich Description */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal mb-6">
                Academic work spanning programming, databases, web technologies, software design, and practical software engineering projects.
              </p>

              {/* Structured Inset Area: "Areas of Study" with compact understated labels */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-[#070c18]/90 border border-white/10 shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Areas of Study
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {areasOfStudy.map((area) => (
                    <div
                      key={area}
                      className="px-2.5 sm:px-3 py-2 rounded-xl bg-white/[0.03] border-l-2 border-l-cyan-400 border border-white/5 flex items-center shadow-sm"
                    >
                      <span className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Meta Bar: Expected Graduation Date, exactly 24-28px (mt-6 sm:mt-7) below Areas of Study */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 mt-6 sm:mt-7">
              <div className="flex items-center gap-2 text-zinc-300">
                <FiCalendar className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span className="font-medium">Expected graduation: 2026</span>
              </div>
              <span className="text-cyan-300 font-medium hidden sm:inline-block">
                B.S. Program
              </span>
            </div>
          </motion.div>

          {/* Right: Two Supporting Panels Stacked Vertically (~1/3 width) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
            {/* Panel 2: Technical Training */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-[#0c1324]/80 border border-white/10 hover:border-violet-500/40 backdrop-blur-xl p-5 sm:p-6 transition-colors duration-300 relative overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-400/40 transition-colors shadow-inner">
                      <FiAward className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-violet-300 font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25">
                      Technical Training
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-medium">
                    <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Completed</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-violet-300 transition-colors tracking-tight mb-1">
                  Smart Web Designing
                </h3>

                <p className="text-sm font-medium text-zinc-200 mb-2.5">
                  Malaysian Learning Hub
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-4">
                  Six-month practical training in HTML, CSS, Bootstrap, and the fundamentals of responsive web design.
                </p>
              </div>

              <div className="pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 mt-auto">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <FiCalendar className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                  <span>March 2023 – August 2023</span>
                </div>
              </div>
            </motion.div>

            {/* Panel 3: Intermediate Education */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-[#0c1324]/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl p-5 sm:p-6 transition-colors duration-300 relative overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-colors shadow-inner">
                      <FiBookOpen className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25">
                      Intermediate
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-medium">
                    <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Completed</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-1">
                  Intermediate in Computer Science
                </h3>

                <p className="text-sm font-medium text-zinc-200 mb-2.5">
                  Bahria Foundation College Kandiaro
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-4">
                  Foundation in computer science and general academic studies.
                </p>
              </div>

              <div className="pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 mt-auto">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <FiCalendar className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  <span>2019–2020</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

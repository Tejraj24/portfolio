import { motion } from 'motion/react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { Experience as ExperienceType } from '../types';
import { EXPERIENCES } from '../data';

export default function Experience() {
  const experiences: ExperienceType[] = EXPERIENCES;

  return (
    <section
      id="experience"
      className="bg-bg-primary py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-custom/50"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <div>
          <span className="font-mono text-xs text-gold-dark uppercase tracking-widest block mb-3">EDUCATION & JOURNEY</span>
          <h2 className="font-display font-black text-5xl md:text-7xl text-black dark:text-white tracking-tighter uppercase leading-none">
            ACADEMIC <br />
            <span className="text-stroke-black text-black dark:text-white">TIMELINE.</span>
          </h2>
        </div>
        <p className="font-sans text-text-secondary max-w-sm text-sm md:text-base leading-relaxed">
          Tracing my specialized student path at JECRC University under the Kalvium Software Product Engineering curriculum and full-stack creations.
        </p>
      </div>

      {/* Modern Vertical Timeline */}
      <div className="relative mt-12 pl-4 sm:pl-8 lg:pl-12" id="experience-timeline-container">
        {/* Central Vertical Connector Line */}
        <div className="absolute left-4 sm:left-8 lg:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-accent via-border-custom to-border-custom/20" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative pl-8 sm:pl-12 items-start"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              id={`experience-item-${exp.id}`}
            >
              {/* Timeline Bullet Node Indicator */}
              <div className="absolute left-[-5px] sm:left-[-5px] lg:left-[-5px] top-1.5 z-10">
                <motion.div
                  className="w-4.5 h-4.5 rounded-full bg-black border-4 border-gold-accent flex items-center justify-center shadow-md cursor-pointer hover:bg-gold-accent transition-all duration-300"
                  whileHover={{ scale: 1.4 }}
                />
              </div>

              {/* Experience Info Card */}
              <div className="bg-white dark:bg-neutral-900 border border-border-custom dark:border-neutral-800 rounded-4xl p-6 md:p-8 hover:shadow-[0_20px_50px_rgba(244,178,62,0.12)] dark:hover:shadow-[0_20px_50px_rgba(244,178,62,0.06)] hover:border-gold-accent hover:-translate-y-1.5 transition-all duration-500 relative group overflow-hidden">
                {/* Visual Top Highlight accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs text-gold-dark uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.company}
                    </span>
                    <h3 className="font-display font-black text-2xl md:text-3xl text-black dark:text-white tracking-tight mt-1">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-mono text-text-secondary">
                    <span className="bg-bg-primary px-3 py-1.5 rounded-full border border-border-custom/50 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="bg-bg-primary px-3 py-1.5 rounded-full border border-border-custom/50 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="space-y-3.5 pl-2 mb-8" id={`exp-bullets-${exp.id}`}>
                  {exp.description.map((bullet, k) => (
                    <li key={k} className="font-sans text-sm md:text-base text-text-secondary flex items-start space-x-3 leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold-accent flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border-custom/50">
                  {exp.skills.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-black dark:text-neutral-200 bg-bg-primary dark:bg-neutral-900 hover:bg-gold-accent dark:hover:bg-gold-accent hover:text-black dark:hover:text-black border border-border-custom dark:border-neutral-800 px-3 py-1.5 rounded-full transition-colors duration-200 interactive-cursor"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

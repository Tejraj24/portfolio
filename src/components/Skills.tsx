import { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Layout, HardDrive, Terminal, HelpCircle, ShieldCheck } from 'lucide-react';
import { Skill } from '../types';
import { SKILLS } from '../data';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'languages' | 'tools' | 'ai'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = SKILLS;

  const categories = [
    { id: 'all', name: 'All Domains', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'frontend', name: 'Frontend', icon: <Layout className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend Solutions', icon: <HardDrive className="w-4 h-4" /> },
    { id: 'languages', name: 'Languages', icon: <Terminal className="w-4 h-4" /> },
    { id: 'ai', name: 'AI Models', icon: <Cpu className="w-4 h-4" /> },
    { id: 'tools', name: 'Dev Tools', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Layout className="w-4 h-4 text-amber-500" />;
      case 'backend': return <HardDrive className="w-4 h-4 text-blue-500" />;
      case 'languages': return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'tools': return <ShieldCheck className="w-4 h-4 text-purple-500" />;
      case 'ai': return <Cpu className="w-4 h-4 text-gold-accent" />;
      default: return <HelpCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <section
      id="skills"
      className="bg-bg-primary py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-custom/50 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div className="space-y-4">
          <span className="font-mono text-xs text-gold-dark uppercase tracking-widest block">SKILLSETS MATRIX</span>
          <h2 className="font-display font-black text-5xl md:text-7xl text-black dark:text-white tracking-tighter uppercase leading-none">
            ENGINEERING <br />
            <span className="text-stroke-black text-black dark:text-white">PROFICIENCIES.</span>
          </h2>
          <p className="font-sans text-text-secondary text-base max-w-lg leading-relaxed pt-2">
            Click domain filters to dissect individual expertise benchmarks. Hover any tech shield icon to inspect quantitative operational knowledge.
          </p>
        </div>

        {/* Categories navigation switcher side rail layout */}
        <div className="flex flex-wrap lg:grid lg:grid-cols-2 gap-2 bg-white/70 dark:bg-neutral-900/60 p-3 rounded-4xl border border-border-custom dark:border-neutral-800 shadow-xs" id="skills-category-switcher">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center space-x-2.5 px-5 py-3 rounded-2xl font-mono text-xs uppercase font-medium tracking-wider transition-all duration-300 interactive-cursor ${
                activeCategory === cat.id
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-text-secondary hover:bg-bg-primary dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
              }`}
              id={`skills-category-btn-${cat.id}`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Staggered Grid of Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" id="skills-grid">
        {filteredSkills.map((skill, index) => {
          const isHovered = hoveredSkill === skill.name;
          
          // Slow subtle random float offsets via math indexes
          const floatOffset = [2, -2, 3, -3, 1, -1][index % 6];
          
          return (
            <motion.div
              key={skill.name}
              className="relative bg-white dark:bg-neutral-900 border border-border-custom dark:border-neutral-800/80 rounded-3xl p-5 hover:border-gold-accent hover:shadow-[0_15px_30px_rgba(244,178,62,0.12)] dark:hover:shadow-[0_15px_30px_rgba(244,178,62,0.06)] transition-all duration-300 group overflow-hidden interactive-cursor select-none"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, floatOffset, 0] }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 4 + (index % 3),
                  ease: 'easeInOut',
                },
                default: {
                  duration: 0.5,
                  delay: (index % 4) * 0.05
                }
              }}
              id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {/* Category Node Indicator Bubble */}
              <div className="flex justify-between items-center mb-6">
                <span className="p-2 bg-bg-primary rounded-xl block">
                  {getCategoryIcon(skill.category)}
                </span>
                <span className="font-mono text-[9px] uppercase text-text-secondary/60 bg-bg-primary px-2 py-0.5 rounded-md">
                  {skill.category}
                </span>
              </div>

              {/* Title label */}
              <h4 className="font-display font-extrabold text-base text-black dark:text-neutral-100 tracking-tight leading-none group-hover:text-gold-dark dark:group-hover:text-gold-accent transition-colors mb-2">
                {skill.name}
              </h4>

              {/* Skill Proficiency metrics display */}
              <div className="h-5 flex items-center">
                {!isHovered ? (
                  <span className="font-mono text-xs text-text-secondary">LEVEL: {skill.level}%</span>
                ) : (
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                  >
                    <div className="w-full bg-border-custom h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-gold-accent h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Glowing decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gold-accent opacity-0 group-hover:opacity-10 group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-350 rounded-full" />
            </motion.div>
          );
        })}
      </div>

      {/* Currently Learning Horizontal Badge Ribbon */}
      <motion.div 
        className="mt-16 bg-neutral-50 dark:bg-neutral-900/60 border border-border-custom dark:border-neutral-800 rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        id="skills-currently-learning"
      >
        <div className="space-y-1.5 z-10">
          <span className="font-mono text-[10px] text-gold-dark uppercase tracking-widest font-bold block">CONTINUOUS SPECTRUM</span>
          <h4 className="font-display font-extrabold text-xl md:text-2xl text-black dark:text-white tracking-tight uppercase">CURRENTLY LEARNING</h4>
          <p className="font-sans text-xs md:text-sm text-text-secondary">
            Actively expanding my product boundaries into modern AI stacks, cloud infrastructure paradigms, and high-performance server runners.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2.5 z-10 shrink-0">
          {['AI Integrations', 'AWS Fundamentals', 'FastAPI'].map((tech) => (
            <span 
              key={tech} 
              className="font-mono text-xs uppercase font-bold text-black dark:text-neutral-200 bg-white dark:bg-neutral-950 px-4 py-2.5 rounded-2xl border border-border-custom/80 dark:border-neutral-800 shadow-xs hover:border-gold-accent hover:text-gold-dark dark:hover:text-gold-accent transition-all duration-300"
            >
              • {tech}
            </span>
          ))}
        </div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

    </section>
  );
}

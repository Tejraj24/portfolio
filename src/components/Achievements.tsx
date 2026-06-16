import { motion } from 'motion/react';
import { Award, Shield, Cpu, Code, Trophy, ExternalLink } from 'lucide-react';
import { Achievement } from '../types';
import { ACHIEVEMENTS } from '../data';

export default function Achievements() {
  const achievements: Achievement[] = ACHIEVEMENTS;

  const getIcon = (type: string) => {
    switch (type) {
      case 'hackathon': return <Trophy className="w-5 h-5 text-gold-accent" />;
      case 'academic': return <Shield className="w-5 h-5 text-gold-accent" />;
      case 'certification': return <Cpu className="w-5 h-5 text-gold-accent" />;
      case 'contribution': return <Code className="w-5 h-5 text-gold-accent" />;
      default: return <Award className="w-5 h-5 text-gold-accent" />;
    }
  };

  return (
    <section
      id="achievements"
      className="bg-bg-primary py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-custom/50"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <span className="font-mono text-xs text-gold-dark uppercase tracking-widest block mb-3 font-semibold">HONORARY DECORATIONS</span>
          <h2 className="font-display font-black text-5xl md:text-7xl text-black tracking-tighter uppercase leading-none">
            MILESTONES & <br />
            <span className="text-stroke-black text-black">ACHIEVEMENTS.</span>
          </h2>
        </div>
        <p className="font-sans text-text-secondary max-w-sm text-sm md:text-base leading-relaxed">
          Celebrating technical milestones, full-stack architectural deployments, and AI engineering accomplishments.
        </p>
      </div>

      {/* Featured Career Goal Card - My Vision */}
      <motion.div
        className="w-full mb-12 bg-black text-white p-8 md:p-12 rounded-4xl border border-neutral-900 shadow-xl overflow-hidden relative group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        id="achievements-vision-hero"
      >
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-accent/5 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start relative z-10">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-xs text-gold-accent uppercase tracking-[0.2em] font-bold">CAREER GOAL // TARGET</span>
            <h3 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase">My Vision</h3>
            <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed pt-2">
              My goal is to become a highly skilled Full Stack Developer and AI Engineer who builds products that positively impact people's lives. I am actively exploring AI-powered applications, automation systems, and scalable software solutions while continuously improving my technical expertise.
            </p>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-3xl shrink-0 flex items-center justify-center font-mono text-[10px] uppercase text-gold-accent tracking-widest">
            <span>VISION_SEC_05 // TARGET</span>
          </div>
        </div>
      </motion.div>

      {/* Grid of the 6 key milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="achievements-grid">
        {achievements.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white dark:bg-neutral-900 border border-border-custom dark:border-neutral-800 px-6 py-8 rounded-4xl hover:border-gold-accent hover:shadow-[0_20px_50px_rgba(244,178,62,0.12)] dark:hover:shadow-[0_20px_50px_rgba(244,178,62,0.06)] transition-all duration-500 flex flex-col justify-between group overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
            id={`achievement-card-${item.id}`}
          >
            {/* Ambient hover glowing backdrop indicator */}
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-gold-accent/5 rounded-full blur-2xl transform translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700" />

            <div className="space-y-6">
              {/* Category tag row */}
              <div className="flex items-center justify-between">
                <span className="p-3 bg-bg-primary rounded-2xl block w-fit border border-border-custom/40">
                  {getIcon(item.type)}
                </span>
                <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest bg-bg-primary px-3 py-1.5 rounded-full border border-border-custom/30">
                  {item.date}
                </span>
              </div>

              {/* Title & Description details */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase text-gold-dark tracking-widest font-bold">FOCUS // {item.issuer}</span>
                <h3 className="font-display font-extrabold text-xl text-black dark:text-neutral-100 tracking-tight leading-tight group-hover:text-gold-dark transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-text-secondary leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Bottom link indicator arrow */}
            <div className="pt-6 border-t border-border-custom/50 flex justify-between items-center mt-6">
              <span className="font-mono text-[10px] text-text-secondary uppercase">METRIC_STRENGTH // 0{index + 1}</span>
              <span className="font-mono text-[10px] text-gold-dark font-black tracking-widest">[VERIFIED]</span>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}

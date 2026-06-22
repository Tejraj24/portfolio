import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Layers, GitCommit, Award, Sparkles, FileText } from 'lucide-react';
// @ts-ignore
import regeneratedImage from '../assets/images/regenerated_image_1781030106390.webp';

interface AboutProps {
  onOpenResume?: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: '01 / My Mission' },
    { id: 1, title: '02 / Education' },
    { id: 2, title: '03 / Tech Philosophy' }
  ];

  const tabContent = [
    {
      title: "Developing intelligent full-stack applications to solve complex real-world challenges.",
      description: "My passion lies in creating impactful software products. I have hands-on experience building end-to-end full-stack applications, integrating complex APIs, deploying robust web solutions, and leveraging AI-assisted development workflows to accelerate innovation.",
      tags: ["Full Stack Specialist", "System Architecture", "AI Integrations"]
    },
    {
      title: "Academic Excellence & Rigorous Engineering Curriculum.",
      description: "I am currently pursuing a B.Tech in Computer Science & Engineering (Software Product Engineering) at JECRC University, Jaipur. This journey is facilitated by the prestigious Kalvium Undergraduate Program, which emphasizes project-based learning and industry-level software engineering paradigms.",
      tags: ["B.Tech CS Engineering", "Kalvium Program", "JECRC University"]
    },
    {
      title: "Continuous Learning & Clean Code Methodologies.",
      description: "I thrive on mastering new technologies and exploring AI automation. My technical philosophy centers around building scalable applications that not only function flawlessly but also deliver meaningful, intuitive user experiences through modern design patterns.",
      tags: ["MERN Stack", "Clean Code", "API Architecture"]
    }
  ];

  const counters = [
    { value: '4+', label: 'Major Projects Built', icon: <Layers className="w-5 h-5 text-gold-accent" /> },
    { value: '10+', label: 'Technologies Used', icon: <Calendar className="w-5 h-5 text-gold-accent" /> },
    { value: '1,000+', label: 'Hours of Learning', icon: <Award className="w-5 h-5 text-gold-accent" /> },
    { value: '100+', label: 'Git Commits', icon: <GitCommit className="w-5 h-5 text-gold-accent" /> },
  ];

  return (
    <section
      id="about"
      className="bg-black text-white py-24 px-6 md:px-12 overflow-hidden relative"
    >
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-12 left-12 opacity-5 font-mono text-xs select-none">
        02 / ABOUT AGENCY & CREATOR
      </div>
      <div className="absolute bottom-12 right-12 opacity-5 font-mono text-xs select-none">
        LATITUDE 45° N // LONGITUDE 122° W
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Heading with Text-Stroke Scroll Decor */}
        <div className="w-full text-center md:text-left mb-16 relative">
          <span className="font-mono text-xs text-gold-accent uppercase tracking-widest block mb-3">GET TO KNOW ME</span>
          <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-tight relative z-10 uppercase">
            ABOUT <br />
            <span className="text-stroke-white text-white">ME.</span>
          </h2>
          {/* Faint marquee backing */}
          <div className="absolute -top-10 left-0 right-0 h-24 overflow-hidden pointer-events-none select-none opacity-5 flex items-center">
            <span className="font-display font-black text-[120px] whitespace-nowrap uppercase">
              ABOUT • ARCHITECT • ABOUT • ARCHITECT • ABOUT
            </span>
          </div>
        </div>

        {/* Dynamic Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start w-full">
          
          {/* Left / Center Side: Animated portrait with radial geometries */}
          <div className="lg:col-span-5 flex justify-center relative py-12" id="about-visual-canvas">
            {/* Geometric Radar Crosshairs */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="border border-white/10 rounded-full w-[100%] aspect-square absolute pointer-events-none animate-spin-slow" />
              <div className="border border-dashed border-white/20 rounded-full w-[80%] aspect-square absolute pointer-events-none" />
              <div className="h-[110%] w-[1px] bg-white/10 absolute rotate-45" />
              <div className="h-[110%] w-[1px] bg-white/10 absolute -rotate-45" />
              <svg className="w-full h-full absolute animate-spin-slow pointer-events-none max-w-[420px] opacity-40" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fill="#ffffff" fontSize="4.2" letterSpacing="2" className="font-mono uppercase transition-all duration-300">
                  <textPath href="#circlePath" startOffset="0%">
                    • TEJRAJ • VISUAL ENGINEERING • AI LABS • CREATIVE DEV •
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="absolute w-[200px] h-[200px] bg-gold-accent/25 rounded-full blur-[70px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <motion.div
              className="relative w-[280px] sm:w-[320px] aspect-[3/4] rounded-4xl overflow-hidden border-4 border-white/10 shadow-3xl bg-black interactive-cursor"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70" />
              <motion.img
                src={regeneratedImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/profile.jpg";
                }}
                alt="Tejraj Creative Portfolio Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1000"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="font-mono text-gold-accent text-xs uppercase tracking-widest mb-1">DESIGN CODE DIRECTIVE</p>
                <h4 className="font-display font-extrabold text-white text-lg tracking-tight">AI & CREATIVE CO-OP</h4>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Tabbed Interactive Editorial Interface */}
          <div className="lg:col-span-7 flex flex-col space-y-10" id="about-content">
            
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-y-4 space-x-6 border-b border-neutral-800 relative pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-colors duration-300 relative ${
                    activeTab === tab.id ? 'text-gold-accent font-bold' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {tab.title}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-gold-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content Panel */}
            <div className="min-h-[200px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {tabContent[activeTab].title}
                  </h3>
                  
                  <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
                    {tabContent[activeTab].description}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {tabContent[activeTab].tags.map((tag, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-gold-accent cursor-default shadow-sm hover:shadow-[0_0_10px_rgba(244,178,62,0.2)] transition-shadow"
                      >
                        {tag}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Launch CV Button */}
            {onOpenResume && (
              <div className="pt-2">
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center space-x-2 bg-neutral-900 border-2 border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-black font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 interactive-cursor shadow-[0_0_15px_rgba(244,178,62,0.15)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>LAUNCH GLASSMORPHIC CV HUD</span>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>
            )}

            {/* Counters / Stats Matrix - Clean Luxury Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4 mt-auto">
              {counters.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 p-5 rounded-3xl relative group overflow-hidden transition-all duration-300 hover:border-gold-accent/50 hover:bg-neutral-900/80"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="p-2.5 bg-black/50 rounded-2xl block w-fit">
                      {item.icon}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500 uppercase">METRIC_0{index + 1}</span>
                  </div>
                  <h4 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight group-hover:text-gold-accent transition-colors">
                    {item.value}
                  </h4>
                  <p className="font-sans text-xs text-gray-400 mt-1">{item.label}</p>
                  <div className="absolute right-0 bottom-0 w-16 h-1 bg-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-350" />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

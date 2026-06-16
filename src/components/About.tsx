import { motion } from 'motion/react';
import { Calendar, Layers, GitCommit, Award, Sparkles, FileText } from 'lucide-react';
// @ts-ignore
import regeneratedImage from '../assets/images/regenerated_image_1781030106390.webp';

interface AboutProps {
  onOpenResume?: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const counters = [
    { value: '4+', label: 'Major Projects Built', icon: <Layers className="w-5 h-5 text-gold-accent" /> },
    { value: '10+', label: 'Technologies Used', icon: <Calendar className="w-5 h-5 text-gold-accent" /> },
    { value: '1,000+', label: 'Hours of Learning & Development', icon: <Award className="w-5 h-5 text-gold-accent" /> },
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Left / Center Side: Animated portrait with radial geometries */}
          <div className="lg:col-span-5 flex justify-center relative py-12" id="about-visual-canvas">
            {/* Geometric Radar Crosshairs */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Outer circle */}
              <div className="border border-white/10 rounded-full w-[100%] aspect-square absolute pointer-events-none animate-spin-slow" />
              {/* Mid dotted circle */}
              <div className="border border-dashed border-white/20 rounded-full w-[80%] aspect-square absolute pointer-events-none" />
              {/* Crosshair lines */}
              <div className="h-[110%] w-[1px] bg-white/10 absolute rotate-45" />
              <div className="h-[110%] w-[1px] bg-white/10 absolute -rotate-45" />
              {/* Luxury circular text orbit */}
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

            {/* Glowing Golden Radiant Backing */}
            <div className="absolute w-[200px] h-[200px] bg-gold-accent/25 rounded-full blur-[70px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Central Portrait Card */}
            <motion.div
              className="relative w-[280px] sm:w-[320px] aspect-[3/4] rounded-4xl overflow-hidden border-4 border-white/10 shadow-3xl bg-black interactive-cursor"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              id="about-portrait-card"
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

          {/* Right Side: Narrative Editorial Text & Interactive Statistics */}
          <div className="lg:col-span-7 space-y-10" id="about-content">
            <div className="space-y-6">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Developing intelligent full-stack applications to solve complex real-world challenges.
              </h3>
              
              <div className="font-sans text-gray-400 text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  I am currently pursuing a **B.Tech in Computer Science & Engineering (Software Product Engineering)** at JECRC University, Jaipur through the prestigious **Kalvium Undergraduate Program**.
                </p>
                <p>
                  My passion lies in creating impactful software products that solve real-world challenges. I have hands-on experience building full-stack applications, integrating APIs, deploying web solutions, and working with AI-assisted development tools.
                </p>
                <p>
                  I enjoy learning new technologies, exploring AI automation, and building scalable applications that deliver meaningful user experiences.
                </p>
              </div>

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

              {/* Highlights list based on official details */}
              <div className="pt-4 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-3" id="about-highlights">
                {[
                  "Full Stack Development",
                  "AI-Powered Applications",
                  "MERN Stack Development",
                  "API Integrations",
                  "Modern Web Technologies",
                  "Continuous Learning Mindset"
                ].map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-300 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Counters / Stats Matrix - Clean Luxury Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4" id="about-counters-grid">
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
                  {/* Subtle hover accent decoration */}
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

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Terminal, 
  Database, 
  Code, 
  Package, 
  Cpu, 
  GitBranch, 
  Github, 
  Workflow, 
  Flame, 
  Share2 
} from 'lucide-react';

const technologies = [
  { 
    name: 'React', 
    level: 'Expert // 95% Benchmark', 
    description: 'Developing declarative, high-performance UI components with modern hook architectures and state management trees.',
    icon: <Layers className="w-4 h-4 text-amber-500" /> 
  },
  { 
    name: 'TypeScript', 
    level: 'Expert // 95% Benchmark',
    description: 'Establishing rigid compile-time safety and type mappings across full-stack server-to-client interfaces.',
    icon: <Code className="w-4 h-4 text-blue-500" /> 
  },
  { 
    name: 'Node.js', 
    level: 'Expert // 92% Benchmark',
    description: 'Asynchronous event-driven backend runtimes, high-throughput workers, API routing engines, and custom proxy servers.',
    icon: <Terminal className="w-4 h-4 text-emerald-500" /> 
  },
  { 
    name: 'Next.js', 
    level: 'Expert // 94% Benchmark',
    description: 'Deploying edge-rendered routing structures, server components, and incremental static page generation workflows.',
    icon: <Cpu className="w-4 h-4 text-neutral-200" /> 
  },
  { 
    name: 'Python', 
    level: 'Proficient // 85% Benchmark',
    description: 'Designing backend server runners, automated testing modules, dynamic data scrapers, and smart intelligence integrations.',
    icon: <Code className="w-4 h-4 text-sky-500" /> 
  },
  { 
    name: 'PostgreSQL', 
    level: 'Expert // 90% Benchmark',
    description: 'Structuring highly-optimized relational tabular databases with robust JSON querying and complex atomic transactions.',
    icon: <Database className="w-4 h-4 text-indigo-400" /> 
  },
  { 
    name: 'Docker', 
    level: 'Proficient // 80% Benchmark',
    description: 'Packaging portable runtime environments, microservice isolation containers, and orchestrated development platforms.',
    icon: <Package className="w-4 h-4 text-blue-400" /> 
  },
  { 
    name: 'Firebase', 
    level: 'Expert // 93% Benchmark',
    description: 'Provisioning low-latency persistent NoSQL Firestore collections and secure Federated Authentication providers.',
    icon: <Flame className="w-4 h-4 text-orange-500" /> 
  },
  { 
    name: 'MongoDB', 
    level: 'Proficient // 85% Benchmark',
    description: 'Document-oriented aggregation frameworks, distributed clustering setups, and elastic unstructured storage indexes.',
    icon: <Database className="w-4 h-4 text-emerald-600" /> 
  },
  { 
    name: 'Java', 
    level: 'Proficient // 82% Benchmark',
    description: 'Constructing robust object-oriented backend microservices frameworks with Spring Boot compilers.',
    icon: <Terminal className="w-4 h-4 text-red-500" /> 
  },
  { 
    name: 'Git', 
    level: 'Expert // 95% Benchmark',
    description: 'Maintaining version control stability, granular workspace branching tracks, and complex rebase operations.',
    icon: <GitBranch className="w-4 h-4 text-orange-600" /> 
  },
  { 
    name: 'FastAPI', 
    level: 'Proficient // 83% Benchmark',
    description: 'Building synchronous and asynchronous backend router endpoints backed by automatic Swagger documentation engines.',
    icon: <Workflow className="w-4 h-4 text-teal-400" /> 
  },
  { 
    name: 'AWS', 
    level: 'Proficient // 80% Benchmark',
    description: 'Orchestrating cloud resources, computing buckets, serverless functions, and CDN routing distribution edge caches.',
    icon: <Cpu className="w-4 h-4 text-rose-500" /> 
  },
  { 
    name: 'Tailwind CSS', 
    level: 'Expert // 98% Benchmark',
    description: 'Styling high-fidelity fluid layouts using utility constraints and responsive dark/light color pairs.',
    icon: <Layers className="w-4 h-4 text-cyan-400" /> 
  },
  { 
    name: 'REST APIs', 
    level: 'Expert // 95% Benchmark',
    description: 'Architecting RESTful interfaces with consistent payload specifications, rate-limit bounds, and error envelopes.',
    icon: <Share2 className="w-4 h-4 text-amber-500" /> 
  },
  { 
    name: 'Motion', 
    level: 'Expert // 92% Benchmark',
    description: 'Crafting fluid fluid micro-interactions, layout transitions, exit routes, and physical particle drag dynamics.',
    icon: <Flame className="w-4 h-4 text-purple-400" /> 
  },
];

export default function TechStack() {
  const [activeTech, setActiveTech] = useState<any>(technologies[0]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [sphereRadius, setSphereRadius] = useState(130);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  const requestRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Speed values for rotation tracking
  const speedX = useRef(0.003);
  const speedY = useRef(0.004);
  const targetSpeedX = useRef(0.003);
  const targetSpeedY = useRef(0.004);

  // Responsive radius adjustments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSphereRadius(90);
      } else if (window.innerWidth < 768) {
        setSphereRadius(110);
      } else {
        setSphereRadius(135);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Frame animation loop
  useEffect(() => {
    const animate = () => {
      speedX.current += (targetSpeedX.current - speedX.current) * 0.08;
      speedY.current += (targetSpeedY.current - speedY.current) * 0.08;

      setRotation((prev) => ({
        x: prev.x + speedX.current,
        y: prev.y + speedY.current,
      }));

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Precomputed Fibonacci Sphere distribution mapping
  const initialPositions = useMemo(() => {
    const N = technologies.length;
    return technologies.map((tech, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = 2.399963229728653 * i; // golden angle
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      return { tech, x0: x, y0: y, z0: z };
    });
  }, []);

  // Coordinate rotational projection matrix calculations
  const rotatedPositions = useMemo(() => {
    return initialPositions.map((p) => {
      const { x0, y0, z0 } = p;
      
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const y1 = y0 * cosX - z0 * sinX;
      const z1 = y0 * sinX + z0 * cosX;
      const x1 = x0;

      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const x2 = x1 * cosY - z1 * sinY;
      const z2 = x1 * sinY + z1 * cosY;
      const y2 = y1;

      const visualX = x2 * sphereRadius;
      const visualY = y2 * sphereRadius;
      
      const d = sphereRadius * 1.6;
      const scale = (d + z2 * sphereRadius) / d;
      const opacity = ((z2 + 1) / 2) * 0.75 + 0.25; 
      const zIndex = Math.round((z2 + 1) * 100);

      return {
        tech: p.tech,
        x: visualX,
        y: visualY,
        z: z2,
        scale,
        opacity,
        zIndex,
      };
    });
  }, [rotation, initialPositions, sphereRadius]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    
    targetSpeedX.current = dy * 0.035;
    targetSpeedY.current = -dx * 0.035;
  };

  const handleMouseLeave = () => {
    targetSpeedX.current = 0.003;
    targetSpeedY.current = 0.004;
  };

  const rowLeft = [
    { name: 'React', icon: <Layers className="w-5 h-5 text-amber-500" /> },
    { name: 'Next.js', icon: <Cpu className="w-5 h-5 text-neutral-300" /> },
    { name: 'Node.js', icon: <Terminal className="w-5 h-5 text-emerald-500" /> },
    { name: 'TypeScript', icon: <Code className="w-5 h-5 text-blue-500" /> },
    { name: 'Python', icon: <Code className="w-5 h-5 text-sky-500" /> },
    { name: 'Java', icon: <Terminal className="w-5 h-5 text-red-500" /> },
  ];

  const rowRight = [
    { name: 'MongoDB', icon: <Database className="w-5 h-5 text-emerald-600" /> },
    { name: 'PostgreSQL', icon: <Database className="w-5 h-5 text-indigo-400" /> },
    { name: 'Firebase', icon: <Flame className="w-5 h-5 text-orange-500" /> },
    { name: 'Docker', icon: <Package className="w-5 h-5 text-blue-400" /> },
    { name: 'Git', icon: <GitBranch className="w-5 h-5 text-orange-600" /> },
    { name: 'GitHub', icon: <Github className="w-5 h-5 text-neutral-400" /> },
  ];

  const marqueeRow1 = [...rowLeft, ...rowLeft, ...rowLeft, ...rowLeft];
  const marqueeRow2 = [...rowRight, ...rowRight, ...rowRight, ...rowRight];

  return (
    <section
      id="techstack"
      className="bg-black text-white py-24 overflow-hidden relative border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="text-center md:text-left">
          <span className="font-mono text-xs text-gold-accent uppercase tracking-widest block mb-3">INFRASTRCTURE LANDMAP</span>
          <h2 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter uppercase leading-none">
            INTEGATED <br />
            <span className="text-stroke-white text-white">TECH STACK.</span>
          </h2>
        </div>
      </div>

      {/* Infinite Dual Marquees running in opposite directions */}
      <div className="space-y-6 relative z-10" id="tech-marquee-wrapper">
        <div className="flex w-full overflow-hidden select-none relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex space-x-4 pr-4 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 25,
                ease: 'linear',
              },
            }}
          >
            {marqueeRow1.map((tech, i) => (
              <div
                key={i}
                className="inline-flex items-center space-x-3 bg-neutral-950 border border-neutral-800 px-6 py-4 rounded-2xl cursor-pointer hover:border-gold-accent hover:bg-neutral-900 transition-colors"
              >
                {tech.icon}
                <span className="font-display font-bold uppercase tracking-wider text-sm text-white">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex w-full overflow-hidden select-none relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex space-x-4 pr-4 whitespace-nowrap"
            animate={{ x: [-1000, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 25,
                ease: 'linear',
              },
            }}
          >
            {marqueeRow2.map((tech, i) => (
              <div
                key={i}
                className="inline-flex items-center space-x-3 bg-neutral-950 border border-neutral-800 px-6 py-4 rounded-2xl cursor-pointer hover:border-gold-accent hover:bg-neutral-900 transition-colors"
               >
                {tech.icon}
                <span className="font-display font-bold uppercase tracking-wider text-sm text-white">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Interactive 3D Sphere Tag Matrix & HUD Inspector Below */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="tech-interactive-dial">
        
        {/* Interactive 3D Sphere Canvas Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center py-6 relative select-none">
          <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-4">
            ↔ MOVE MOUSE TO ROTATE / HOVER TO FOCUS ↔
          </div>
          
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center bg-transparent cursor-grab active:cursor-grabbing overflow-visible z-20"
            style={{ perspective: '800px' }}
          >
            {/* Center core target anchor */}
            <div className="absolute w-2 h-2 rounded-full bg-gold-accent/40 blur-[1px]" />
            <div className="absolute w-24 h-24 rounded-full border border-neutral-900/40 pointer-events-none" />
            
            {/* Projecting tags onto the dynamic sphere visual positions */}
            {rotatedPositions.map((p, index) => {
              const isHovered = hoveredTag === p.tech.name;
              const isActive = activeTech.name === p.tech.name;

              return (
                <div
                  key={index}
                  onMouseEnter={() => {
                    setHoveredTag(p.tech.name);
                    setActiveTech(p.tech);
                  }}
                  onMouseLeave={() => setHoveredTag(null)}
                  className="absolute transition-colors duration-200"
                  style={{
                    left: '50%',
                    top: '50%',
                    zIndex: p.zIndex,
                    transform: `translate3d(-50%, -50%, 0) translate3d(${p.x}px, ${p.y}px, 0) scale(${p.scale * (isHovered ? 1.15 : 1)})`,
                    opacity: p.opacity,
                    pointerEvents: p.opacity < 0.3 ? 'none' : 'auto',
                  }}
                >
                  <div
                    className={`px-3 py-1.5 rounded-full border text-[10px] sm:text-xs font-display uppercase tracking-widest font-bold flex items-center space-x-1 px-3.5 py-2 whitespace-nowrap cursor-pointer select-none transition-all duration-300 ${
                      isActive
                        ? 'bg-gold-accent border-gold-accent text-black shadow-[0_8px_20px_rgba(244,178,62,0.35)] scale-105'
                        : isHovered
                        ? 'bg-neutral-800 border-gold-accent/80 text-white'
                        : 'bg-neutral-950/90 border-neutral-800/80 text-neutral-400'
                    }`}
                  >
                    <span>{p.tech.icon}</span>
                    <span>{p.tech.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HUD Inspection Panel Column */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-center" id="tech-interactive-details">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-4xl relative overflow-hidden" id="tech-detail-card">
            {/* Top-right subtle diagnostic grid lines */}
            <div className="absolute top-0 right-0 w-16 h-16 border-b border-l border-neutral-800/30 grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-neutral-800/20" />
              <div className="border-b border-neutral-800/20" />
              <div className="border-r border-neutral-800/20" />
              <div />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="p-3 bg-neutral-950 rounded-2xl block text-gold-accent border border-neutral-850 shadow-md">
                    {activeTech.icon}
                  </span>
                  <div>
                    <span className="font-mono text-[9px] text-gold-accent uppercase tracking-widest font-bold block">ACTIVE CORE NODE</span>
                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-0.5">
                      {activeTech.name}
                    </h3>
                  </div>
                </div>
                
                <div className="border-t border-neutral-800/60 pt-4 space-y-4">
                  <div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1">CAPABILITY BENCHMARK</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-semibold text-gold-accent">{activeTech.level}</span>
                      <div className="flex-1 h-1.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-850">
                        <motion.div 
                          className="h-full bg-gold-accent shadow-[0_0_10px_rgba(244,178,62,0.4)]" 
                          initial={{ width: 0 }}
                          animate={{ width: `${parseInt(activeTech.level.match(/\d+/)?.[0] || '85')}%` }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1.5">OPERATIONAL DESCRIPTION</span>
                    <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed">
                      {activeTech.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-neutral-950 border border-neutral-900 p-4 rounded-2xl shadow-sm hover:border-neutral-800 transition-colors">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Architecture</span>
              <span className="font-display font-black text-xs uppercase text-white tracking-widest">Modular</span>
            </div>
            <div className="bg-neutral-950 border border-neutral-900 p-4 rounded-2xl shadow-sm hover:border-neutral-800 transition-colors">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">State Mgmt</span>
              <span className="font-display font-black text-xs uppercase text-white tracking-widest">Adaptive</span>
            </div>
            <div className="bg-neutral-950 border border-neutral-900 p-4 rounded-2xl shadow-sm hover:border-neutral-800 transition-colors">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Latency</span>
              <span className="font-display font-black text-xs uppercase text-white tracking-widest">Ultra Low</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

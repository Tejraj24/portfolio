import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Download, Sparkles, BookOpen, Layers, Award, Terminal, Briefcase, FileText, Check } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Quick-Pulse highlight keywords
  const pulseKeywords = ['React', 'TypeScript', 'Node.js', 'Python', 'SPE', 'MERN', 'AI', 'MongoDB'];

  // Resume JSON structured data for rendering and searching
  const resumeData = {
    name: 'Tejraj Singh',
    title: 'Full Stack Developer & Software Product Engineer',
    location: 'Jaipur, Rajasthan, India',
    email: 'tejraj487@gmail.com',
    github: 'https://github.com/Tejraj24',
    linkedin: 'https://www.linkedin.com/in/tejraj-singh-a6aaa9219/',
    summary: 'High-achieving Computer Science student specializing in Software Product Engineering. Experienced in building AI-powered architectures, serverless integrations, React frontends, and robust backend microservices. Proven capability in architecting interactive web platforms with elegant motion metrics.',
    
    education: [
      {
        degree: 'B.Tech in Computer Science & Engineering (Software Product Engineering)',
        school: 'JECRC University, Jaipur (Kalvium Undergraduate Program)',
        period: '2023 - Present',
        description: 'Elite real-world product syllabus focusing on full-stack architecture, clean coding standards, algorithms, and prompt engineering daily from day one.'
      }
    ],
    
    experience: [
      {
        role: 'Full Stack Engineering Student & Independent Developer',
        company: 'JECRC / Kalvium SPE Ecosystem',
        period: '2023 - Present',
        highlights: [
          'Designed and maintained highly performant responsive React and Node.js custom components.',
          'Built serverless workflows utilizing secure API endpoints to prevent key exposing.',
          'Pioneered interactive modular applications with optimal performance scores.'
        ]
      }
    ],
    
    projects: [
      {
        name: 'AI Resume Checker',
        url: 'https://ai-resume-checke.netlify.app/',
        github: 'https://github.com/Tejraj24/Ai_Resume_Checker',
        tech: ['React', 'Node.js', 'Vite', 'Serverless Functions', 'Gemini APIs'],
        description: 'An AI-powered document auditor analyzing resumes against specified jobs, producing actionable evaluations and recommendations with secure backend proxies.'
      },
      {
        name: 'Capstone Blogging App (Bloggii)',
        url: 'https://bloggii.netlify.app/',
        github: 'https://github.com/kalviumcommunity/S63_TEJRAJ_CAPSTONE_BLOGGING',
        tech: ['MERN Stack', 'Node.js', 'Express', 'React', 'MongoDB'],
        description: 'Fully featured publishing platform with authenticated authors, real-time draft curation, comment moderation mechanisms, and a smooth UX layout.'
      },
      {
        name: 'Devour Cafe Workspace',
        url: 'https://github.com/Tejraj24',
        tech: ['React', 'Tailwind', 'motion'],
        description: 'Bespoke high-performance retail application featuring espresso visual builders, dynamic custom orders, table configuration reserves, and smooth viewport transitions.'
      }
    ],

    skills: {
      frontend: ['React.js', 'Next.js', 'HTML5', 'CSS3/Sass', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL', 'Socket.io'],
      languages: ['Python', 'JavaScript', 'TypeScript', 'Java'],
      tools: ['Git/GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify', 'Docker']
    }
  };

  const handleDownload = () => {
    // Generate text/markdown download of the CV payload cleanly
    const cvText = `
=========================================
TEJRAJ SINGH - CURRICULUM VITAE
=========================================
Role: ${resumeData.title}
Location: ${resumeData.location}
Email: ${resumeData.email}
GitHub: ${resumeData.github}
LinkedIn: ${resumeData.linkedin}

-----------------------------------------
PROFESSIONAL SUMMARY
-----------------------------------------
${resumeData.summary}

-----------------------------------------
EDUCATION
-----------------------------------------
${resumeData.education.map(edu => `
Degree: ${edu.degree}
School: ${edu.school}
Period: ${edu.period}
Details: ${edu.description}
`).join('\n')}

-----------------------------------------
TECHNICAL SKILLS
-----------------------------------------
Languages: ${resumeData.skills.languages.join(', ')}
Frontend: ${resumeData.skills.frontend.join(', ')}
Backend: ${resumeData.skills.backend.join(', ')}
Tools/Ecosystem: ${resumeData.skills.tools.join(', ')}

-----------------------------------------
KEY PROJECTS
-----------------------------------------
${resumeData.projects.map(p => `
* ${p.name}
  Tech: ${p.tech.join(', ')}
  Repo: ${p.github || 'N/A'}
  Live: ${p.url}
  Description: ${p.description}
`).join('\n')}

-----------------------------------------
EXPERIENCE
-----------------------------------------
${resumeData.experience.map(exp => `
Role: ${exp.role}
Company: ${exp.company}
Period: ${exp.period}
Highlights:
${exp.highlights.map(h => `  - ${h}`).join('\n')}
`).join('\n')}

Generated dynamically via Tejraj's CV Reader HUD.
`;

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Tejraj_Singh_Resume.txt';
    link.click();
    
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Helper component to highlight both search and clicked term
  const HighlightText = ({ text }: { text: string }) => {
    if (!text) return null;
    
    // Find matching positions
    const parts: { str: string; highlight: boolean; pulse: boolean }[] = [];
    
    let workingText = text;
    
    // Simple text chunking matching search query and pulse queries
    const activeTerms = [
      ...(selectedHighlight ? [selectedHighlight] : []),
      ...(searchTerm && searchTerm.length >= 2 ? [searchTerm] : [])
    ].filter(Boolean) as string[];

    if (activeTerms.length === 0) {
      return <span>{text}</span>;
    }

    // Match terms step-by-step
    const regex = new RegExp(`(${activeTerms.map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
    const splitArr = text.split(regex);

    return (
      <>
        {splitArr.map((part, idx) => {
          const isMatch = activeTerms.some(term => term.toLowerCase() === part.toLowerCase());
          const isPulseSelected = selectedHighlight && part.toLowerCase() === selectedHighlight.toLowerCase();
          
          if (isMatch) {
            return (
              <motion.span
                key={idx}
                className={`relative inline-block rounded-xs px-1 ${
                  isPulseSelected 
                    ? 'font-extrabold text-[#f4b23e] bg-gold-accent/25 border-b-2 border-gold-accent shadow-[0_0_15px_rgba(244,178,62,0.3)]'
                    : 'bg-yellow-400/30 text-white dark:bg-yellow-400/20'
                }`}
                animate={isPulseSelected ? {
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9]
                } : {}}
                transition={isPulseSelected ? {
                  repeat: Infinity,
                  duration: 1.8,
                  ease: 'easeInOut'
                } : {}}
              >
                {part}
                {isPulseSelected && (
                  <span className="absolute -inset-0.5 rounded-xs border border-gold-accent/40 animate-ping opacity-60 pointer-events-none" />
                )}
              </motion.span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-neutral-950/80 backdrop-blur-xl overflow-hidden"
          id="cv-hud-overlay"
        >
          {/* Glassmorphic Shell */}
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-5xl h-[88vh] bg-neutral-900/40 dark:bg-black/40 border border-white/10 rounded-[32px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col backdrop-blur-2xl"
            id="cv-hud-panel"
          >
            
            {/* HUD Title Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 md:px-8 border-b border-white/10 shrink-0 gap-4 bg-black/30">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-gold-accent">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-gold-accent border border-gold-accent/30 px-2 py-0.5 rounded">DOCUMENT STATUS: OK</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h3 className="font-display font-black text-xl tracking-tight text-white uppercase mt-0.5">RESUME // CURRICULUM VITAE</h3>
                </div>
              </div>

              {/* Keyword Filters & Search Bar */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Search Inputs */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search term..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48 sm:w-56 font-mono text-xs bg-black/40 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold-accent transition-colors py-2"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white font-mono text-[10px]"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {/* Main Download action */}
                <button
                  onClick={handleDownload}
                  className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    downloadSuccess 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gold-accent hover:bg-white text-black font-extrabold hover:scale-105'
                  }`}
                  title="Download offline document"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>DOWNLOADED!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD CV</span>
                    </>
                  )}
                </button>

                {/* Close window */}
                <button
                  onClick={onClose}
                  className="p-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-white transition-all cursor-pointer"
                  title="Exit HUD"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Interactive Pulse Presets Row */}
            <div className="px-6 md:px-8 py-3 bg-black/20 border-b border-white/10 flex flex-wrap items-center gap-2 shrink-0">
              <span className="font-mono text-[9px] uppercase text-neutral-400 tracking-wider mr-2">Click to Pulse-Highlight terms:</span>
              {pulseKeywords.map((tag) => {
                const isActive = selectedHighlight === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedHighlight(isActive ? null : tag)}
                    className={`font-mono text-[10px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-gold-accent/20 border-gold-accent text-gold-accent shadow-[0_0_10px_rgba(244,178,62,0.25)]' 
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {tag} {isActive && '●'}
                  </button>
                );
              })}
              {selectedHighlight && (
                <button 
                  onClick={() => setSelectedHighlight(null)} 
                  className="font-mono text-[9px] text-neutral-500 underline ml-2 hover:text-white"
                >
                  Clear Pulse
                </button>
              )}
            </div>

            {/* Immersive Inner Content Flow */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar bg-neutral-950/30">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Mini Column (Summary, Details & Skill Badges) */}
                <div className="space-y-6 lg:border-r lg:border-white/10 lg:pr-8">
                  
                  {/* Name Card */}
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gold-accent" />
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">CREATOR PROFILE</span>
                    </div>
                    <h4 className="font-display font-black text-2xl text-white mt-2 leading-none uppercase">{resumeData.name}</h4>
                    <p className="font-sans text-xs text-neutral-450 mt-1">{resumeData.title}</p>
                    <p className="font-sans text-xs text-neutral-400 mt-4 leading-relaxed italic">
                      "<HighlightText text={resumeData.summary} />"
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5 font-mono text-[10px] text-neutral-400">
                      <div>LOC: {resumeData.location}</div>
                      <div>EML: {resumeData.email}</div>
                    </div>
                  </div>

                  {/* Skills lists grouped */}
                  <div className="space-y-4">
                    <h5 className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#f5c269] flex items-center space-x-1">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>TECHNOLOGIES CORE</span>
                    </h5>

                    <div className="space-y-3.5">
                      {Object.entries(resumeData.skills).map(([key, list]) => (
                        <div key={key} className="space-y-1">
                          <span className="font-mono text-[8.5px] uppercase text-neutral-500 tracking-wider block">{key} components:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {list.map((skill) => (
                              <span
                                key={skill}
                                className="font-sans text-[11px] px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-full text-neutral-200"
                              >
                                <HighlightText text={skill} />
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Columns (Education, Experience, Project Cards) */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Education Node */}
                  <div className="space-y-4">
                    <h5 className="font-mono text-[10px] uppercase font-bold tracking-widest text-gold-accent flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>ACADEMIC BACKGROUND</span>
                    </h5>
                    
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2 relative group hover:border-gold-accent/40 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <h6 className="font-display font-extrabold text-sm text-white uppercase"><HighlightText text={edu.degree} /></h6>
                          <span className="font-mono text-[10px] bg-white/10 px-2.5 py-0.5 rounded text-neutral-300">{edu.period}</span>
                        </div>
                        <p className="font-sans text-xs text-gold-accent/85 font-semibold">{edu.school}</p>
                        <p className="font-sans text-xs text-neutral-400 leading-relaxed"><HighlightText text={edu.description} /></p>
                      </div>
                    ))}
                  </div>

                  {/* Experience Node */}
                  <div className="space-y-4">
                    <h5 className="font-mono text-[10px] uppercase font-bold tracking-widest text-gold-accent flex items-center space-x-2">
                      <Briefcase className="w-4 h-4" />
                      <span>EXPERIENCE TRACK</span>
                    </h5>
                    
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <h6 className="font-display font-extrabold text-sm text-white uppercase"><HighlightText text={exp.role} /></h6>
                          <span className="font-mono text-[10px] bg-white/10 px-2.5 py-0.5 rounded text-neutral-300">{exp.period}</span>
                        </div>
                        <p className="font-sans text-xs text-gold-accent/85 font-semibold">{exp.company}</p>
                        <ul className="space-y-2">
                          {exp.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-start space-x-2 font-sans text-xs text-neutral-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent shrink-0 mt-1.5" />
                              <span><HighlightText text={h} /></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Projects Grid Node */}
                  <div className="space-y-4">
                    <h5 className="font-mono text-[10px] uppercase font-bold tracking-widest text-gold-accent flex items-center space-x-2">
                      <Layers className="w-4 h-4" />
                      <span>INTERACTIVE PROJECTS FEATURED</span>
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resumeData.projects.map((project, idx) => (
                        <div key={idx} className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between hover:border-gold-accent/40 transition-colors">
                          <div className="space-y-1.5">
                            <h6 className="font-display font-extrabold text-sm text-white uppercase"><HighlightText text={project.name} /></h6>
                            <p className="font-sans text-xs text-neutral-400 leading-relaxed"><HighlightText text={project.description} /></p>
                          </div>
                          
                          <div className="space-y-3 pt-2">
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map(t => (
                                <span key={t} className="font-mono text-[9px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                                  <HighlightText text={t} />
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center space-x-3 text-[10px] font-mono">
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">
                                LIVE WORK //
                              </a>
                              {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                                  REPO //
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Immersive HUD Status Footer bar */}
            <div className="px-8 py-4.5 border-t border-white/10 bg-black/40 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between text-neutral-500 font-mono text-[9px] uppercase tracking-wider gap-2">
              <div>TEJRAJ SINGH SPE LABS ENGINE v3.2</div>
              <div>© 2026 CHRONO INDEXED PRESETS • ALL CORES RUNNING</div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

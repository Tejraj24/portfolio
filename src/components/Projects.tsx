import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Github, Globe, ArrowUpRight, Code, Cpu, ExternalLink, Star, GitFork, Clock, X, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { useGithubMetrics, getRepoPath, formatRelativeTime } from '../hooks/useGithubMetrics';
import ProjectGallery from './ProjectGallery';

interface ProjectDetailModalProps {
  project: Project | null;
  filteredProjects: Project[];
  onClose: () => void;
  onNavigate: (p: Project) => void;
}

function ProjectDetailModal({ project, filteredProjects, onClose, onNavigate }: ProjectDetailModalProps) {
  const [copied, setCopied] = useState(false);

  const currentIndex = project ? filteredProjects.findIndex(p => p.id === project.id) : -1;
  const totalProjects = filteredProjects.length;

  const handlePrevious = React.useCallback(() => {
    if (currentIndex > 0) onNavigate(filteredProjects[currentIndex - 1]);
    else if (currentIndex === 0 && totalProjects > 0) onNavigate(filteredProjects[totalProjects - 1]);
  }, [currentIndex, filteredProjects, onNavigate, totalProjects]);

  const handleNext = React.useCallback(() => {
    if (currentIndex >= 0 && currentIndex < totalProjects - 1) onNavigate(filteredProjects[currentIndex + 1]);
    else if (currentIndex === totalProjects - 1 && totalProjects > 0) onNavigate(filteredProjects[0]);
  }, [currentIndex, filteredProjects, onNavigate, totalProjects]);

  React.useEffect(() => {
    if (!project) return;
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Key presses listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, handlePrevious, handleNext]);

  const handleShare = async () => {
    if (!project) return;
    try {
      const message = `Check out Tejraj's project: ${project.title} - ${project.liveUrl || project.githubUrl}`;
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  if (!project) return null;

  const repoPath = getRepoPath(project.githubUrl);
  const { metrics, loading } = useGithubMetrics(project.githubUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-lg overflow-y-auto"
      onClick={onClose}
    >
      {/* Tactile Nav Controllers - Desktop */}
      {totalProjects > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:bg-gold-accent hover:text-black hover:scale-110 transition-all duration-300 items-center justify-center shadow-lg"
            title="Previous Project (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:bg-gold-accent hover:text-black hover:scale-110 transition-all duration-300 items-center justify-center shadow-lg"
            title="Next Project (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 180 }}
        className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800/80 rounded-4xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row max-h-[92vh] md:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Progress Tracker & Close Switch */}
        <div className="absolute top-6 right-6 z-40 flex items-center space-x-4">
          {totalProjects > 1 && (
            <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-full shadow-md backdrop-blur-md">
              {currentIndex + 1} OF {totalProjects}
            </span>
          )}
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-neutral-900/90 border border-neutral-800 text-gray-400 hover:text-white hover:bg-black hover:scale-105 hover:rotate-90 transition-all duration-300 flex items-center justify-center interactive-cursor shadow-md backdrop-blur-md"
            title="Dismiss detail dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual asset side with responsive gallery integration */}
        <div className="lg:w-1/2 relative p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-neutral-950 border-b lg:border-b-0 lg:border-r border-neutral-800/80 min-h-[340px] sm:min-h-[420px] lg:h-auto">
          <ProjectGallery 
            projectId={project.id} 
            fallbackImage={project.image} 
            projectTitle={project.title} 
          />
          
          {/* Magazine branding overlap */}
          <div className="absolute bottom-10 right-10 z-20 hidden lg:block pointer-events-none">
            <span className="font-mono text-[9px] uppercase tracking-widest text-gold-accent/70 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
              MERN_COMPLIANT // ARCHITECTURE
            </span>
          </div>

          <span className="absolute top-10 left-10 font-mono text-[10px] font-semibold bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-full text-white tracking-widest border border-white/10 z-20 pointer-events-none">
            YEAR_{project.year}
          </span>
        </div>

        {/* Editorial specifications side */}
        <div className="lg:w-1/2 p-6 md:p-10 lg:p-12 overflow-y-auto flex flex-col justify-between space-y-8 max-h-[50vh] sm:max-h-[45vh] lg:max-h-full scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gold-accent text-xs font-mono">
                {project.category === 'ai' ? <Cpu className="w-3.5 h-3.5 animate-pulse" /> : <Code className="w-3.5 h-3.5" />}
                <span className="uppercase tracking-widest font-semibold">{project.category} // CASE STUDY</span>
              </div>
              <h2 className="font-display font-black text-3.5xl md:text-5xl text-white tracking-tight leading-none pt-1">
                {project.title}
              </h2>
            </div>

            {/* Live stats telemetry snippet */}
            {repoPath && (
              <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl flex flex-wrap gap-y-3 gap-x-6 text-xs font-mono text-gray-400">
                {loading ? (
                  <div className="flex items-center gap-2 animate-pulse text-gray-500">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-accent"></span>
                    </span>
                    <span>Synchronizing repository metrics...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gold-accent fill-gold-accent/25" />
                      <div>
                        <div className="font-bold text-sm text-white">{metrics.stars}</div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Stars</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-neutral-400" />
                      <div>
                        <div className="font-bold text-sm text-white">{metrics.forks}</div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Forks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Clock className="w-4 h-4 text-gold-accent/60" />
                      <div>
                        <div className="font-bold text-[10px] text-white/90 uppercase">{formatRelativeTime(metrics.lastCommitDate)}</div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Last Commit</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-mono text-xs text-gold-accent uppercase tracking-widest font-bold">CASE OVERVIEW</h4>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed font-light">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key architectural highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs text-gold-accent uppercase tracking-widest font-bold">ANALYSIS METADATA</h4>
              <ul className="space-y-2 font-sans text-xs text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-gold-accent font-semibold mt-0.5">•</span>
                  <span><strong>Deployment Stage:</strong> Fully operational system live on global public mirror indices.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-accent font-semibold mt-0.5">•</span>
                  <span><strong>Interface Integrity:</strong> Standard multi-tier safety validations with fluid reactive components.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-accent font-semibold mt-0.5">•</span>
                  <span><strong>Data Handling:</strong> Protected client payload configurations following best security guidelines.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">TECHNOLOGY REGISTER</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="font-mono text-[10px] uppercase text-white bg-neutral-900 border border-neutral-800/80 px-3.5 py-2 rounded-full tracking-wider shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Call to action launch deck */}
          <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row gap-4 items-center">
            
            {/* Tactile Mobile Nav Controllers */}
            {totalProjects > 1 && (
              <div className="flex md:hidden space-x-2 w-full">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                  className="flex-1 flex justify-center py-4 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-gold-accent hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="flex-1 flex justify-center py-4 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-gold-accent hover:text-black transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
             </button>
              </div>
            )}

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 bg-gold-accent text-black font-display font-black uppercase text-xs tracking-widest py-4 px-6 rounded-full hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-lg interactive-cursor text-center"
            >
              <span>Launch Live System</span>
              <Globe className="w-4 h-4" />
            </a>
            
            <div className="flex space-x-2 w-full sm:w-auto justify-center">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white font-mono uppercase tracking-wider h-12 w-12 sm:w-auto sm:px-6 rounded-full border border-neutral-800 hover:border-neutral-700 transition-all duration-300 interactive-cursor"
                title="Examine Source Code"
              >
                <Github className="w-4 h-4 text-gray-400 sm:mr-2" />
                <span className="hidden sm:inline text-xs">Source Code</span>
              </a>
              <button
                onClick={handleShare}
                className={`flex-none inline-flex items-center justify-center h-12 w-12 rounded-full border transition-all duration-300 interactive-cursor ${
                  copied 
                    ? 'bg-green-500/20 border-green-500 text-green-400' 
                    : 'bg-neutral-900 border-neutral-800 hover:border-gold-accent text-gray-400 hover:text-gold-accent hover:bg-black'
                }`}
                title="Share Dossier"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProjectCardContentProps {
  project: Project;
  onOpenDetails: () => void;
}

function ProjectCardContent({ project, onOpenDetails }: ProjectCardContentProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const repoPath = getRepoPath(project.githubUrl);
  const { metrics, loading } = useGithubMetrics(project.githubUrl);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const isLongCard = project.featured;

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenDetails}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative rounded-4xl bg-neutral-950 border border-neutral-800/85 hover:border-gold-accent/40 overflow-hidden w-full h-full flex flex-col transition-colors duration-500 hover:shadow-[0_30px_60px_rgba(244,178,62,0.06)] cursor-pointer"
    >
      
      {/* Visual Card Image Cover - Slightly popped back */}
      <div 
        className="relative w-full aspect-[16/10] overflow-hidden"
        style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-all duration-500 z-10" />
        
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
        />

        <span 
          className="absolute top-6 left-6 font-mono text-xs font-semibold bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white tracking-widest z-20 border border-white/10 transition-transform duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          YEAR_{project.year}
        </span>

        <span 
          className="absolute top-6 right-6 font-mono text-[10px] uppercase font-bold bg-gold-accent text-black px-3 py-1.5 rounded-full tracking-wider z-20 shadow-md transition-transform duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          {project.category}
        </span>
      </div>

      <div 
        className="p-8 flex-grow flex flex-col justify-between space-y-6"
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
      >
        <div className="space-y-3" style={{ transform: "translateZ(25px)" }}>
          <div className="flex items-center space-x-2 text-gold-accent text-xs font-mono">
            {project.category === 'ai' ? <Cpu className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            <span className="uppercase tracking-widest font-semibold">{project.category} // CASE</span>
          </div>
          <h3 className="font-display font-black text-2xl md:text-3.5xl text-white tracking-tight leading-none group-hover:text-gold-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-sans text-sm text-gray-400 leading-relaxed pt-1 font-light">
            {isLongCard ? project.longDescription : project.description}
          </p>
        </div>

        {repoPath && (
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400 select-none border-t border-neutral-900/60 pt-4" style={{ transform: "translateZ(30px)" }}>
            {loading ? (
              <div className="flex items-center gap-2 animate-pulse text-gray-500 text-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-accent"></span>
                </span>
                <span>Syncing repository telemetry...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1 hover:text-gold-accent transition-colors cursor-help" title="GitHub Stars count">
                  <Star className="w-3.5 h-3.5 text-gold-accent fill-gold-accent/20" />
                  <span className="font-bold text-white/95">{metrics.stars}</span>
                  <span className="text-gray-500 text-[9px] uppercase tracking-wider">stars</span>
                </div>
                <div className="flex items-center gap-1 hover:text-white transition-colors cursor-help" title="Repository forks">
                  <GitFork className="w-3.5 h-3.5 text-gray-500" />
                  <span className="font-bold text-white/95">{metrics.forks}</span>
                  <span className="text-gray-500 text-[9px] uppercase tracking-wider">forks</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto text-gray-500" title="Latest activity commit update">
                  <Clock className="w-3 h-3 text-gold-accent/70" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">active {formatRelativeTime(metrics.lastCommitDate)}</span>
                </div>
              </>
            )}
          </div>
        )}

        <div className="space-y-6 pt-4 border-t border-neutral-900" style={{ transform: "translateZ(15px)" }}>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <span key={t} className="font-mono text-[10px] uppercase text-gray-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full hover:bg-neutral-800 hover:text-white transition-colors">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails();
              }}
              className="flex items-center space-x-1 font-mono text-xs text-white group-hover:text-gold-accent uppercase font-bold tracking-wider transition-colors cursor-pointer"
            >
              <span>Analysis report</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <div className="flex space-x-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full border border-neutral-800 hover:border-gold-accent bg-neutral-900 flex items-center justify-center text-gray-400 hover:text-gold-accent hover:bg-black transition-all duration-300 interactive-cursor"
                title="Source code location"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full border border-neutral-800 hover:border-gold-accent bg-neutral-900 flex items-center justify-center text-gray-400 hover:text-gold-accent hover:bg-black transition-all duration-300 interactive-cursor"
                title="Live demonstration"
              >
                <Globe className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

    </motion.div>
  );
}

interface ProjectsProps {
  onExploreProjects?: () => void;
}

export default function Projects({ onExploreProjects }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack' | 'frontend'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = PROJECTS;

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const filterTabs = [
    { label: 'All Projects', id: 'all' },
    { label: 'AI Applications', id: 'ai' },
    { label: 'Full-Stack', id: 'fullstack' },
    { label: 'Frontend', id: 'frontend' },
  ];

  return (
    <section
      id="projects"
      className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute top-8 right-8 font-mono text-[10px] text-white/25 select-none tracking-widest hidden md:block">
        PORTFOLIO CASE GRID // VOLUME III
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-gold-accent uppercase tracking-widest block mb-3">CURATED SELECTIONS</span>
            <h2 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter uppercase leading-tight">
              MAGAZINE <br />
              <span className="text-stroke-white text-white">PORTFOLIO.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-neutral-900/60 border border-neutral-800" id="projects-filter-container">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`relative px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider transition-all duration-300 interactive-cursor ${
                  filter === tab.id
                    ? 'text-black font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white font-medium'
                }`}
                id={`projects-filter-btn-${tab.id}`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-gold-accent rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={filter}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          layout
          id="projects-grid"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isLongCard = project.featured;
              const gridSpan = isLongCard ? "lg:col-span-12 xl:col-span-8" : "lg:col-span-6 xl:col-span-4";

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                  className={`${gridSpan} group relative flex flex-col justify-between`}
                  id={`project-card-${project.id}`}
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <ProjectCardContent project={project} onOpenDetails={() => setSelectedProject(project)} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal 
              project={selectedProject} 
              filteredProjects={filteredProjects}
              onClose={() => setSelectedProject(null)} 
              onNavigate={(p) => setSelectedProject(p)}
            />
          )}
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="font-mono text-xs text-gray-500 mb-4 tracking-wide uppercase">Looking for custom work configurations?</p>
          <button
            onClick={onExploreProjects}
            className="inline-flex items-center space-x-2 border border-border-custom/25 px-8 py-4 rounded-full font-display font-extrabold uppercase text-xs tracking-widest text-gold-accent hover:bg-white hover:text-black hover:border-white transition-all duration-300 interactive-cursor"
            id="projects-cta-github"
          >
            <span>Browse Full Case Book</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

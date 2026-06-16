import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Globe, 
  Search, 
  X, 
  ArrowLeft, 
  Calendar, 
  Folder, 
  Tag, 
  Code, 
  Cpu, 
  Layers, 
  Award,
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS as ALL_GALLERY_PROJECTS } from '../data';
import ProjectGallery from './ProjectGallery';

interface PortfolioPageProps {
  onBackToHome: () => void;
}

export default function PortfolioPage({ onBackToHome }: PortfolioPageProps) {
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack' | 'frontend'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof ALL_GALLERY_PROJECTS[0] | null>(null);

  const filterTabs = [
    { label: 'All Work', id: 'all' },
    { label: 'AI & ML', id: 'ai' },
    { label: 'Full-Stack Eng', id: 'fullstack' },
    { label: 'Frontend', id: 'frontend' },
  ];

  // Perform crisp, instant filter and local searching
  const filteredAndSorted = useMemo(() => {
    return ALL_GALLERY_PROJECTS.filter(project => {
      const matchesCategory = filter === 'all' || project.category === filter;
      const matchesQuery = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 relative overflow-hidden selection:bg-gold-accent selection:text-black">
      {/* Editorial aesthetic grid background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Decorative radial ambient gold spot */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gold-accent/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Breadcrumb back navigation link */}
        <motion.button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-gold-accent font-mono text-xs uppercase tracking-wider mb-8 transition-colors interactive-cursor group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          id="portfolio-back-btn"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Overview</span>
        </motion.button>

        {/* Big Premium Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-gold-accent mb-3">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold">MASTER SHOWCASE</span>
            </div>
            <h1 className="font-display font-black text-5xl md:text-8xl tracking-tighter uppercase leading-none">
              DESIGN &<br />
              <span className="text-stroke-white text-transparent">CODE ARCHIVE.</span>
            </h1>
            <p className="font-sans text-gray-400 text-sm md:text-base max-w-xl leading-relaxed mt-6">
              A comprehensive directory of production applications, machine learning diagnostics, system audio pipelines, and high-performance visualizations crafted by Tejraj.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="font-mono text-xs text-gray-500 text-right hidden lg:block tracking-widest">
              VOL. 26 // COMPANION_INDEX
            </span>
            <div className="flex items-center space-x-4 bg-neutral-900 border border-neutral-800 rounded-full px-5 py-3 w-full lg:w-96 shadow-md focus-within:border-gold-accent transition-all duration-300">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search stack, title, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-gray-500 w-full focus:outline-none font-sans"
                id="portfolio-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Category Toggle Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-900 pb-8 mb-12" id="portfolio-categories-rail">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase font-medium tracking-wider transition-all duration-300 interactive-cursor relative ${
                filter === tab.id
                  ? 'bg-gold-accent text-black font-semibold shadow-md'
                  : 'text-gray-400 bg-neutral-900/40 border border-neutral-800 hover:text-white hover:bg-neutral-900'
              }`}
              id={`portfolio-tab-${tab.id}`}
            >
              {tab.label}
              {filter === tab.id && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-black border-2 border-gold-accent rounded-full animate-bounce" />
              )}
            </button>
          ))}
        </div>

        {/* Work Grid - Dynamic Masonry-like asymmetrical aspect layout */}
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-neutral-800 rounded-4xl bg-neutral-900/25">
            <Folder className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white">No Case Files Located</h3>
            <p className="font-sans text-sm text-gray-500 max-w-sm mx-auto mt-2">
              We couldn't locate any matching pieces with the query "{searchQuery}". Try refining your key terms.
            </p>
            <button 
              onClick={() => { setFilter('all'); setSearchQuery(''); }}
              className="mt-6 px-5 py-2 border border-gold-accent/40 text-gold-accent hover:bg-gold-accent hover:text-black font-mono text-xs uppercase rounded-full transition-all duration-300"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="portfolio-case-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSorted.map((project, idx) => {
                const isExtraFeatured = project.featured;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`group ${isExtraFeatured ? 'md:col-span-2' : 'col-span-1'} flex flex-col`}
                    id={`portfolio-case-${project.id}`}
                  >
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="bg-neutral-900/50 border border-neutral-800/80 rounded-4xl overflow-hidden hover:border-gold-accent/40 transition-all duration-500 flex flex-col h-full cursor-pointer group shadow-lg"
                    >
                      {/* Image container frame */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-all duration-500" />
                        
                        {/* Upper Badges row */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                          <span className="font-mono text-[9px] uppercase font-bold tracking-widest bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-white">
                            RELEASE_{project.year}
                          </span>
                          <span className="font-mono text-[9px] uppercase font-serif font-black tracking-wider bg-gold-accent text-black px-3 py-1.5 rounded-full">
                            {project.category}
                          </span>
                        </div>

                        {/* Hover reveal text prompt */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-xs z-10">
                          <div className="bg-white text-black px-5 py-3 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest flex items-center space-x-2">
                            <span>Open dossier</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="p-8 flex-grow flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-1.5 text-gold-accent font-mono text-[10px] uppercase">
                            <span>{project.category}</span>
                            <span>/</span>
                            <span>Case Study</span>
                          </div>
                          <h3 className="font-display font-black text-2xl tracking-tight leading-none text-white group-hover:text-gold-accent transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="font-sans text-xs text-gray-400 leading-relaxed pt-1 line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-neutral-900 flex flex-wrap gap-1.5">
                          {project.tech.map(t => (
                            <span 
                              key={t}
                              className="font-mono text-[9px] uppercase px-2.5 py-1 bg-neutral-950 border border-neutral-800 text-gray-400 rounded-md"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Expanded Dossier Detailed Panel Modal Slider */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal backdrop background clicking closer */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />

            {/* Sliding detailed panel content bar */}
            <motion.div
              className="bg-neutral-900 border-l border-neutral-800 w-full max-w-3xl h-full flex flex-col justify-between p-8 md:p-12 overflow-y-auto relative z-10 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              id="portfolio-dossier-slidepanel"
            >
              {/* Close Button top row */}
              <div className="flex justify-between items-center pb-6 border-b border-neutral-800 mb-8">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                  CASE DOSSIER // {selectedProject.id.toUpperCase()}
                </span>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer text-gray-400 hover:text-white"
                  title="Close Case Study"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content Info */}
              <div className="space-y-8 flex-grow">
                {/* Large responsive graphic preview gallery */}
                <div className="relative w-full rounded-3xl overflow-hidden bg-neutral-950 p-4 border border-neutral-800/80">
                  <ProjectGallery 
                    projectId={selectedProject.id} 
                    fallbackImage={selectedProject.image} 
                    projectTitle={selectedProject.title} 
                  />
                </div>

                {/* Project Titles & Category tags */}
                <div className="space-y-4">
                  <h2 className="font-display font-black text-4xl text-white tracking-tight leading-none uppercase">
                    {selectedProject.title}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-950/50 border border-neutral-800/60 font-mono text-2xs uppercase">
                    <div>
                      <span className="text-gray-500 block mb-1">Dossier Year</span>
                      <span className="text-white font-bold">{selectedProject.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Your Role</span>
                      <span className="text-gold-accent font-bold">{selectedProject.role || "Lead Architect"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Entity Client</span>
                      <span className="text-white font-bold">{selectedProject.client || "Independent"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Case Type</span>
                      <span className="text-gold-accent font-bold">{selectedProject.category} // APP</span>
                    </div>
                  </div>
                </div>

                {/* Narrated descriptions */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase text-gold-accent tracking-widest font-bold">1. Synopsis & Architecture</h4>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Technical engineering challenges */}
                {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-neutral-800">
                    <h4 className="font-mono text-xs uppercase text-gold-accent tracking-widest font-bold">2. Critical Milestones & Challenges</h4>
                    <ul className="space-y-3">
                      {selectedProject.challenges.map((c, i) => (
                        <li key={i} className="flex items-start text-xs text-gray-400 font-sans leading-relaxed">
                          <span className="font-mono text-gold-accent mr-3 font-semibold">0{i+1}/</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* System outputs & metrics */}
                {selectedProject.outcomes && selectedProject.outcomes.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-neutral-800">
                    <h4 className="font-mono text-xs uppercase text-green-400 tracking-widest font-bold">3. Concrete Outcomes</h4>
                    <ul className="space-y-3">
                      {selectedProject.outcomes.map((o, i) => (
                        <li key={i} className="flex items-start text-xs text-gray-300 font-sans leading-relaxed bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-800">
                          <Award className="w-4 h-4 text-green-400 mr-2.5 shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technical implementations used (Tech Stacks) */}
                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <h4 className="font-mono text-xs uppercase text-gold-accent tracking-widest font-bold">4. Technology Deployment</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span 
                        key={t}
                        className="font-mono text-xs text-white bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-lg font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Backlinks links row */}
              <div className="flex sm:items-center justify-between pt-8 mt-8 border-t border-neutral-800 gap-4 flex-col sm:flex-row">
                <div className="flex space-x-3.5">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 border border-neutral-800 bg-neutral-950 hover:border-gold-accent hover:text-gold-accent px-5 py-3 rounded-full font-mono text-xs transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Repository</span>
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white text-black hover:bg-gold-accent hover:text-black px-5 py-3 rounded-full font-mono text-xs font-bold transition-all duration-300"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Live Showcase</span>
                  </a>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="font-mono text-[10px] uppercase text-gray-500 hover:text-white transition-colors"
                >
                  Return to Archive
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

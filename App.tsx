import React, { useState, useEffect } from 'react';
import { content } from './contentData';
import { BlogPost, AppContent } from './types';

// --- Icons ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const LinkedinIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;

enum ViewState {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  BLOG = 'BLOG',
  BLOG_DETAIL = 'BLOG_DETAIL'
}

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

interface ProjectsViewProps {
  data: AppContent;
}

// Extracted ProjectsView to handle state correctly (prevent reset on App render)
const ProjectsView: React.FC<ProjectsViewProps> = ({ data }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(data.projects.flatMap(p => p.tags))).sort();

  const filteredProjects = selectedTag
    ? data.projects.filter(p => p.tags.includes(selectedTag))
    : data.projects;

  return (
    <div className="pt-32 pb-20 animate-fade-in min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{data.ui.featuredProjectsTitle}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">{data.ui.featuredProjectsSubtitle}</p>
        </div>

        {/* Tags Filter Section */}
        <div className="mb-10 flex flex-wrap gap-2">
            <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    selectedTag === null 
                    ? 'bg-primary-600 border-primary-600 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-500'
                }`}
            >
                All
            </button>
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                        selectedTag === tag
                        ? 'bg-primary-600 border-primary-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-500'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col">
              {/* Image Section */}
              <div className="h-48 overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                  >
                    <span className="text-white font-medium flex items-center gap-2">{data.ui.viewDetails} <ExternalLinkIcon /></span>
                  </a>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                {project.title}
                            </a>
                        ) : project.title}
                    </h3>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 flex-shrink-0 mt-1">
                            <ExternalLinkIcon />
                        </a>
                    )}
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 line-clamp-4">{project.description}</p>
                
                {/* Tags Chips in Card */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <button 
                        key={tag} 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click if any
                            setSelectedTag(tag);
                        }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors border ${
                            selectedTag === tag
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800' 
                            : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                    >
                        #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
             <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400">No projects found with tag <strong>{selectedTag}</strong>.</p>
                <button onClick={() => setSelectedTag(null)} className="mt-2 text-primary-600 hover:underline">Clear filter</button>
             </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Default language English ('en')
  const [language, setLanguage] = useState<Language>('en'); 
  
  // Logic to determine default theme from system preference
  const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };
  
  const [theme, setTheme] = useState<Theme>(getSystemTheme);

  const data: AppContent = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const navigateTo = (newView: ViewState) => {
    setView(newView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBlogPost = (post: BlogPost) => {
    setActivePost(post);
    navigateTo(ViewState.BLOG_DETAIL);
  };

  // --- Layout Components ---

  const Header = () => (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-xl font-bold tracking-tight text-slate-900 dark:text-white cursor-pointer"
          onClick={() => navigateTo(ViewState.HOME)}
        >
          nicolasbarcelo<span className="text-primary-600">.dev</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <button onClick={() => navigateTo(ViewState.HOME)} className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${view === ViewState.HOME ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}>{data.ui.home}</button>
          <button onClick={() => navigateTo(ViewState.PROJECTS)} className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${view === ViewState.PROJECTS ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}>{data.ui.projects}</button>
          <button onClick={() => navigateTo(ViewState.BLOG)} className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${view === ViewState.BLOG || view === ViewState.BLOG_DETAIL ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}>{data.ui.blog}</button>
          
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
          
          {/* Controls */}
          <button onClick={toggleLanguage} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 w-8 text-center">
            {language.toUpperCase()}
          </button>
          <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          
          <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-full hover:bg-slate-800 dark:hover:bg-slate-600 transition-all ml-4">
            {data.ui.contact}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleLanguage} className="text-xs font-bold text-slate-900 dark:text-white border px-2 py-1 rounded border-slate-300 dark:border-slate-700">
               {language.toUpperCase()}
            </button>
            <button onClick={toggleTheme} className="text-slate-900 dark:text-white">
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button className="text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg border-t border-slate-100 dark:border-slate-800 p-4 flex flex-col space-y-4">
           <button onClick={() => navigateTo(ViewState.HOME)} className="text-left font-medium text-slate-700 dark:text-slate-200">{data.ui.home}</button>
           <button onClick={() => navigateTo(ViewState.PROJECTS)} className="text-left font-medium text-slate-700 dark:text-slate-200">{data.ui.projects}</button>
           <button onClick={() => navigateTo(ViewState.BLOG)} className="text-left font-medium text-slate-700 dark:text-slate-200">{data.ui.blog}</button>
           <a href={data.profile.linkedin} className="text-left font-medium text-primary-600 dark:text-primary-400">{data.ui.contact}</a>
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-2">{data.profile.name}</h3>
            <p className="max-w-md text-slate-400 text-sm">
              Empowering enterprises with intelligent automation, Generative AI, and robust software architecture.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href={`mailto:${data.profile.email}`} className="hover:text-white transition-colors"><MailIcon /></a>
            <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><LinkedinIcon /></a>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Nicolás Barceló Lozano. {data.ui.copyright}
        </div>
      </div>
    </footer>
  );

  // --- View Components ---

  const HomeView = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-sm font-semibold tracking-wide border border-primary-100 dark:border-primary-800">
                {data.ui.available}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {data.ui.heroTitlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">{data.ui.heroTitleHighlight}</span>{data.ui.heroTitleSuffix}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                {data.profile.title}. {data.profile.summary.split('.')[0]}.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => navigateTo(ViewState.PROJECTS)} className="px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-primary-500/25">
                  {data.ui.viewProjects}
                </button>
                <a 
                  href="/cv.pdf" 
                  download 
                  className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                >
                  <DownloadIcon /> {data.ui.downloadCv}
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center relative">
               {/* Abstract Background Decoration */}
               <div className="absolute top-0 right-10 w-72 h-72 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
               <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

              {/* Profile Image Wrapper */}
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-white dark:bg-slate-800 shadow-2xl transition-colors duration-300">
                 {/* Replaced Image Source */}
                 <img 
                    src="profile.jpg" 
                    alt={data.profile.name} 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Fallback in case user hasn't uploaded the file yet
                      (e.target as HTMLImageElement).src = "https://picsum.photos/id/64/400/400";
                    }}
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Stats - RESTRUCTURED: Removed Chart, Centered Content */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          {/* Summary Text Centered */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">{data.ui.experienceTitle}</h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {data.profile.summary}
            </p>
          </div>
          
          {/* Stats & Core Skills Container */}
          <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
             {/* Stats Row */}
             <div className="grid md:grid-cols-2 gap-8 mb-12 border-b border-slate-200 dark:border-slate-700/50 pb-12">
                {/* Stat 1 */}
                <div className="flex items-center justify-center gap-5">
                   <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <span className="text-3xl font-bold">25+</span>
                   </div>
                   <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold mb-1">{data.ui.yearsExp}</div>
                      <div className="text-lg font-medium text-slate-900 dark:text-white">Full Stack & Enterprise Architecture</div>
                   </div>
                </div>
                {/* Stat 2 */}
                <div className="flex items-center justify-center gap-5">
                   <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="text-3xl font-bold">AI</span>
                   </div>
                   <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold mb-1">{data.ui.specialist}</div>
                      <div className="text-lg font-medium text-slate-900 dark:text-white">Generative AI & Agentic Workflows</div>
                   </div>
                </div>
             </div>

             {/* Core Competencies (Formerly Chart) */}
             <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{data.ui.technicalProficiency}</h3>
                <div className="flex flex-wrap justify-center gap-3">
                   {data.radarSkills.map((skill) => (
                      <div key={skill.name} className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-lg opacity-20 group-hover:opacity-40 transition duration-200 blur-sm"></div>
                        <span className="relative block px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 font-medium text-sm">
                            {skill.name}
                        </span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">{data.ui.coreTechTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.skillCategories.map((cat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-b dark:border-slate-700 pb-2">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-4xl">
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">{data.ui.journeyTitle}</h2>
           <div className="space-y-12 border-l-2 border-slate-200 dark:border-slate-700 ml-3 pl-8 relative">
              {data.experience.map((job, idx) => (
                <div key={idx} className="relative">
                   <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-slate-900 bg-primary-500"></div>
                   <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</h3>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full border border-primary-100 dark:border-primary-900/50">{job.period}</span>
                   </div>
                   <div className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-1">{job.company}</div>
                   <div className="text-slate-500 dark:text-slate-400 text-sm mb-4">{job.location}</div>
                   <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-400">
                      {job.highlights.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section className="py-20 bg-slate-900 dark:bg-black text-slate-300 transition-colors duration-300">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-2xl font-bold text-white mb-6">{data.ui.educationTitle}</h3>
                  <div className="space-y-6">
                    {data.profile.education.map((edu, i) => (
                      <div key={i}>
                        <div className="text-lg font-semibold text-white">{edu.degree}</div>
                        <div className="text-slate-400">{edu.institution}</div>
                        <div className="text-sm text-slate-500">{edu.period}</div>
                      </div>
                    ))}
                  </div>
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white mb-6">{data.ui.certificationsTitle}</h3>
                  <div className="grid gap-3">
                    {data.profile.certifications.map((cert, i) => (
                       <div key={i} className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span>{cert}</span>
                       </div>
                    ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );

  const BlogView = () => (
    <div className="pt-32 pb-20 animate-fade-in min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{data.ui.blogTitle}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">{data.ui.blogSubtitle}</p>
        </div>

        <div className="space-y-8">
          {data.blog.map(post => (
            <article key={post.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer" onClick={() => openBlogPost(post)}>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{post.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">{tag}</span>
                  ))}
                </div>
                <span className="text-primary-600 dark:text-primary-400 font-medium text-sm flex items-center gap-1">{data.ui.readArticle} <ExternalLinkIcon /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  const BlogPostDetail = () => {
    if (!activePost) return null;
    
    return (
      <div className="pt-32 pb-20 animate-fade-in min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-3xl">
          <button onClick={() => navigateTo(ViewState.BLOG)} className="mb-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {data.ui.backToBlog}
          </button>
          
          <header className="mb-10">
             <div className="flex gap-2 mb-4">
                {activePost.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">{tag}</span>
                ))}
             </div>
             <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">{activePost.title}</h1>
             <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-8">
                <img src="https://picsum.photos/id/64/50/50" alt="Author" className="w-10 h-10 rounded-full" />
                <div>
                   <div className="font-medium text-slate-900 dark:text-white">{data.profile.name}</div>
                   <div className="text-sm">{activePost.date} · {activePost.readTime}</div>
                </div>
             </div>
          </header>

          <div 
            className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400"
            dangerouslySetInnerHTML={{ __html: activePost.content }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary-100 selection:text-primary-900 dark:selection:bg-primary-900 dark:selection:text-white transition-colors duration-300">
      <Header />
      <main>
        {view === ViewState.HOME && <HomeView />}
        {view === ViewState.PROJECTS && <ProjectsView data={data} />}
        {view === ViewState.BLOG && <BlogView />}
        {view === ViewState.BLOG_DETAIL && <BlogPostDetail />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
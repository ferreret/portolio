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
    <div className="pt-28 pb-20 animate-fade-in min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text text-transparent">{data.ui.featuredProjectsTitle}</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">{data.ui.featuredProjectsSubtitle}</p>
        </div>

        {/* Tags Filter Section */}
        <div className="mb-12 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedTag === null
              ? 'bg-gradient-to-r from-primary-600 to-violet-600 text-white shadow-lg shadow-primary-500/25'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md'
              }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedTag === tag
                ? 'bg-gradient-to-r from-primary-600 to-violet-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group card-3d">
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800 flex flex-col h-full">
                {/* Image Section */}
                <div className="h-52 overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-slate-900 font-semibold rounded-lg text-sm hover:bg-white transition-colors"
                      >
                        {data.ui.viewDetails} <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    ) : project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 line-clamp-3 text-sm leading-relaxed">{project.description}</p>

                  {/* Tags Chips in Card */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 ${selectedTag === tag
                          ? 'bg-gradient-to-r from-primary-500 to-violet-500 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400'
                          }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-2">No projects found with tag <strong className="text-primary-600">{selectedTag}</strong>.</p>
            <button onClick={() => setSelectedTag(null)} className="text-primary-600 hover:text-primary-500 font-medium hover:underline transition-colors">Clear filter</button>
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background/Glass Layer - always rendered but fades in/out */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl ${scrolled ? 'opacity-100 shadow-lg shadow-slate-900/5 dark:shadow-primary-500/5 border-b border-slate-200/50 dark:border-slate-800/50' : 'opacity-0'}`}
      />

      <div className="container relative mx-auto px-6 h-[72px] flex justify-between items-center">
        <div
          className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white cursor-pointer group transition-all duration-300 hover:scale-105"
          onClick={() => navigateTo(ViewState.HOME)}
        >
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">nicolasbarcelo</span>
          <span className="bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text text-transparent">.dev</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-1 items-center">
          <button onClick={() => navigateTo(ViewState.HOME)} className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover-underline-slide ${view === ViewState.HOME ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>{data.ui.home}</button>
          <button onClick={() => navigateTo(ViewState.PROJECTS)} className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover-underline-slide ${view === ViewState.PROJECTS ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>{data.ui.projects}</button>
          <button onClick={() => navigateTo(ViewState.BLOG)} className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover-underline-slide ${view === ViewState.BLOG || view === ViewState.BLOG_DETAIL ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>{data.ui.blog}</button>

          <div className="h-6 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent mx-3"></div>

          {/* Controls */}
          <button onClick={toggleLanguage} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
            {language.toUpperCase()}
          </button>
          <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:rotate-12">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="ml-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-violet-600 rounded-full hover:from-primary-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105">
            {data.ui.contact}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleLanguage} className="text-xs font-bold text-slate-900 dark:text-white border px-2.5 py-1.5 rounded-lg border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            {language.toUpperCase()}
          </button>
          <button onClick={toggleTheme} className="text-slate-900 dark:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button className="text-slate-900 dark:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border-t border-slate-200 dark:border-slate-800 p-6 flex flex-col space-y-2 animate-fade-in">
          <button onClick={() => navigateTo(ViewState.HOME)} className={`text-left font-medium p-3 rounded-xl transition-all ${view === ViewState.HOME ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{data.ui.home}</button>
          <button onClick={() => navigateTo(ViewState.PROJECTS)} className={`text-left font-medium p-3 rounded-xl transition-all ${view === ViewState.PROJECTS ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{data.ui.projects}</button>
          <button onClick={() => navigateTo(ViewState.BLOG)} className={`text-left font-medium p-3 rounded-xl transition-all ${view === ViewState.BLOG ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{data.ui.blog}</button>
          <a href={data.profile.linkedin} className="text-center font-semibold p-3 rounded-xl bg-gradient-to-r from-primary-600 to-violet-600 text-white mt-2">{data.ui.contact}</a>
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 dark:from-black dark:via-slate-950 dark:to-slate-900 text-slate-300 py-16 transition-colors duration-300 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-extrabold mb-3">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{data.profile.name}</span>
            </h3>
            <p className="max-w-md text-slate-400 text-sm leading-relaxed">
              Empowering enterprises with intelligent automation, Generative AI, and robust software architecture.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${data.profile.email}`} className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/50 hover:bg-primary-600/20 border border-slate-700/50 hover:border-primary-500/50 transition-all duration-300 hover:scale-110 glow-on-hover">
              <MailIcon />
            </a>
            <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/50 hover:bg-primary-600/20 border border-slate-700/50 hover:border-primary-500/50 transition-all duration-300 hover:scale-110 glow-on-hover">
              <LinkedinIcon />
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800/50 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Nicolás Barceló Lozano. {data.ui.copyright}
          </p>
          <p className="text-xs text-slate-600">
            Crafted with <span className="text-rose-500">♥</span> and React
          </p>
        </div>
      </div>
    </footer>
  );

  // --- View Components ---

  const HomeView = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-6 min-h-screen flex items-center overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/20"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400/40 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-violet-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-primary-300/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 space-y-8">
              {/* Available badge with pulse */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {data.ui.available}
              </div>

              {/* Animated gradient heading */}
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                <span className="text-slate-900 dark:text-white">{data.ui.heroTitlePrefix}</span>
                <span className="bg-gradient-to-r from-primary-500 via-violet-500 to-primary-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift">{data.ui.heroTitleHighlight}</span>
                <span className="text-slate-900 dark:text-white">{data.ui.heroTitleSuffix}</span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                {data.profile.title}. {data.profile.summary.split('.')[0]}.
              </p>

              {/* Enhanced CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigateTo(ViewState.PROJECTS)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-violet-600 hover:from-primary-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105"
                >
                  <span className="relative z-10">{data.ui.viewProjects}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400 to-violet-400 opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
                </button>
                <a
                  href="/cv.pdf"
                  download
                  className="group px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 font-semibold rounded-xl hover:border-primary-300 dark:hover:border-primary-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-3 hover:scale-105"
                >
                  <DownloadIcon /> {data.ui.downloadCv}
                </a>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center relative">
              {/* Enhanced blob decorations */}
              <div className="absolute top-0 right-10 w-80 h-80 bg-gradient-to-br from-primary-300 to-violet-300 dark:from-primary-800 dark:to-violet-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
              <div className="absolute -bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-violet-300 to-rose-300 dark:from-violet-800 dark:to-rose-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-0 w-60 h-60 bg-gradient-to-br from-emerald-300 to-primary-300 dark:from-emerald-800 dark:to-primary-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>

              {/* Profile Image with animated gradient ring */}
              <div className="relative z-10">
                {/* Outer rotating gradient ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary-500 via-violet-500 to-rose-500 opacity-75 blur-sm animate-spin-slow"></div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 via-violet-500 to-rose-500 opacity-50"></div>

                {/* Image container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-1.5 bg-white dark:bg-slate-900 shadow-2xl">
                  <img
                    src="/profile.png"
                    alt={data.profile.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://picsum.photos/id/64/400/400";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce-slow"></div>
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
      <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Wave divider at top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-16" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-slate-900"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{data.ui.coreTechTitle}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Technologies and tools I use to bring ideas to life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skillCategories.map((cat, idx) => {
              const gradients = [
                'from-primary-500 to-violet-500',
                'from-violet-500 to-rose-500',
                'from-emerald-500 to-primary-500',
                'from-amber-500 to-rose-500'
              ];
              const gradient = gradients[idx % gradients.length];

              return (
                <div key={idx} className="group relative">
                  {/* Gradient border effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm`}></div>

                  <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-transparent transition-all duration-300 h-full">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} mb-4`}>
                      <span className="text-white text-lg font-bold">{cat.category.charAt(0)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="relative py-24 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-100/50 dark:bg-primary-900/10 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{data.ui.journeyTitle}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">My professional experience and career milestones</p>
          </div>

          <div className="relative">
            {/* Animated gradient timeline line */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-violet-500 to-rose-500 rounded-full"></div>

            <div className="space-y-12">
              {data.experience.map((job, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot with pulse */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-25"></div>
                      <div className="relative h-4 w-4 rounded-full bg-gradient-to-r from-primary-500 to-violet-500 border-4 border-white dark:border-slate-900 shadow-lg"></div>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="group bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">{job.period}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{job.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{job.role}</h3>
                      <div className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4">{job.company}</div>
                      <ul className="space-y-2">
                        {job.highlights.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 dark:from-black dark:via-slate-950 dark:to-slate-900 text-slate-300 transition-colors duration-300 overflow-hidden">
        {/* Wave divider at top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
          <svg className="relative block w-full h-16" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-slate-900"></path>
          </svg>
        </div>

        {/* Background decorations */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-violet-600/10 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-white">{data.ui.educationTitle}</h3>
              </div>
              <div className="space-y-6">
                {data.profile.education.map((edu, i) => (
                  <div key={i} className="group p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-primary-500/50 transition-all duration-300">
                    <div className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">{edu.degree}</div>
                    <div className="text-slate-400 mt-1">{edu.institution}</div>
                    <div className="text-sm text-slate-500 mt-1">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-primary-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-white">{data.ui.certificationsTitle}</h3>
              </div>
              <div className="grid gap-3">
                {data.profile.certifications.map((cert, i) => (
                  <div key={i} className="group flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-300 group-hover:text-white transition-colors">{cert}</span>
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
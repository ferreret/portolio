import React, { useState, useEffect, useRef, useCallback } from 'react';
import { content } from './contentData';
import { BlogPost, AppContent, ProjectItem } from './types';

// --- Icons ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>;
const LinkedinIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

enum ViewState {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  PROJECT_DETAIL = 'PROJECT_DETAIL',
  BLOG = 'BLOG',
  BLOG_DETAIL = 'BLOG_DETAIL'
}

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

// --- URL routing helpers ---
const VIEW_PATHS: Record<ViewState, string> = {
  [ViewState.HOME]: '/',
  [ViewState.PROJECTS]: '/projects',
  [ViewState.PROJECT_DETAIL]: '/projects/',
  [ViewState.BLOG]: '/blog',
  [ViewState.BLOG_DETAIL]: '/blog/',
};

function viewFromPath(path: string): { view: ViewState; postId?: string; projectId?: string } {
  if (path.startsWith('/blog/') && path.length > 6) {
    return { view: ViewState.BLOG_DETAIL, postId: path.slice(6) };
  }
  if (path.startsWith('/projects/') && path.length > 10) {
    return { view: ViewState.PROJECT_DETAIL, projectId: path.slice(10) };
  }
  if (path === '/projects') return { view: ViewState.PROJECTS };
  if (path === '/blog') return { view: ViewState.BLOG };
  return { view: ViewState.HOME };
}

// --- Scroll reveal hook ---
const useFadeInOnScroll = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.removeAttribute('data-reveal');
          el.classList.add('animate-fade-in-up');
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

// --- Header ---
interface HeaderProps {
  view: ViewState;
  data: AppContent;
  language: Language;
  theme: Theme;
  mobileMenuOpen: boolean;
  onNavigate: (view: ViewState) => void;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onToggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  view, data, language, theme, mobileMenuOpen,
  onNavigate, onToggleLanguage, onToggleTheme, onToggleMobileMenu,
}) => (
  <header className="fixed top-0 left-0 right-0 z-50">
    <div className="absolute inset-0 bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-lg border-b border-warm-200/60 dark:border-warm-800/60" />

    <div className="max-w-6xl relative mx-auto px-6 lg:px-8 h-16 flex justify-between items-center">
      <div
        className="text-lg font-serif font-bold text-warm-900 dark:text-warm-50 cursor-pointer tracking-tight"
        onClick={() => onNavigate(ViewState.HOME)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate(ViewState.HOME)}
      >
        Nicolás Barceló
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
        {[
          { label: data.ui.home, view: ViewState.HOME },
          { label: data.ui.projects, view: ViewState.PROJECTS },
          { label: data.ui.blog, view: ViewState.BLOG },
        ].map(item => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
              view === item.view
                || (item.view === ViewState.BLOG && view === ViewState.BLOG_DETAIL)
                || (item.view === ViewState.PROJECTS && view === ViewState.PROJECT_DETAIL)
                ? 'text-accent-700 dark:text-accent-400'
                : 'text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100'
            }`}
          >
            {item.label}
          </button>
        ))}

        <div className="h-4 w-px bg-warm-300 dark:bg-warm-700 mx-2" aria-hidden="true" />

        <button
          onClick={onToggleLanguage}
          aria-label={`Switch language to ${language === 'en' ? 'Spanish' : 'English'}`}
          className="text-xs font-semibold text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 w-8 h-8 flex items-center justify-center rounded-md hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
        >
          {language.toUpperCase()}
        </button>
        <button
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className="text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 w-8 h-8 flex items-center justify-center rounded-md hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>

        <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-warm-900 dark:bg-warm-100 dark:text-warm-900 rounded-lg hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors">
          {data.ui.contact}
        </a>
      </nav>

      {/* Mobile */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={onToggleLanguage}
          aria-label={`Switch language to ${language === 'en' ? 'Spanish' : 'English'}`}
          className="text-xs font-semibold text-warm-600 dark:text-warm-300 px-2 py-1 rounded border border-warm-300 dark:border-warm-700"
        >
          {language.toUpperCase()}
        </button>
        <button
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className="text-warm-600 dark:text-warm-300 p-1.5"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button
          className="text-warm-600 dark:text-warm-300 p-1.5"
          onClick={onToggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
    </div>

    {mobileMenuOpen && (
      <nav className="md:hidden absolute top-full left-0 right-0 bg-warm-50/95 dark:bg-warm-950/95 backdrop-blur-xl border-b border-warm-200 dark:border-warm-800 p-4 flex flex-col gap-1 animate-fade-in" aria-label="Mobile navigation">
        {[
          { label: data.ui.home, view: ViewState.HOME },
          { label: data.ui.projects, view: ViewState.PROJECTS },
          { label: data.ui.blog, view: ViewState.BLOG },
        ].map(item => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`text-left p-3 rounded-lg text-sm font-medium ${
              view === item.view
                ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400'
                : 'text-warm-700 dark:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800'
            }`}
          >
            {item.label}
          </button>
        ))}
        <a href={data.profile.linkedin} className="text-center p-3 rounded-lg bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 text-sm font-medium mt-1">
          {data.ui.contact}
        </a>
      </nav>
    )}
  </header>
);

// --- Footer ---
interface FooterProps {
  data: AppContent;
  emailCopied: boolean;
  onCopyEmail: () => void;
}

const Footer: React.FC<FooterProps> = ({ data, emailCopied, onCopyEmail }) => (
  <footer className="bg-warm-900 dark:bg-black text-warm-400 py-16">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-warm-50 mb-2">{data.profile.name}</h3>
          <p className="max-w-md text-warm-500 text-sm leading-relaxed">{data.ui.footerTagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={onCopyEmail}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
              aria-label={`Copy email: ${data.profile.email}`}
            >
              <MailIcon />
            </button>
            {emailCopied && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-accent-600 text-white text-xs font-medium rounded whitespace-nowrap" role="status">
                Copied!
              </span>
            )}
          </div>
          <a
            href={data.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
      <div className="border-t border-warm-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-warm-600">
          &copy; {new Date().getFullYear()} {data.profile.name}. {data.ui.copyright}
        </p>
        <p className="text-xs text-warm-700">
          {data.ui.builtWith}
        </p>
      </div>
    </div>
  </footer>
);

// --- Projects View ---
interface ProjectsViewProps {
  data: AppContent;
  onOpenProject: (project: ProjectItem) => void;
}

const UnderConstructionNotice: React.FC<{ title: string; data: AppContent }> = ({ title, data }) => (
  <div className="pt-24 pb-20 animate-fade-in min-h-screen">
    <div className="max-w-2xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 16rem)' }}>
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-4">
          {title}
        </h1>
        <p className="text-lg text-warm-500 dark:text-warm-400 leading-relaxed mb-2">
          {data.ui.underConstruction}
        </p>
        <p className="text-warm-400 dark:text-warm-500">
          {data.ui.underConstructionDesc}
        </p>
      </div>
    </div>
  </div>
);

const ProjectsView: React.FC<ProjectsViewProps> = ({ data, onOpenProject }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(data.projects.flatMap(p => p.tags))).sort();
  const filteredProjects = selectedTag
    ? data.projects.filter(p => p.tags.includes(selectedTag))
    : data.projects;

  const tagButtonClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? 'bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900'
        : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-700'
    }`;

  return (
    <div className="pt-28 pb-20 animate-fade-in min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-3">
            {data.ui.featuredProjectsTitle}
          </h1>
          <p className="text-warm-500 dark:text-warm-400 max-w-2xl mx-auto">
            {data.ui.featuredProjectsSubtitle}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={tagButtonClass(selectedTag === null)}
          >
            {data.ui.allTags}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={tagButtonClass(selectedTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <article
                key={project.id}
                onClick={() => onOpenProject(project)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenProject(project); } }}
                role="link"
                tabIndex={0}
                className="group bg-warm-50 dark:bg-warm-800 rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <div className="h-48 overflow-hidden bg-warm-100 dark:bg-warm-700">
                  <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg font-semibold text-warm-900 dark:text-warm-50 mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-warm-500 dark:text-warm-400 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag === selectedTag ? null : tag);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                          selectedTag === tag
                            ? 'bg-accent-600 text-white'
                            : 'bg-warm-100 dark:bg-warm-700 text-warm-500 dark:text-warm-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-700 dark:hover:text-accent-400'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-warm-500 dark:text-warm-400 mb-4">
              {data.ui.noProjectsFound} <strong className="text-accent-600 dark:text-accent-400">{selectedTag}</strong>
            </p>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-accent-600 dark:text-accent-400 font-medium hover:underline"
            >
              {data.ui.clearFilter}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Home View ---
interface HomeViewProps {
  data: AppContent;
  onNavigate: (view: ViewState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ data, onNavigate }) => {
  const aboutRef = useFadeInOnScroll();
  const skillsRef = useFadeInOnScroll();
  const experienceRef = useFadeInOnScroll();
  const educationRef = useFadeInOnScroll();
  const featuredRef = useFadeInOnScroll();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto lg:px-2">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-3/5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 text-xs font-semibold tracking-wide border border-accent-200 dark:border-accent-800/50">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-soft-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-600"></span>
                </span>
                {data.ui.available}
              </div>

              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-warm-900 dark:text-warm-50">
                {data.ui.heroTitlePrefix}
                <span className="text-accent-600 dark:text-accent-400">{data.ui.heroTitleHighlight}</span>
                {data.ui.heroTitleSuffix}
              </h1>

              <p className="text-lg md:text-xl text-warm-500 dark:text-warm-400 leading-relaxed max-w-xl">
                {data.profile.title}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate(ViewState.PROJECTS)}
                  className="group px-6 py-3 bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900 font-medium rounded-lg hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors flex items-center gap-2"
                >
                  {data.ui.viewProjects}
                  <ArrowRightIcon />
                </button>
                <a
                  href="/cv.pdf"
                  download
                  className="px-6 py-3 text-warm-700 dark:text-warm-200 border border-warm-300 dark:border-warm-700 font-medium rounded-lg hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors flex items-center gap-2"
                >
                  <DownloadIcon /> {data.ui.downloadCv}
                </a>
              </div>
            </div>

            <div className="lg:w-2/5 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-warm-200 dark:border-warm-700 shadow-2xl shadow-warm-900/10 dark:shadow-black/30">
                  <img
                    src="/profile.png"
                    alt={data.profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-accent-200 dark:border-accent-800 -z-10" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Summary */}
      <section ref={aboutRef} data-reveal className="py-20 bg-white dark:bg-warm-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-6">{data.ui.experienceTitle}</h2>
            <p className="text-warm-500 dark:text-warm-400 text-lg leading-relaxed">
              {data.profile.summary}
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6">
            <div className="text-center p-6 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-100 dark:border-warm-700">
              <div className="text-4xl font-serif font-bold text-accent-600 dark:text-accent-400 mb-1">25+</div>
              <div className="text-sm text-warm-500 dark:text-warm-400 uppercase tracking-wider font-medium">{data.ui.yearsExp}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-100 dark:border-warm-700">
              <div className="text-4xl font-serif font-bold text-accent-600 dark:text-accent-400 mb-1">AI</div>
              <div className="text-sm text-warm-500 dark:text-warm-400 uppercase tracking-wider font-medium">{data.ui.specialist}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section ref={skillsRef} data-reveal className="py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">{data.ui.coreTechTitle}</h2>
            <p className="text-warm-500 dark:text-warm-400">{data.ui.skillsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.skillCategories.map((cat, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800 hover:border-accent-300 dark:hover:border-accent-700 transition-colors">
                <h4 className="text-sm font-semibold text-warm-900 dark:text-warm-50 uppercase tracking-wider mb-4">{cat.category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-warm-50 dark:bg-warm-800 text-warm-600 dark:text-warm-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section ref={experienceRef} data-reveal className="py-20 bg-white dark:bg-warm-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">{data.ui.journeyTitle}</h2>
          </div>

          <div className="space-y-0">
            {data.experience.map((job, idx) => (
              <div key={idx} className="relative pl-8 pb-12 last:pb-0 group">
                {idx < data.experience.length - 1 && (
                  <div className="absolute left-[7px] top-3 bottom-0 w-px bg-warm-200 dark:bg-warm-700" aria-hidden="true" />
                )}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-accent-500 bg-warm-50 dark:bg-warm-950 group-hover:bg-accent-500 transition-colors" aria-hidden="true" />

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-sm font-semibold text-accent-600 dark:text-accent-400">{job.period}</span>
                    <span className="text-sm text-warm-400 dark:text-warm-500">{job.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-warm-900 dark:text-warm-50 mb-0.5">{job.role}</h3>
                  <div className="text-warm-500 dark:text-warm-400 font-medium mb-4">{job.company}</div>
                  <ul className="space-y-2">
                    {job.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-warm-600 dark:text-warm-400 text-sm leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-warm-400 dark:bg-warm-600 mt-2 flex-shrink-0" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section ref={educationRef} data-reveal className="py-20 bg-warm-900 dark:bg-black text-warm-300 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h3 className="font-serif text-2xl font-bold text-warm-50 mb-8">{data.ui.educationTitle}</h3>
              <div className="space-y-5">
                {data.profile.education.map((edu, i) => (
                  <div key={i} className="p-5 rounded-xl bg-warm-800/60 border border-warm-700/50 hover:border-accent-600/40 transition-colors">
                    <div className="font-semibold text-warm-50">{edu.degree}</div>
                    <div className="text-warm-400 text-sm mt-1">{edu.institution}</div>
                    <div className="text-warm-500 text-xs mt-1">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-warm-50 mb-8">{data.ui.certificationsTitle}</h3>
              <div className="space-y-3">
                {data.profile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-warm-800/60 border border-warm-700/50 hover:border-accent-600/40 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-accent-600/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-3.5 h-3.5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-warm-300 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={featuredRef} data-reveal className="py-20 bg-white dark:bg-warm-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">{data.ui.featuredProjectsTitle}</h2>
            <p className="text-warm-500 dark:text-warm-400 max-w-2xl mx-auto">{data.ui.featuredProjectsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.projects.slice(0, 3).map(project => (
              <article key={project.id} className="group bg-warm-50 dark:bg-warm-800 rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg flex flex-col">
                <div className="h-48 overflow-hidden bg-warm-100 dark:bg-warm-700">
                  <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg font-semibold text-warm-900 dark:text-warm-50 mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                    ) : project.title}
                  </h3>
                  <p className="text-warm-500 dark:text-warm-400 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-warm-100 dark:bg-warm-700 text-warm-500 dark:text-warm-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate(ViewState.PROJECTS)}
              className="px-6 py-3 bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900 font-medium rounded-lg hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors inline-flex items-center gap-2"
            >
              {data.ui.viewProjects} <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Blog View ---
interface BlogViewProps {
  data: AppContent;
  onOpenPost: (post: BlogPost) => void;
}

const BlogView: React.FC<BlogViewProps> = ({ data, onOpenPost }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(data.blog.flatMap(p => p.tags))).sort();
  const filteredPosts = selectedTag
    ? data.blog.filter(p => p.tags.includes(selectedTag))
    : data.blog;

  const tagButtonClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? 'bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900'
        : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-700'
    }`;

  return (
    <div className="pt-28 pb-20 animate-fade-in min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-3">
            {data.ui.blogTitle}
          </h1>
          <p className="text-warm-500 dark:text-warm-400 max-w-2xl mx-auto">
            {data.ui.blogSubtitle}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={tagButtonClass(selectedTag === null)}
          >
            {data.ui.allTags}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={tagButtonClass(selectedTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => onOpenPost(post)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenPost(post); } }}
                role="link"
                tabIndex={0}
                className="group bg-warm-50 dark:bg-warm-800 rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-warm-400 dark:text-warm-500 mb-3">
                    <time>{post.date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-warm-900 dark:text-warm-50 mb-3 group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-warm-500 dark:text-warm-400 mb-5 flex-1 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag === selectedTag ? null : tag);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                          selectedTag === tag
                            ? 'bg-accent-600 text-white'
                            : 'bg-warm-100 dark:bg-warm-700 text-warm-500 dark:text-warm-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-700 dark:hover:text-accent-400'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-400 mt-auto">
                    {data.ui.readArticle} <ArrowRightIcon />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-warm-500 dark:text-warm-400 mb-4">
              {data.ui.noProjectsFound} <strong className="text-accent-600 dark:text-accent-400">{selectedTag}</strong>
            </p>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-accent-600 dark:text-accent-400 font-medium hover:underline"
            >
              {data.ui.clearFilter}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Blog Post Detail ---
interface ProjectDetailProps {
  project: ProjectItem;
  data: AppContent;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, data, onBack }) => (
  <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300">
    <div className="max-w-3xl mx-auto px-6 lg:px-8">
      <button onClick={onBack} className="mt-8 mb-8 flex items-center gap-2 text-warm-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors text-sm">
        <ArrowLeftIcon />
        {data.ui.backToProjects}
      </button>

      {project.imageUrl && (
        <div className="rounded-xl overflow-hidden border border-warm-200 dark:border-warm-800 mb-10">
          <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold tracking-wider uppercase text-accent-600 dark:text-accent-400">{tag}</span>
          ))}
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-6 leading-tight">{project.title}</h1>
        <p className="text-lg text-warm-500 dark:text-warm-400 leading-relaxed border-b border-warm-100 dark:border-warm-800 pb-8">{project.description}</p>
      </header>

      {project.content && (
        <div
          className="prose prose-stone dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-custom"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      )}
    </div>
  </div>
);

interface BlogPostDetailProps {
  post: BlogPost;
  data: AppContent;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, data, onBack }) => (
  <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300">
    <div className="max-w-3xl mx-auto px-6 lg:px-8">
      <button onClick={onBack} className="mt-8 mb-8 flex items-center gap-2 text-warm-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors text-sm">
        <ArrowLeftIcon />
        {data.ui.backToBlog}
      </button>

      <header className="mb-10">
        <div className="flex gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold tracking-wider uppercase text-accent-600 dark:text-accent-400">{tag}</span>
          ))}
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-warm-400 border-b border-warm-100 dark:border-warm-800 pb-8">
          <img src="/profile.png" alt={data.profile.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-medium text-warm-900 dark:text-warm-50 text-sm">{data.profile.name}</div>
            <div className="text-xs">{post.date} &middot; {post.readTime}</div>
          </div>
        </div>
      </header>

      <div
        className="prose prose-stone dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-custom"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  </div>
);

// --- App ---
const App: React.FC = () => {
  const initialRoute = viewFromPath(window.location.pathname);
  const [view, setView] = useState<ViewState>(initialRoute.view);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const getSystemTheme = (): Theme =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const [theme, setTheme] = useState<Theme>(getSystemTheme);
  const [emailCopied, setEmailCopied] = useState(false);

  const data: AppContent = content[language];

  // Resolve initial blog post or project from URL
  useEffect(() => {
    if (initialRoute.view === ViewState.BLOG_DETAIL && initialRoute.postId) {
      const post = data.blog.find(p => p.id === initialRoute.postId);
      if (post) setActivePost(post);
      else setView(ViewState.BLOG);
    } else if (initialRoute.view === ViewState.PROJECT_DETAIL && initialRoute.projectId) {
      const project = data.projects.find(p => p.id === initialRoute.projectId);
      if (project) setActiveProject(project);
      else setView(ViewState.PROJECTS);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync theme to DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync language to html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Re-resolve active post/project when language changes so detail views update
  useEffect(() => {
    if (activePost) {
      const post = data.blog.find(p => p.id === activePost.id);
      if (post && post !== activePost) setActivePost(post);
    }
    if (activeProject) {
      const project = data.projects.find(p => p.id === activeProject.id);
      if (project && project !== activeProject) setActiveProject(project);
    }
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const route = viewFromPath(window.location.pathname);
      setView(route.view);
      if (route.view === ViewState.BLOG_DETAIL && route.postId) {
        const post = data.blog.find(p => p.id === route.postId);
        setActivePost(post ?? null);
      } else if (route.view === ViewState.PROJECT_DETAIL && route.projectId) {
        const project = data.projects.find(p => p.id === route.projectId);
        setActiveProject(project ?? null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [data.blog, data.projects]);

  const navigateTo = useCallback((newView: ViewState) => {
    setView(newView);
    setMobileMenuOpen(false);
    const path = VIEW_PATHS[newView];
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openBlogPost = useCallback((post: BlogPost) => {
    setActivePost(post);
    setView(ViewState.BLOG_DETAIL);
    setMobileMenuOpen(false);
    window.history.pushState(null, '', `/blog/${post.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openProject = useCallback((project: ProjectItem) => {
    setActiveProject(project);
    setView(ViewState.PROJECT_DETAIL);
    setMobileMenuOpen(false);
    window.history.pushState(null, '', `/projects/${project.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleTheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);
  const toggleLanguage = useCallback(() => setLanguage(prev => prev === 'en' ? 'es' : 'en'), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(data.profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, [data.profile.email]);

  return (
    <div className="min-h-screen bg-warm-50 dark:bg-warm-950 font-sans selection:bg-accent-100 selection:text-accent-900 dark:selection:bg-accent-900/50 dark:selection:text-accent-100 transition-colors duration-300">
      <Header
        view={view}
        data={data}
        language={language}
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        onNavigate={navigateTo}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        onToggleMobileMenu={toggleMobileMenu}
      />
      <main>
        {view === ViewState.HOME && <HomeView data={data} onNavigate={navigateTo} />}
        {view === ViewState.PROJECTS && <ProjectsView data={data} onOpenProject={openProject} />}
        {view === ViewState.PROJECT_DETAIL && activeProject && <ProjectDetail project={activeProject} data={data} onBack={() => navigateTo(ViewState.PROJECTS)} />}
        {view === ViewState.BLOG && <BlogView data={data} onOpenPost={openBlogPost} />}
        {view === ViewState.BLOG_DETAIL && activePost && <BlogPostDetail post={activePost} data={data} onBack={() => navigateTo(ViewState.BLOG)} />}
      </main>
      <Footer data={data} emailCopied={emailCopied} onCopyEmail={copyEmail} />
    </div>
  );
};

export default App;

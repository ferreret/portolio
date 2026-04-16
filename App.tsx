import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { content } from './contentData';
import { AppContent } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { ProjectDetail } from './components/ProjectDetail';
import { BlogView } from './components/BlogView';
import { BlogPostDetail } from './components/BlogPostDetail';
import { ContactSection } from './components/ContactSection';

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

const getSystemTheme = (): Theme =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>(getSystemTheme);
  const [emailCopied, setEmailCopied] = useState(false);

  const data: AppContent = content[language];

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

  // Close mobile menu on route change
  const location = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
      <ScrollToTop />
      <Header
        data={data}
        language={language}
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        onToggleMobileMenu={toggleMobileMenu}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomeView data={data} language={language} />} />
          <Route path="/projects" element={<ProjectsView data={data} />} />
          <Route path="/projects/:id" element={<ProjectDetail data={data} />} />
          <Route path="/blog" element={<BlogView data={data} />} />
          <Route path="/blog/:id" element={<BlogPostDetail data={data} />} />
          <Route path="/contact" element={<ContactSection data={data} />} />
        </Routes>
      </main>
      <Footer data={data} emailCopied={emailCopied} onCopyEmail={copyEmail} />
    </div>
  );
};

export default App;

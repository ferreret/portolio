import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContent } from '@/types';
import { ArrowLeftIcon } from './Icons';

interface ProjectDetailProps {
  data: AppContent;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = data.projects.find(p => p.id === id);

  if (!project) {
    navigate('/projects', { replace: true });
    return null;
  }

  return (
    <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <button onClick={() => navigate('/projects')} className="mt-8 mb-8 flex items-center gap-2 text-warm-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors text-sm">
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
};

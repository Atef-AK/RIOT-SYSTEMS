import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Layers, Tag } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Project } from '../../types';
import { api } from '../../services/apiClient';
import { useLanguage } from '../../context/LanguageContext';

export const FeaturedProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get<Project[]>('/projects', { featured: 'true', limit: 4 });
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        console.warn('Using seeded project state:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-24 bg-slate-950/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-400 uppercase mb-4">
              {language === 'fr' ? 'Réalisations d’Ingénierie Éprouvées' : 'Proven Engineering Deliveries'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.projects.title}
            </h2>
            <p className="text-base text-slate-400">
              {t.projects.subtitle}
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {language === 'fr' ? 'Voir Toutes les Études de Cas' : 'View All Case Studies'}
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const techList =
              typeof project.technologies === 'string'
                ? JSON.parse(project.technologies)
                : project.technologies;

            return (
              <Link key={project.id} to={`/projects/${project.slug}`} className="group flex flex-col">
                <Card hoverEffect className="flex-1 flex flex-col p-0 overflow-hidden bg-slate-900/80 border-slate-800 group-hover:border-accent-cyan/40">
                  {/* Cover Image with gradient overlay */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="cyan" size="sm">
                        {project.category}
                      </Badge>
                    </div>
                    {project.year && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-white/10 font-mono text-xs text-slate-300">
                          {project.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                        {project.summary}
                      </p>
                    </div>

                    <div>
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {Array.isArray(techList) &&
                          techList.slice(0, 4).map((tech: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      {/* CTA link */}
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-accent-cyan transition-colors">
                        <span>{t.projects.viewCaseStudy}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

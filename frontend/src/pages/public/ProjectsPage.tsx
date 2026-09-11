import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Filter, Cpu, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Project } from '../../types';
import { api } from '../../services/apiClient';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get<Project[]>('/projects', { publishedOnly: 'true' });
        if (res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.warn('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = language === 'fr'
    ? ['TOUS', 'Robotics', 'IoT', 'Embedded', 'Automation', 'AI', 'Agriculture', 'Industrial']
    : language === 'es'
    ? ['TODOS', 'Robotics', 'IoT', 'Embedded', 'Automation', 'AI', 'Agriculture', 'Industrial']
    : ['ALL', 'Robotics', 'IoT', 'Embedded', 'Automation', 'AI', 'Agriculture', 'Industrial'];

  const filteredProjects = projects.filter((p) => {
    const isAll = selectedCategory === 'ALL' || selectedCategory === 'TOUS' || selectedCategory === 'TODOS';
    const matchesCat = isAll || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-tech-grid">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan uppercase mb-6">
          <Cpu className="w-3.5 h-3.5" /> {t.projects.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          {t.projects.title} <br />
          <span className="bg-gradient-to-r from-accent-cyan via-sky-300 to-accent-violet bg-clip-text text-transparent">
            {language === 'fr' ? 'Conçus pour l’Industrie' : 'Engineered for Reality'}
          </span>
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.projects.subtitle}
        </p>
      </section>

      {/* Search & Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat || (cat === 'TOUS' && selectedCategory === 'ALL')
                    ? 'bg-accent-cyan text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <Input
              placeholder={language === 'fr' ? 'Rechercher une étude de cas...' : 'Search case studies...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>
      </section>

      {/* Projects List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            {language === 'fr' ? 'Aucun projet trouvé pour ces critères.' : 'No projects found matching the criteria.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const techList =
                typeof project.technologies === 'string'
                  ? JSON.parse(project.technologies)
                  : project.technologies;

              return (
                <Link key={project.id} to={`/projects/${project.slug}`} className="group flex flex-col">
                  <Card hoverEffect className="flex-1 flex flex-col p-0 overflow-hidden bg-slate-900/85 border-slate-800 group-hover:border-accent-cyan/40">
                    <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="cyan" size="sm">
                          {project.category}
                        </Badge>
                      </div>
                      {project.year && (
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-0.5 rounded bg-slate-950/80 border border-white/10 font-mono text-[11px] text-slate-300">
                            {project.year}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors mb-2">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                          {project.summary}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {Array.isArray(techList) &&
                            techList.slice(0, 3).map((t: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700"
                              >
                                {t}
                              </span>
                            ))}
                        </div>

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
        )}
      </section>
    </div>
  );
};

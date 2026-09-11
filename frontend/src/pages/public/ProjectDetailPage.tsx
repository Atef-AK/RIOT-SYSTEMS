import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Calendar, Building, Layers, ShieldCheck, Tag } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { Project } from '../../types';
import { api } from '../../services/apiClient';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!slug) return;
        const res = await api.get<Project>(`/projects/${slug}`);
        if (res.data) {
          setProject(res.data);
        }
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" label="Loading Technical Case Study..." />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Case Study Not Found</h2>
        <p className="text-slate-400 mb-6">The requested engineering project could not be found.</p>
        <Link to="/projects">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const techList =
    typeof project.technologies === 'string'
      ? JSON.parse(project.technologies)
      : project.technologies;

  return (
    <div className="pt-28 pb-24 bg-tech-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-slate-400 hover:text-accent-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
        </Link>

        {/* Title Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="cyan" size="md">
              {project.category}
            </Badge>
            {project.year && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-accent-cyan" /> {project.year}
              </span>
            )}
            {project.clientIndustry && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                <Building className="w-3.5 h-3.5 text-accent-green" /> {project.clientIndustry}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-4xl">
            {project.summary}
          </p>
        </div>

        {/* Cover Hero Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 mb-16 shadow-2xl bg-slate-950 max-h-[500px]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center max-h-[500px]"
          />
        </div>

        {/* Technical Deep Dive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Content (Challenge, Solution, Results) */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Challenge */}
            {project.challenge && (
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-400 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  The Engineering Challenge
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Problem Context & Constraints</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl">
                  {project.challenge}
                </p>
              </div>
            )}

            {/* The Solution & Architecture */}
            {project.solution && (
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-accent-cyan mb-3">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                  System Architecture & Solution
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Multi-Disciplinary Implementation</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Quantified Results */}
            {project.results && (
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-accent-green mb-3">
                  <span className="w-2 h-2 rounded-full bg-accent-green" />
                  Performance & Validation Results
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Field Outcomes</h3>
                <div className="bg-slate-900/90 border border-accent-green/30 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent-green flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {project.results}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs & Tech */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 bg-slate-900/90 border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent-cyan" /> Tech Stack & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {Array.isArray(techList) &&
                  techList.map((t: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-mono text-slate-200 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>DOMAIN:</span>
                  <span className="text-white font-bold">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>DELIVERY:</span>
                  <span className="text-accent-green font-bold">TURNKEY DEPLOYED</span>
                </div>
                <div className="flex justify-between">
                  <span>IP OWNERSHIP:</span>
                  <span className="text-white font-bold">100% CLIENT</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border-accent-cyan/30 text-center">
              <h4 className="text-base font-bold text-white mb-2">Need a Similar Solution?</h4>
              <p className="text-xs text-slate-400 mb-6">
                Our architects can evaluate your technical specs and deliver a proposal within 24 hours.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="sm" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Discuss With Engineers
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

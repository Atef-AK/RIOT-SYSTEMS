import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Cpu,
  Inbox,
  Image,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { DashboardStats } from '../../types';
import { api } from '../../services/apiClient';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get<DashboardStats>('/stats/dashboard');
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Spinner size="lg" label="Loading system dashboard..." className="py-20" />;
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">R-IoTSys Command Center</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            System status: Operational &bull; Nginx & PostgreSQL Online
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/projects">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Case Study
            </Button>
          </Link>
          <Link to="/admin/services">
            <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Service
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Case Studies"
          value={stats?.totalProjects || 0}
          change={`${stats?.publishedProjects || 0} published`}
          icon={<FolderKanban className="w-6 h-6" />}
          variant="cyan"
        />
        <StatCard
          title="Engineering Services"
          value={stats?.totalServices || 0}
          change="8 core disciplines"
          icon={<Cpu className="w-6 h-6" />}
          variant="blue"
        />
        <StatCard
          title="Client Messages"
          value={stats?.totalMessages || 0}
          change={`${stats?.unreadMessages || 0} new unread`}
          isPositive={false}
          icon={<Inbox className="w-6 h-6" />}
          variant="purple"
        />
        <StatCard
          title="Media Library"
          value={stats?.totalMedia || 0}
          change="Files & diagrams"
          icon={<Image className="w-6 h-6" />}
          variant="green"
        />
      </div>

      {/* 2-Column Section: Recent Inquiries + Projects Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-8">
          <Card className="p-6 bg-slate-900/90 border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Recent Client Inquiries</h3>
                <p className="text-xs text-slate-400">Incoming RFQs from website contact form</p>
              </div>
              <Link to="/admin/messages">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  View All Inbox
                </Button>
              </Link>
            </div>

            {stats?.recentMessages && stats.recentMessages.length > 0 ? (
              <div className="divide-y divide-slate-800">
                {stats.recentMessages.map((msg) => (
                  <div key={msg.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-accent-cyan flex items-center justify-center font-bold text-xs flex-shrink-0 font-mono">
                        {msg.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">{msg.name}</span>
                          {msg.company && (
                            <span className="text-[11px] text-slate-400 truncate">({msg.company})</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate font-mono">
                          {msg.projectType} &bull; {msg.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge
                        variant={
                          msg.status === 'NEW'
                            ? 'rose'
                            : msg.status === 'IN_PROGRESS'
                            ? 'amber'
                            : 'slate'
                        }
                        size="sm"
                      >
                        {msg.status}
                      </Badge>
                      <Link to="/admin/messages" className="text-xs text-accent-cyan hover:underline">
                        Open &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No messages received yet.</p>
            )}
          </Card>
        </div>

        {/* Project Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 bg-slate-900/90 border-slate-800">
            <h3 className="text-base font-bold text-white mb-4">Projects by Category</h3>
            <div className="space-y-3 font-mono text-xs">
              {stats?.projectsByCategory && stats.projectsByCategory.length > 0 ? (
                stats.projectsByCategory.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">{cat.category}</span>
                    <span className="px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan font-bold">
                      {cat.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No project categories logged yet.</p>
              )}
            </div>
          </Card>

          {/* Quick CMS links */}
          <Card className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">Quick CMS Actions</h4>
            <Link
              to="/admin/sections"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-slate-800"
            >
              <span>Edit Homepage Sections & Hero</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-slate-800"
            >
              <span>Update Site SEO & Contacts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

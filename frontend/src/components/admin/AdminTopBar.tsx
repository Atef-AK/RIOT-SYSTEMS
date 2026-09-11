import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface AdminTopBarProps {
  title?: string;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ title }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    if (title) return title;
    const path = location.pathname;
    if (path === '/admin') return 'System Dashboard';
    if (path === '/admin/services') return 'Services Management';
    if (path === '/admin/projects') return 'Projects & Case Studies';
    if (path === '/admin/messages') return 'Contact Inquiries & Messages';
    if (path === '/admin/sections') return 'Homepage CMS Sections';
    if (path === '/admin/settings') return 'Site Settings';
    if (path === '/admin/media') return 'Media Library';
    if (path === '/admin/testimonials') return 'Client Testimonials';
    if (path === '/admin/team') return 'Engineering Team';
    if (path === '/admin/users') return 'Admin Users & Roles';
    if (path === '/admin/navigation') return 'Navigation Manager';
    if (path === '/admin/activities') return 'Audit Activity Log';
    return 'Admin Management';
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-base font-bold text-white tracking-tight">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <Shield className="w-3.5 h-3.5 text-accent-green" />
          <span>Role: {user?.role || 'ADMIN'}</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan flex items-center justify-center font-bold text-xs">
          {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
        </div>
      </div>
    </header>
  );
};

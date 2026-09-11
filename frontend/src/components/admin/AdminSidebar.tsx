import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  FolderKanban,
  Inbox,
  Layers,
  Settings,
  Image,
  MessageSquareQuote,
  Users,
  UserCheck,
  Navigation,
  History,
  LogOut,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export interface AdminSidebarProps {
  unreadMessagesCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ unreadMessagesCount = 0 }) => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navGroups = [
    {
      title: 'Main',
      items: [
        { label: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Content & CMS',
      items: [
        { label: 'Services', path: '/admin/services', icon: <Cpu className="w-4 h-4" /> },
        { label: 'Projects', path: '/admin/projects', icon: <FolderKanban className="w-4 h-4" /> },
        {
          label: 'Messages',
          path: '/admin/messages',
          icon: <Inbox className="w-4 h-4" />,
          badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
        },
        { label: 'Homepage CMS', path: '/admin/sections', icon: <Layers className="w-4 h-4" /> },
        { label: 'Media Library', path: '/admin/media', icon: <Image className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Marketing & Brand',
      items: [
        { label: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
        { label: 'Team', path: '/admin/team', icon: <Users className="w-4 h-4" /> },
        { label: 'Navigation', path: '/admin/navigation', icon: <Navigation className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Administration',
      items: [
        { label: 'Site Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
        ...(hasRole(['SUPER_ADMIN'])
          ? [
              { label: 'Admin Users', path: '/admin/users', icon: <UserCheck className="w-4 h-4" /> },
              { label: 'Activity Log', path: '/admin/activities', icon: <History className="w-4 h-4" /> },
            ]
          : []),
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-accent-cyan" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white tracking-tight">R-IOTSYS CMS</span>
              <span className="text-[10px] font-mono text-accent-cyan">ADMIN PORTAL</span>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="p-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-2">
                {group.title}
              </span>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all select-none',
                        isActive
                          ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      )
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Info & Bottom Actions */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-accent-cyan hover:bg-slate-900 transition-all"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            <span>View Live Website</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center justify-between pt-2 border-t border-slate-900 px-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white truncate max-w-[130px]">{user?.name}</span>
            <span className="text-[10px] font-mono text-slate-500 uppercase">{user?.role}</span>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

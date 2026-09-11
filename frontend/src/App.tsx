import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { ContactPage } from './pages/public/ContactPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Layout & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminSectionsPage } from './pages/admin/AdminSectionsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminTeamPage } from './pages/admin/AdminTeamPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminNavigationPage } from './pages/admin/AdminNavigationPage';
import { AdminActivityLogPage } from './pages/admin/AdminActivityLogPage';

// Public Layout Wrapper
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-accent-cyan selection:text-slate-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Protected Dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="messages" element={<AdminMessagesPage />} />
        <Route path="sections" element={<AdminSectionsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="media" element={<AdminMediaPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="team" element={<AdminTeamPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="navigation" element={<AdminNavigationPage />} />
        <Route path="activities" element={<AdminActivityLogPage />} />
      </Route>

      {/* 404 Catch-All */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;

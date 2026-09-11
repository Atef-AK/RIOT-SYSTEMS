import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex items-center justify-center px-4 bg-tech-grid text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-6">
          <Terminal className="w-8 h-8" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-rose-400 font-bold mb-2 block">
          ERROR 404 // NODE NOT FOUND
        </span>
        <h1 className="text-3xl font-extrabold text-white mb-3">Resource Offline</h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The requested route or machine address does not exist on this network gateway.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Return to Home
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="secondary">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

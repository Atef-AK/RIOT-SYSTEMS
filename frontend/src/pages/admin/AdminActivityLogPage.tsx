import React, { useEffect, useState } from 'react';
import { History, Shield, RefreshCw } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { ActivityLog } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminActivityLogPage: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { error } = useToast();

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get<ActivityLog[]>('/stats/activities', { limit: 50 });
      if (res.data) setLogs(res.data);
    } catch (err: any) {
      error('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Security & Audit Activity Log</h2>
          <p className="text-xs text-slate-400">Complete historical record of admin modifications, logins, and CMS updates</p>
        </div>
        <Button variant="secondary" size="sm" onClick={fetchLogs} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Refresh Log
        </Button>
      </div>

      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading audit logs..." className="py-16" />
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No activity logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-white font-bold">{log.userName}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="cyan" size="sm">
                        {log.action}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{log.entity}</td>
                    <td className="py-3.5 px-4 text-slate-500">{log.ipAddress || 'Internal'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

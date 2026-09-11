import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Shield, UserCheck, ShieldAlert } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { User, Role, UserStatus } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { user: currentUser } = useAuth();
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('ADMIN');
  const [status, setStatus] = useState<UserStatus>('ACTIVE');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get<User[]>('/users');
      if (res.data) setUsers(res.data);
    } catch (err: any) {
      error('Failed to load admin users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreate = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('ADMIN');
    setStatus('ACTIVE');
    setIsModalOpen(true);
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setName(u.name);
    setEmail(u.email);
    setPassword('');
    setRole(u.role);
    setStatus(u.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      error('Name and Email are required');
      return;
    }
    if (!editingUser && !password) {
      error('Password is required for new users');
      return;
    }

    setSaving(true);
    try {
      const payload: any = { name, email, role, status };
      if (password) payload.password = password;

      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, payload);
        success('User account updated');
      } else {
        await api.post('/users', payload);
        success('Admin user created successfully');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      error(err.message || 'Failed to save user');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/users/${deleteId}`);
      success('User deleted');
      setDeleteId(null);
      fetchUsers();
    } catch (err: any) {
      error(err.message || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Admin Users & Access Control</h2>
          <p className="text-xs text-slate-400">Manage administrators, engineering editors, and access privileges</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
          Create New Admin
        </Button>
      </div>

      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading users..." className="py-16" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {u.name} {currentUser?.id === u.id && <span className="text-[10px] text-accent-cyan">(You)</span>}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={u.role === 'SUPER_ADMIN' ? 'violet' : 'cyan'} size="sm">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-mono text-xs ${u.status === 'ACTIVE' ? 'text-accent-green' : 'text-slate-500'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {currentUser?.id !== u.id && (
                        <button onClick={() => setDeleteId(u.id)} className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingUser ? 'Edit User' : 'Create Admin'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Full Name *" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            label={editingUser ? 'New Password (leave blank to keep current)' : 'Password *'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            required={!editingUser}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              options={[
                { label: 'Super Admin (Full Access)', value: 'SUPER_ADMIN' },
                { label: 'Admin (Content + Messages)', value: 'ADMIN' },
                { label: 'Editor (Content Only)', value: 'EDITOR' },
              ]}
            />
            <Select
              label="Account Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as UserStatus)}
              options={[
                { label: 'Active', value: 'ACTIVE' },
                { label: 'Inactive / Suspended', value: 'INACTIVE' },
              ]}
            />
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={saving}>Save User</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to permanently delete this admin account?"
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Linkedin, Github } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Switch } from '../../components/ui/Switch';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { TeamMember } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminTeamPage: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState(0);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await api.get<TeamMember[]>('/team', { publishedOnly: 'false' });
      if (res.data) setTeam(res.data);
    } catch (err: any) {
      error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setName('');
    setRole('');
    setBio('');
    setPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
    setLinkedin('');
    setGithub('');
    setSkillsText('Robotics, STM32, RTOS, Altium');
    setIsPublished(true);
    setOrder(team.length + 1);
    setIsModalOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setName(m.name);
    setRole(m.role);
    setBio(m.bio || '');
    setPhoto(m.photo || '');
    setLinkedin(m.linkedin || '');
    setGithub(m.github || '');

    const sk = typeof m.skills === 'string' ? JSON.parse(m.skills) : m.skills;
    setSkillsText(Array.isArray(sk) ? sk.join(', ') : '');

    setIsPublished(m.isPublished);
    setOrder(m.order);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) {
      error('Name and Role are required');
      return;
    }
    setSaving(true);
    try {
      const skillsArray = skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name,
        role,
        bio,
        photo,
        linkedin,
        github,
        skills: skillsArray,
        isPublished,
        order: Number(order),
      };

      if (editing) {
        await api.put(`/team/${editing.id}`, payload);
        success('Team member updated');
      } else {
        await api.post('/team', payload);
        success('Team member added');
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (err: any) {
      error(err.message || 'Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/team/${deleteId}`);
      success('Team member deleted');
      setDeleteId(null);
      fetchTeam();
    } catch (err: any) {
      error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Engineering Team</h2>
          <p className="text-xs text-slate-400">Manage leadership, hardware architects, and firmware leads</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
          Add Team Member
        </Button>
      </div>

      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading team..." className="py-16" />
        ) : team.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No team members published yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Role / Title</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {team.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{m.name}</div>
                    </td>
                    <td className="py-3.5 px-4 text-accent-cyan font-mono">{m.role}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{m.order}</td>
                    <td className="py-3.5 px-4">
                      {m.isPublished ? (
                        <span className="text-accent-green font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEdit(m)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(m.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Edit Member' : 'Add Member'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name *" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Role / Engineering Title *" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>
          <Textarea label="Biography" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="LinkedIn Profile URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            <Input label="GitHub Profile URL" value={github} onChange={(e) => setGithub(e.target.value)} />
          </div>
          <Input label="Skills / Specialties (comma separated)" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
          <Switch checked={isPublished} onChange={setIsPublished} label="Publish Member Profile" />
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={saving}>
              Save Member
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Team Member"
        message="Are you sure you want to remove this team member?"
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, Star, Image as ImageIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { Project } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { success, error } = useToast();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Robotics');
  const [summary, setSummary] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientIndustry, setClientIndustry] = useState('');
  const [year, setYear] = useState('2026');
  const [coverImage, setCoverImage] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [order, setOrder] = useState(0);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get<Project[]>('/projects', { publishedOnly: 'false' });
      if (res.data) {
        setProjects(res.data);
      }
    } catch (err: any) {
      error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Robotics');
    setSummary('');
    setChallenge('');
    setSolution('');
    setResults('');
    setClientName('');
    setClientIndustry('');
    setYear(new Date().getFullYear().toString());
    setCoverImage('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80');
    setTechnologiesText('ROS2, C++, STM32, CAN Bus');
    setFeatured(false);
    setPublished(true);
    setOrder(projects.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setCategory(p.category);
    setSummary(p.summary);
    setChallenge(p.challenge || '');
    setSolution(p.solution || '');
    setResults(p.results || '');
    setClientName(p.clientName || '');
    setClientIndustry(p.clientIndustry || '');
    setYear(p.year || '2026');
    setCoverImage(p.coverImage);

    const techArr = typeof p.technologies === 'string' ? JSON.parse(p.technologies) : p.technologies;
    setTechnologiesText(Array.isArray(techArr) ? techArr.join(', ') : '');

    setFeatured(p.featured);
    setPublished(p.published);
    setOrder(p.order);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !coverImage) {
      error('Please fill in required fields (Title, Summary, Cover Image)');
      return;
    }

    setSaving(true);
    try {
      const technologiesArray = technologiesText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title,
        category,
        summary,
        challenge,
        solution,
        results,
        clientName,
        clientIndustry,
        year,
        coverImage,
        technologies: technologiesArray,
        featured,
        published,
        order: Number(order),
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, payload);
        success('Case study updated successfully');
      } else {
        await api.post('/projects', payload);
        success('Case study created successfully');
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      error(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await api.delete(`/projects/${deleteConfirmId}`);
      success('Project deleted successfully');
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (err: any) {
      error(err.message || 'Failed to delete project');
    }
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Engineering Case Studies</h2>
          <p className="text-xs text-slate-400">Manage technical portfolio case studies, solutions and specs</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Case Study
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 bg-slate-900/80 border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-72">
            <Input
              placeholder="Search case studies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <span className="text-xs font-mono text-slate-400">
            Total: {filtered.length} project(s)
          </span>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading case studies..." className="py-16" />
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No case studies found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.coverImage}
                          alt=""
                          className="w-10 h-8 rounded-md object-cover border border-slate-700 flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white">{p.title}</div>
                          <div className="text-[11px] font-mono text-slate-400">{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="cyan" size="sm">{p.category}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{p.year || '-'}</td>
                    <td className="py-3.5 px-4">
                      {p.featured ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.published ? (
                        <span className="inline-flex items-center gap-1 text-accent-green font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <XCircle className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete"
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

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Technical Case Study' : 'Create New Technical Case Study'}
        size="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Project Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Autonomous Mobile Robot for Industrial Logistics"
                required
              />
            </div>
            <Select
              label="Domain Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { label: 'Robotics', value: 'Robotics' },
                { label: 'IoT', value: 'IoT' },
                { label: 'Embedded Systems', value: 'Embedded' },
                { label: 'Industrial Automation', value: 'Automation' },
                { label: 'AI & Vision', value: 'AI' },
                { label: 'Agriculture Tech', value: 'Agriculture' },
                { label: 'Energy / Microgrid', value: 'Industrial' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Client Industry"
              value={clientIndustry}
              onChange={(e) => setClientIndustry(e.target.value)}
              placeholder="e.g. Automotive Manufacturing"
            />
            <Input
              label="Delivery Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2026"
            />
            <Input
              label="Display Order"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>

          <Input
            label="Cover Image URL *"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://images.unsplash.com/... or /uploads/..."
            required
          />

          <Textarea
            label="High-Level Summary (Card & Overview) *"
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary of the engineered system, core purpose, and high-level architecture..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Textarea
              label="The Engineering Challenge"
              rows={3}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="What operational constraints, environment, and problems needed to be solved?"
            />
            <Textarea
              label="The Solution & System Architecture"
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="How did R-IoTSys design the hardware, electronics, firmware, and cloud system?"
            />
          </div>

          <Textarea
            label="Quantified Results & Field Validation"
            rows={2}
            value={results}
            onChange={(e) => setResults(e.target.value)}
            placeholder="e.g. Reduced manual handling by 42%, 0 collision safety incidents over 3,000+ hours."
          />

          <Input
            label="Key Technologies / Fieldbus Interfaces (comma-separated)"
            value={technologiesText}
            onChange={(e) => setTechnologiesText(e.target.value)}
            placeholder="ROS2, NVIDIA Jetson, LiDAR SLAM, STM32, CAN Bus"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Switch
              checked={featured}
              onChange={setFeatured}
              label="Feature on Homepage"
              description="Display this case study in the primary homepage showcase"
            />
            <Switch
              checked={published}
              onChange={setPublished}
              label="Publish to Website"
              description="Make this case study visible to public visitors"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={saving}>
              {editingProject ? 'Save Changes' : 'Create Case Study'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Project Case Study"
        message="Are you sure you want to permanently delete this case study? This action cannot be undone."
      />
    </div>
  );
};

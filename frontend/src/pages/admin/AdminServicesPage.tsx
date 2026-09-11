import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search } from 'lucide-react';
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
import { Service } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { success, error } = useToast();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Robotics');
  const [icon, setIcon] = useState('Bot');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState(0);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get<Service[]>('/services', { publishedOnly: 'false' });
      if (res.data) {
        setServices(res.data);
      }
    } catch (err: any) {
      error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle('');
    setCategory('Robotics');
    setIcon('Bot');
    setShortDesc('');
    setFullDesc('');
    setFeaturesText('Kinematic Modeling\nCustom Motor Control\nROS2 Navigation');
    setTechnologiesText('ROS2, C++, STM32, CANopen');
    setIsPublished(true);
    setOrder(services.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setTitle(s.title);
    setCategory(s.category);
    setIcon(s.icon || 'Cpu');
    setShortDesc(s.shortDesc);
    setFullDesc(s.fullDesc);

    const featArr = typeof s.features === 'string' ? JSON.parse(s.features) : s.features;
    setFeaturesText(Array.isArray(featArr) ? featArr.join('\n') : '');

    const techArr = typeof s.technologies === 'string' ? JSON.parse(s.technologies) : s.technologies;
    setTechnologiesText(Array.isArray(techArr) ? techArr.join(', ') : '');

    setIsPublished(s.isPublished);
    setOrder(s.order);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortDesc || !fullDesc) {
      error('Please complete all required fields');
      return;
    }

    setSaving(true);
    try {
      const featuresArray = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);
      const technologiesArray = technologiesText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title,
        category,
        icon,
        shortDesc,
        fullDesc,
        features: featuresArray,
        technologies: technologiesArray,
        isPublished,
        order: Number(order),
      };

      if (editingService) {
        await api.put(`/services/${editingService.id}`, payload);
        success('Service updated successfully');
      } else {
        await api.post('/services', payload);
        success('Service created successfully');
      }

      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      error(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await api.delete(`/services/${deleteConfirmId}`);
      success('Service deleted successfully');
      setDeleteConfirmId(null);
      fetchServices();
    } catch (err: any) {
      error(err.message || 'Failed to delete service');
    }
  };

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Services & Capabilities</h2>
          <p className="text-xs text-slate-400">Manage public engineering disciplines and technical descriptions</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Service
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 bg-slate-900/80 border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-72">
            <Input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <span className="text-xs font-mono text-slate-400">
            Total: {filtered.length} service(s)
          </span>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading services..." className="py-16" />
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No services found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Icon</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{s.title}</div>
                      <div className="text-[11px] font-mono text-slate-400">{s.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="cyan" size="sm">{s.category}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{s.icon}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{s.order}</td>
                    <td className="py-3.5 px-4">
                      {s.isPublished ? (
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
                        onClick={() => openEditModal(s)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(s.id)}
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
        title={editingService ? 'Edit Engineering Service' : 'Add New Engineering Service'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Service Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Robotics Engineering"
              required
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { label: 'Robotics', value: 'Robotics' },
                { label: 'IoT', value: 'IoT' },
                { label: 'Embedded Systems', value: 'Embedded' },
                { label: 'Industrial Automation', value: 'Automation' },
                { label: 'Custom Electronics', value: 'Electronics' },
                { label: 'AI & Vision', value: 'AI' },
                { label: 'Mechanical Engineering', value: 'Mechanical' },
                { label: 'Prototyping & R&D', value: 'R&D' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              options={[
                { label: 'Bot (Robotics)', value: 'Bot' },
                { label: 'Wifi (IoT / Wireless)', value: 'Wifi' },
                { label: 'Cpu (Embedded / MCU)', value: 'Cpu' },
                { label: 'Factory (Automation)', value: 'Factory' },
                { label: 'CircuitBoard (Electronics)', value: 'CircuitBoard' },
                { label: 'Eye (Computer Vision)', value: 'Eye' },
                { label: 'Cog (Mechanical CAD)', value: 'Cog' },
                { label: 'Rocket (R&D Prototyping)', value: 'Rocket' },
              ]}
            />
            <Input
              label="Display Order Index"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>

          <Textarea
            label="Short Summary (shown on cards) *"
            rows={2}
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="Brief overview of what this engineering discipline delivers..."
            required
          />

          <Textarea
            label="Full Engineering Description *"
            rows={4}
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            placeholder="Detailed technical specifications, engineering processes, and architectures..."
            required
          />

          <Textarea
            label="Key Features / Deliverables (1 per line)"
            rows={3}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder="Kinematic & Dynamic Modeling&#10;Custom Motor Drives & BLDC Control&#10;ROS2 Navigation Stack"
          />

          <Input
            label="Key Technologies / Fieldbuses (comma-separated)"
            value={technologiesText}
            onChange={(e) => setTechnologiesText(e.target.value)}
            placeholder="ROS2, C++, CANopen, EtherCAT, STM32"
          />

          <div className="pt-2">
            <Switch
              checked={isPublished}
              onChange={setIsPublished}
              label="Publish to Website"
              description="Make this engineering service visible to public visitors"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={saving}>
              {editingService ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to permanently delete this engineering service? This action cannot be undone."
      />
    </div>
  );
};

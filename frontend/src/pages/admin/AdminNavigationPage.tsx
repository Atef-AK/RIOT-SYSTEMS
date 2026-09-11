import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Navigation, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Switch } from '../../components/ui/Switch';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { NavigationItem } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminNavigationPage: React.FC = () => {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [order, setOrder] = useState(0);
  const [target, setTarget] = useState('_self');
  const [isVisible, setIsVisible] = useState(true);

  const fetchNav = async () => {
    try {
      setLoading(true);
      const res = await api.get<NavigationItem[]>('/navigation', { visibleOnly: 'false' });
      if (res.data) setNavItems(res.data);
    } catch (err: any) {
      error('Failed to load navigation items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNav();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setLabel('');
    setUrl('/');
    setOrder(navItems.length + 1);
    setTarget('_self');
    setIsVisible(true);
    setIsModalOpen(true);
  };

  const openEdit = (item: NavigationItem) => {
    setEditingItem(item);
    setLabel(item.label);
    setUrl(item.url);
    setOrder(item.order);
    setTarget(item.target || '_self');
    setIsVisible(item.isVisible);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !url) {
      error('Label and URL are required');
      return;
    }
    setSaving(true);
    try {
      const payload = { label, url, order: Number(order), target, isVisible };
      if (editingItem) {
        await api.put(`/navigation/${(editingItem as any).id}`, payload);
        success('Navigation item updated');
      } else {
        await api.post('/navigation', payload);
        success('Navigation item added');
      }
      setIsModalOpen(false);
      fetchNav();
    } catch (err: any) {
      error(err.message || 'Failed to save navigation item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/navigation/${deleteId}`);
      success('Navigation item deleted');
      setDeleteId(null);
      fetchNav();
    } catch (err: any) {
      error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Navigation Manager</h2>
          <p className="text-xs text-slate-400">Configure header and footer links, labels, and order</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
          Add Menu Item
        </Button>
      </div>

      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading navigation..." className="py-16" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Label</th>
                  <th className="py-3 px-4">URL / Path</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {navItems.map((item) => (
                  <tr key={(item as any).id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white">{item.label}</td>
                    <td className="py-3.5 px-4 font-mono text-accent-cyan">{item.url}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{item.order}</td>
                    <td className="py-3.5 px-4">
                      {item.isVisible ? (
                        <span className="text-accent-green font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Visible
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId((item as any).id)} className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Item' : 'Add Menu Item'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Navigation Label *" value={label} onChange={(e) => setLabel(e.target.value)} required />
          <Input label="URL or Route Path *" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/services" required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Order" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            <Select
              label="Target Window"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              options={[
                { label: 'Same Window (_self)', value: '_self' },
                { label: 'New Window (_blank)', value: '_blank' },
              ]}
            />
          </div>
          <Switch checked={isVisible} onChange={setIsVisible} label="Visible in Main Navigation" />
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={saving}>Save Menu Item</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Menu Item"
        message="Are you sure you want to remove this navigation link?"
      />
    </div>
  );
};

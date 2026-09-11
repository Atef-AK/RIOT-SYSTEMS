import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Star, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Switch } from '../../components/ui/Switch';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { Testimonial } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminTestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState(0);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get<Testimonial[]>('/testimonials', { publishedOnly: 'false' });
      if (res.data) setTestimonials(res.data);
    } catch (err: any) {
      error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setClientName('');
    setCompany('');
    setPosition('');
    setContent('');
    setRating(5);
    setIsPublished(true);
    setOrder(testimonials.length + 1);
    setIsModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setClientName(t.clientName);
    setCompany(t.company);
    setPosition(t.position);
    setContent(t.content);
    setRating(t.rating);
    setIsPublished(t.isPublished);
    setOrder(t.order);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !company || !content) {
      error('Please complete all required fields');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        clientName,
        company,
        position,
        content,
        rating: Number(rating),
        isPublished,
        order: Number(order),
      };
      if (editing) {
        await api.put(`/testimonials/${editing.id}`, payload);
        success('Testimonial updated');
      } else {
        await api.post('/testimonials', payload);
        success('Testimonial added');
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      error(err.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/testimonials/${deleteId}`);
      success('Testimonial deleted');
      setDeleteId(null);
      fetchTestimonials();
    } catch (err: any) {
      error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Client Testimonials</h2>
          <p className="text-xs text-slate-400">Manage client reviews, verified quotes, and ratings</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
          Add Testimonial
        </Button>
      </div>

      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading testimonials..." className="py-16" />
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No testimonials logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Client Name & Position</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{t.clientName}</div>
                      <div className="text-[11px] text-slate-400">{t.position}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-200">{t.company}</td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {t.rating}/5
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {t.isPublished ? (
                        <span className="text-accent-green font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(t.id)}
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Client Full Name *"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
            <Input
              label="Company Name *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <Input
            label="Position / Role *"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Chief Technical Officer"
            required
          />
          <Textarea
            label="Testimonial Quote *"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Rating (1-5)"
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <Input
              label="Display Order"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>
          <Switch
            checked={isPublished}
            onChange={setIsPublished}
            label="Publish Testimonial"
          />
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={saving}>
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message="Are you sure you want to remove this client testimonial?"
      />
    </div>
  );
};

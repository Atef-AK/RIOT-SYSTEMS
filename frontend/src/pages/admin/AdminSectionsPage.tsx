import React, { useEffect, useState } from 'react';
import { Layers, Edit3, Eye, EyeOff, Save, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Page, PageSection } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminSectionsPage: React.FC = () => {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  // Edit fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [order, setOrder] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [primaryCtaText, setPrimaryCtaText] = useState('');
  const [primaryCtaUrl, setPrimaryCtaUrl] = useState('');
  const [secondaryCtaText, setSecondaryCtaText] = useState('');
  const [secondaryCtaUrl, setSecondaryCtaUrl] = useState('');

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await api.get<Page>('/pages/home');
      if (res.data?.sections) {
        setSections(res.data.sections);
      }
    } catch (err: any) {
      error('Failed to load homepage sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const openEditModal = (sec: PageSection) => {
    setEditingSection(sec);
    setTitle(sec.title || '');
    setSubtitle(sec.subtitle || '');
    setOrder(sec.order);
    setIsEnabled(sec.isEnabled);

    let contentObj: any = {};
    if (sec.content) {
      try {
        contentObj = typeof sec.content === 'string' ? JSON.parse(sec.content) : sec.content;
      } catch (e) {}
    }

    setPrimaryCtaText(contentObj.primaryCtaText || '');
    setPrimaryCtaUrl(contentObj.primaryCtaUrl || '');
    setSecondaryCtaText(contentObj.secondaryCtaText || '');
    setSecondaryCtaUrl(contentObj.secondaryCtaUrl || '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    setSaving(true);
    try {
      let contentObj: any = {};
      if (editingSection.content) {
        try {
          contentObj = typeof editingSection.content === 'string' ? JSON.parse(editingSection.content) : editingSection.content;
        } catch (e) {}
      }

      if (primaryCtaText || primaryCtaUrl) {
        contentObj.primaryCtaText = primaryCtaText;
        contentObj.primaryCtaUrl = primaryCtaUrl;
      }
      if (secondaryCtaText || secondaryCtaUrl) {
        contentObj.secondaryCtaText = secondaryCtaText;
        contentObj.secondaryCtaUrl = secondaryCtaUrl;
      }

      await api.put(`/sections/${editingSection.id}`, {
        title,
        subtitle,
        order: Number(order),
        isEnabled,
        content: contentObj,
      });

      success('Section updated successfully');
      setEditingSection(null);
      fetchSections();
    } catch (err: any) {
      error(err.message || 'Failed to update section');
    } finally {
      setSaving(false);
    }
  };

  const toggleSectionState = async (sec: PageSection) => {
    try {
      await api.put(`/sections/${sec.id}`, {
        isEnabled: !sec.isEnabled,
      });
      success(`Section ${sec.sectionType} ${!sec.isEnabled ? 'enabled' : 'disabled'}`);
      fetchSections();
    } catch (err: any) {
      error('Failed to toggle section state');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Homepage CMS Section Builder</h2>
        <p className="text-xs text-slate-400">
          Reorder, edit headlines, configure CTA buttons, or toggle visibility of homepage modules without editing code
        </p>
      </div>

      {/* Sections Cards */}
      {loading ? (
        <Spinner size="lg" label="Loading CMS layout..." className="py-16" />
      ) : (
        <div className="space-y-4">
          {sections.map((sec, idx) => (
            <Card
              key={sec.id}
              className={`p-6 border transition-all ${
                sec.isEnabled ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 font-mono font-bold text-accent-cyan flex items-center justify-center flex-shrink-0">
                    0{sec.order}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="cyan" size="sm">
                        {sec.sectionType}
                      </Badge>
                      {sec.isEnabled ? (
                        <span className="text-[11px] font-mono text-accent-green font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500 font-bold">
                          Hidden
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {sec.title || `${sec.sectionType} Section`}
                    </h3>
                    {sec.subtitle && (
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{sec.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSectionState(sec)}
                    leftIcon={sec.isEnabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  >
                    {sec.isEnabled ? 'Disable' : 'Enable'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(sec)}
                    leftIcon={<Edit3 className="w-4 h-4" />}
                  >
                    Edit Content
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingSection && (
        <Modal
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          title={`Edit ${editingSection.sectionType} Section`}
          size="lg"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Headline / Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Section main headline"
            />

            <Textarea
              label="Subtitle / Supporting Text"
              rows={3}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Supporting explanation or description"
            />

            {(editingSection.sectionType === 'Hero' || editingSection.sectionType === 'CTA') && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-accent-cyan">
                  Call to Action (CTA) Buttons
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Primary CTA Text"
                    value={primaryCtaText}
                    onChange={(e) => setPrimaryCtaText(e.target.value)}
                    placeholder="e.g. Start a Project"
                  />
                  <Input
                    label="Primary CTA URL"
                    value={primaryCtaUrl}
                    onChange={(e) => setPrimaryCtaUrl(e.target.value)}
                    placeholder="/contact"
                  />
                </div>

                {editingSection.sectionType === 'Hero' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Secondary CTA Text"
                      value={secondaryCtaText}
                      onChange={(e) => setSecondaryCtaText(e.target.value)}
                      placeholder="e.g. Explore Our Work"
                    />
                    <Input
                      label="Secondary CTA URL"
                      value={secondaryCtaUrl}
                      onChange={(e) => setSecondaryCtaUrl(e.target.value)}
                      placeholder="/projects"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Display Order Index"
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
              <div className="flex items-center pt-6">
                <Switch
                  checked={isEnabled}
                  onChange={setIsEnabled}
                  label="Display on Homepage"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <Button variant="ghost" type="button" onClick={() => setEditingSection(null)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
                Save Section Content
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

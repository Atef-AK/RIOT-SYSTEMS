import React, { useEffect, useState } from 'react';
import { Save, Settings, Globe, Mail, Share2, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Spinner } from '../../components/ui/Spinner';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminSettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  // Settings state
  const [siteName, setSiteName] = useState('');
  const [siteTagline, setSiteTagline] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [socialLinkedin, setSocialLinkedin] = useState('');
  const [socialGithub, setSocialGithub] = useState('');
  const [socialFacebook, setSocialFacebook] = useState('');
  const [socialYoutube, setSocialYoutube] = useState('');

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ map: Record<string, string> }>('/settings');
      if (res.data?.map) {
        const m = res.data.map;
        setSiteName(m.site_name || 'R-IoTSys');
        setSiteTagline(m.site_tagline || '');
        setSiteDescription(m.site_description || '');
        setContactEmail(m.contact_email || 'contact@r-iotsys.tn');
        setContactPhone(m.contact_phone || '+216 97 887 867');
        setContactAddress(m.contact_address || 'Alain Savary Tunis - Tunisia');
        setWorkingHours(m.working_hours || 'Monday – Friday: 08:30 – 18:00 (GMT+1)');
        setMapsUrl(m.maps_url || '');
        setSocialLinkedin(m.social_linkedin || '');
        setSocialGithub(m.social_github || '');
        setSocialFacebook(m.social_facebook || '');
        setSocialYoutube(m.social_youtube || '');
      }
    } catch (err: any) {
      error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        site_name: siteName,
        site_tagline: siteTagline,
        site_description: siteDescription,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        contact_address: contactAddress,
        working_hours: workingHours,
        maps_url: mapsUrl,
        social_linkedin: socialLinkedin,
        social_github: socialGithub,
        social_facebook: socialFacebook,
        social_youtube: socialYoutube,
      };

      await api.put('/settings', payload);
      success('Site settings saved successfully');
    } catch (err: any) {
      error(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner size="lg" label="Loading site configuration..." className="py-20" />;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Site & Brand Settings</h2>
          <p className="text-xs text-slate-400">Configure global metadata, SEO, contact information, and social links</p>
        </div>
        <Button type="submit" variant="primary" size="sm" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
          Save All Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General & SEO */}
        <Card className="p-6 bg-slate-900/90 border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
            <Globe className="w-4 h-4 text-accent-cyan" />
            <span>General & Search Engine Optimization (SEO)</span>
          </div>

          <Input
            label="Company / Brand Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />

          <Input
            label="Default Tagline"
            value={siteTagline}
            onChange={(e) => setSiteTagline(e.target.value)}
          />

          <Textarea
            label="Meta Description"
            rows={3}
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
          />
        </Card>

        {/* Contact Information */}
        <Card className="p-6 bg-slate-900/90 border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
            <Mail className="w-4 h-4 text-accent-green" />
            <span>Contact Details & Operating Hours</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contact Email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <Input
              label="Contact Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>

          <Input
            label="Physical Office / Lab Address"
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Operating Hours"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
            />
            <Input
              label="Google Maps URL"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
            />
          </div>
        </Card>

        {/* Social Media Links */}
        <Card className="p-6 bg-slate-900/90 border-slate-800 space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>Official Social & Developer Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="LinkedIn Company Profile"
              value={socialLinkedin}
              onChange={(e) => setSocialLinkedin(e.target.value)}
              placeholder="https://linkedin.com/company/r-iotsys"
            />
            <Input
              label="GitHub Organization"
              value={socialGithub}
              onChange={(e) => setSocialGithub(e.target.value)}
              placeholder="https://github.com/r-iotsys"
            />
            <Input
              label="YouTube Channel"
              value={socialYoutube}
              onChange={(e) => setSocialYoutube(e.target.value)}
              placeholder="https://youtube.com/@r-iotsys"
            />
            <Input
              label="Facebook Page"
              value={socialFacebook}
              onChange={(e) => setSocialFacebook(e.target.value)}
              placeholder="https://facebook.com/riotsys"
            />
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="lg" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
          Save Settings
        </Button>
      </div>
    </form>
  );
};

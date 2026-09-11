import React, { useEffect, useState } from 'react';
import { UploadCloud, Copy, Trash2, Search, Check, FileText, Image as ImageIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { MediaItem } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminMediaPage: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const { success, error } = useToast();

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get<MediaItem[]>('/media', { search: search || undefined });
      if (res.data) {
        setMedia(res.data);
      }
    } catch (err: any) {
      error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        await api.post('/media/upload', formData, true);
      }
      success('File(s) uploaded successfully');
      fetchMedia();
    } catch (err: any) {
      error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await api.delete(`/media/${deleteConfirmId}`);
      success('File deleted');
      setDeleteConfirmId(null);
      fetchMedia();
    } catch (err: any) {
      error(err.message || 'Failed to delete file');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Media & Asset Library</h2>
          <p className="text-xs text-slate-400">Upload and manage project schematics, CAD exports, and photography</p>
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-primary-dark font-bold text-xs uppercase tracking-wider shadow-lg shadow-accent-cyan/20 hover:opacity-95 transition-all">
          <UploadCloud className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload New File'}</span>
          <input type="file" multiple onChange={handleFileUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      {/* Search Bar */}
      <Card className="p-4 bg-slate-900/80 border-slate-800">
        <div className="w-72">
          <Input
            placeholder="Search media files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchMedia()}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </Card>

      {/* Gallery Grid */}
      {loading ? (
        <Spinner size="lg" label="Loading media assets..." className="py-20" />
      ) : media.length === 0 ? (
        <div className="p-16 text-center text-xs text-slate-400">
          No media files uploaded yet. Click "Upload New File" to add assets.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => {
            const isImage = item.mimeType.startsWith('image/');

            return (
              <Card
                key={item.id}
                className="p-0 overflow-hidden bg-slate-900/90 border-slate-800 group flex flex-col justify-between"
              >
                {/* Thumbnail */}
                <div className="relative h-36 bg-slate-950 flex items-center justify-center overflow-hidden">
                  {isImage ? (
                    <img
                      src={item.url}
                      alt={item.altText || item.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <FileText className="w-12 h-12 text-slate-600" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => copyToClipboard(item.url, item.id)}
                      className="p-2 rounded-lg bg-slate-900/90 text-slate-200 hover:text-accent-cyan transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-2 rounded-lg bg-rose-500/80 text-white hover:bg-rose-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-3">
                  <div className="font-semibold text-xs text-white truncate" title={item.originalName}>
                    {item.originalName}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>{formatBytes(item.size)}</span>
                    <button
                      onClick={() => copyToClipboard(item.url, item.id)}
                      className="text-accent-cyan hover:underline"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Media File"
        message="Are you sure you want to remove this file from your media storage?"
      />
    </div>
  );
};

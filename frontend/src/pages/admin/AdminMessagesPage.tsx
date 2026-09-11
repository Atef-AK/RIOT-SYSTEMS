import React, { useEffect, useState } from 'react';
import {
  Inbox,
  Search,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  Mail,
  Phone,
  Building,
  DollarSign,
  Paperclip,
  ExternalLink,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { ContactMessage, MessageStatus } from '../../types';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const { success, error } = useToast();

  // Detail / Action Modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [statusDraft, setStatusDraft] = useState<MessageStatus>('NEW');
  const [internalNotes, setInternalNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ messages: ContactMessage[]; unreadCount: number }>('/messages', {
        status: activeTab === 'ALL' ? undefined : activeTab,
        search: search || undefined,
      });
      if (res.data) {
        setMessages(res.data.messages);
        setUnreadCount(res.data.unreadCount);
      }
    } catch (err: any) {
      error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [activeTab]);

  const openMessageDetail = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setStatusDraft(msg.status);
    setInternalNotes(msg.internalNotes || '');

    // If it was NEW, it gets automatically marked as READ in backend
    if (msg.status === 'NEW') {
      try {
        await api.patch(`/messages/${msg.id}`, { status: 'READ' });
        fetchMessages();
      } catch (e) {}
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedMessage) return;
    setIsUpdating(true);
    try {
      const res = await api.patch<ContactMessage>(`/messages/${selectedMessage.id}`, {
        status: statusDraft,
        internalNotes,
      });
      if (res.data) {
        setSelectedMessage(res.data);
        success('Message status and notes updated');
        fetchMessages();
      }
    } catch (err: any) {
      error(err.message || 'Failed to update message status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await api.delete(`/messages/${deleteConfirmId}`);
      success('Message deleted');
      setDeleteConfirmId(null);
      if (selectedMessage?.id === deleteConfirmId) {
        setSelectedMessage(null);
      }
      fetchMessages();
    } catch (err: any) {
      error(err.message || 'Failed to delete message');
    }
  };

  const tabOptions = [
    { id: 'ALL', label: 'All Inquiries' },
    { id: 'NEW', label: 'New', count: unreadCount },
    { id: 'READ', label: 'Read' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'REPLIED', label: 'Replied' },
    { id: 'ARCHIVED', label: 'Archived' },
  ];

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="rose">New</Badge>;
      case 'READ':
        return <Badge variant="blue">Read</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="amber">In Progress</Badge>;
      case 'REPLIED':
        return <Badge variant="green">Replied</Badge>;
      case 'ARCHIVED':
        return <Badge variant="slate">Archived</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Project Inquiries Inbox</h2>
          <p className="text-xs text-slate-400">Incoming requests for proposals, quotes, and client communications</p>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <Tabs tabs={tabOptions} activeTab={activeTab} onChange={setActiveTab} />
        <div className="w-full lg:w-72">
          <Input
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchMessages()}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Messages Table */}
      <Card className="p-0 overflow-hidden bg-slate-900/90 border-slate-800">
        {loading ? (
          <Spinner size="lg" label="Loading client messages..." className="py-16" />
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No messages in this folder.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono uppercase text-slate-400 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Sender / Organization</th>
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                {messages.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => openMessageDetail(m)}
                    className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                      m.status === 'NEW' ? 'bg-accent-cyan/5 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        {m.name}
                        {m.status === 'NEW' && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {m.email} {m.company ? `• ${m.company}` : ''}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <Badge variant="cyan" size="sm">{m.projectType}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{m.budgetRange || '-'}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(m.status)}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMessageDetail(m);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(m.id);
                        }}
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

      {/* Detail Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title={`Inquiry from ${selectedMessage.name}`}
          description={`Received on ${new Date(selectedMessage.createdAt).toLocaleString()}`}
          size="lg"
        >
          <div className="space-y-6">
            {/* Sender Meta Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-cyan" />
                <a href={`mailto:${selectedMessage.email}`} className="text-slate-200 hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-green" />
                <span>{selectedMessage.phone || 'No phone provided'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-purple-400" />
                <span>{selectedMessage.company || 'Individual / Unspecified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Budget: {selectedMessage.budgetRange || 'Not specified'}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                Requirements Description:
              </h4>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Attachment if present */}
            {selectedMessage.attachmentUrl && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Paperclip className="w-4 h-4 text-accent-cyan" />
                  <span>{selectedMessage.attachmentUrl}</span>
                </div>
                {selectedMessage.attachmentUrl.startsWith('/uploads') && (
                  <a
                    href={selectedMessage.attachmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-accent-cyan hover:underline flex items-center gap-1 font-mono"
                  >
                    Open <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {/* Status & Notes Management */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-300">
                Workflow Status & Internal Notes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Update Status"
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value as MessageStatus)}
                  options={[
                    { label: 'New', value: 'NEW' },
                    { label: 'Read', value: 'READ' },
                    { label: 'In Progress / Assigned', value: 'IN_PROGRESS' },
                    { label: 'Replied / RFQ Sent', value: 'REPLIED' },
                    { label: 'Archived', value: 'ARCHIVED' },
                  ]}
                />
              </div>

              <Textarea
                label="Internal Engineering Notes"
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add notes visible only to admins (e.g., Assigned to Lead Firmware Engineer, meeting scheduled)..."
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="primary" size="sm" onClick={handleUpdateStatus} isLoading={isUpdating}>
                  Save Status & Notes
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Inquiry Message"
        message="Are you sure you want to permanently remove this inquiry from your database?"
      />
    </div>
  );
};

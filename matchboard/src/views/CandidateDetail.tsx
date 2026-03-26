import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { TextArea } from '../components/Input';
import { Select } from '../components/Select';
import { ArrowLeft, MapPin, Briefcase, Trash2, StickyNote, MessageSquare, Phone, Calendar, Clock } from 'lucide-react';
import { formatDate, formatDateTime } from '../lib/utils';

interface CandidateDetailProps {
    candidateId: string;
    onBack: () => void;
}

const INTERACTION_ICONS: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
    call: Phone,
    date: Calendar,
    chat: MessageSquare,
};

export function CandidateDetail({ candidateId, onBack }: CandidateDetailProps) {
    const { data, addNote, addInteraction, updateCandidate, deleteCandidate } = useStore();
    const candidate = data.candidates.find(c => c.id === candidateId);
    const notes = data.notes.filter(n => n.candidateId === candidateId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const interactions = data.interactions.filter(i => i.candidateId === candidateId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const [activeTab, setActiveTab] = useState<'overview' | 'interactions' | 'notes' | 'tags'>('overview');
    const [newNote, setNewNote] = useState('');
    const [interactionType, setInteractionType] = useState<'call' | 'date' | 'chat'>('chat');
    const [interactionSummary, setInteractionSummary] = useState('');
    const [interactionDate, setInteractionDate] = useState(new Date().toISOString().slice(0, 16));

    if (!candidate) return <div className="p-8 text-muted">Candidate not found</div>;

    const handleAddNote = () => {
        if (!newNote.trim()) return;
        addNote({ candidateId, content: newNote });
        setNewNote('');
    };

    const handleAddInteraction = () => {
        if (!interactionSummary.trim()) return;
        addInteraction({
            candidateId,
            type: interactionType,
            summary: interactionSummary,
            date: new Date(interactionDate).toISOString(),
        });
        setInteractionSummary('');
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this candidate? This action cannot be undone.')) {
            deleteCandidate(candidate.id);
            onBack();
        }
    };

    const tabs = [
        { id: 'overview' as const, label: 'Overview' },
        { id: 'interactions' as const, label: `Interactions (${interactions.length})` },
        { id: 'notes' as const, label: `Notes (${notes.length})` },
        { id: 'tags' as const, label: 'Tags' },
    ];

    return (
        <div className="p-8 flex flex-col gap-6 animate-fade-in" style={{ maxWidth: '960px', margin: '0 auto' }}>
            {/* Top Actions */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onBack} className="gap-2">
                    <ArrowLeft size={18} /> Back
                </Button>
                <Button variant="danger" onClick={handleDelete} className="gap-2">
                    <Trash2 size={16} /> Delete
                </Button>
            </div>

            {/* Profile Header with gradient banner */}
            <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: 'var(--bg-card)',
            }}>
                {/* Gradient Banner */}
                <div style={{
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #a3d4b8 50%, var(--primary-light) 100%)',
                }} />

                {/* Profile Content (shifted up) */}
                <div style={{ padding: '0 2rem 2rem', marginTop: '-48px', position: 'relative', zIndex: 10 }}>
                    <div className="flex gap-6 items-end" style={{ marginBottom: '1.25rem' }}>
                        <div
                            style={{
                                width: '96px',
                                height: '96px',
                                borderRadius: '24px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: 'var(--primary)',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                                flexShrink: 0,
                                border: '4px solid var(--bg-card)',
                            }}
                        >
                            {candidate.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1, paddingBottom: '0.25rem' }}>
                            <h1 className="font-bold tracking-tight" style={{ fontSize: '2.25rem', lineHeight: 1.1, color: 'var(--text-main)' }}>
                                {candidate.name}, {candidate.age}
                            </h1>
                            <div className="flex items-center gap-5 text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem', fontWeight: 500 }}>
                                <span className="flex items-center gap-1"><MapPin size={15} /> {candidate.city}</span>
                                <span className="flex items-center gap-1"><Briefcase size={15} /> {candidate.job}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Select
                                value={candidate.status}
                                onChange={(val) => updateCandidate(candidate.id, { status: val as any })}
                                options={[
                                    { value: 'new', label: 'New', color: '#3B82F6' },
                                    { value: 'chatting', label: 'Chatting', color: '#8B5CF6' },
                                    { value: 'met once', label: 'Met Once', color: '#F59E0B' },
                                    { value: 'on hold', label: 'On Hold', color: '#6B7280' },
                                    { value: 'ended', label: 'Ended', color: '#64748B' },
                                ]}
                                className="w-full"
                            />
                            <span className="text-xs text-muted font-medium" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={12} /> Added {formatDate(candidate.createdAt)}
                            </span>
                        </div>
                    </div>

                    {candidate.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {candidate.tags.map(tag => (
                                <Badge key={tag.id} color={tag.color} variant="solid" size="md">{tag.label}</Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8" style={{ borderBottom: '1px solid var(--border)' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ minHeight: '300px' }} className="animate-fade-in" key={activeTab}>
                {activeTab === 'overview' && (
                    <Card className="p-8" hoverable={false}>
                        <h3 className="font-bold text-lg flex items-center gap-2" style={{ marginBottom: '1rem' }}>
                            <StickyNote size={18} style={{ color: 'var(--primary)' }} /> Quick Summary
                        </h3>
                        <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                            {candidate.notesSummary || "No summary added yet. Add one when editing the candidate."}
                        </p>
                    </Card>
                )}

                {activeTab === 'interactions' && (
                    <div className="flex flex-col gap-8">
                        {/* Add Interaction Form */}
                        <Card hoverable={false} style={{ backgroundColor: 'var(--bg-app)', border: '1px dashed var(--border)' }}>
                            <h3 className="font-bold text-sm text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                                Log New Interaction
                            </h3>
                            <div className="flex gap-4" style={{ marginBottom: '0.75rem' }}>
                                <select
                                    className="flex-1"
                                    value={interactionType}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInteractionType(e.target.value as any)}
                                    style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)', padding: '0.625rem 0.875rem' }}
                                >
                                    <option value="chat">💬 Chat</option>
                                    <option value="call">📞 Call</option>
                                    <option value="date">📅 Date</option>
                                </select>
                                <input
                                    type="datetime-local"
                                    className="flex-1"
                                    value={interactionDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInteractionDate(e.target.value)}
                                    style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)', padding: '0.625rem 0.875rem' }}
                                />
                            </div>
                            <TextArea
                                placeholder="What happened?"
                                value={interactionSummary}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInteractionSummary(e.target.value)}
                                style={{ minHeight: '80px', backgroundColor: 'white' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                                <Button size="md" onClick={handleAddInteraction}>Add Log</Button>
                            </div>
                        </Card>

                        {/* Timeline */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            paddingLeft: '1.5rem',
                            borderLeft: '2px solid var(--border)',
                            position: 'relative',
                        }}>
                            {interactions.map(interaction => {
                                const InteractionIcon = INTERACTION_ICONS[interaction.type] || MessageSquare;
                                return (
                                    <div key={interaction.id} style={{ position: 'relative' }}>
                                        {/* Timeline dot */}
                                        <div style={{
                                            position: 'absolute',
                                            left: '-2rem',
                                            top: '0.5rem',
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--primary)',
                                            border: '3px solid var(--bg-card)',
                                            boxShadow: 'var(--shadow-sm)',
                                        }} />
                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <div className="flex items-center gap-3" style={{ marginBottom: '0.5rem' }}>
                                                <Badge variant="outline" size="sm">
                                                    <InteractionIcon size={12} style={{ marginRight: '2px' }} />{interaction.type}
                                                </Badge>
                                                <span className="text-sm text-muted font-medium">{formatDateTime(interaction.date)}</span>
                                            </div>
                                            <Card className="p-4" hoverable={false}>
                                                <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{interaction.summary}</p>
                                            </Card>
                                        </div>
                                    </div>
                                );
                            })}
                            {interactions.length === 0 && (
                                <p className="text-muted italic" style={{ paddingLeft: '0.5rem' }}>No interactions logged yet.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="flex flex-col gap-6">
                        {/* Add Note */}
                        <div className="flex gap-4 items-start">
                            <TextArea
                                placeholder="Add a private note..."
                                value={newNote}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNote(e.target.value)}
                                className="flex-1"
                                style={{ minHeight: '100px' }}
                            />
                            <Button onClick={handleAddNote} style={{ height: '48px', padding: '0 1.5rem' }}>Add Note</Button>
                        </div>

                        {/* Notes List */}
                        <div className="flex flex-col gap-4">
                            {notes.map(note => (
                                <div key={note.id} style={{
                                    padding: '1.25rem 1.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    backgroundColor: '#FEFCE8',
                                    border: '1px solid #FEF3C7',
                                    borderLeft: '4px solid #F59E0B',
                                    transition: 'var(--transition)',
                                }}>
                                    <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.6, color: '#44403C' }}>{note.content}</p>
                                    <p className="text-xs text-muted font-medium" style={{ marginTop: '0.75rem', textAlign: 'right' }}>
                                        {formatDateTime(note.createdAt)}
                                    </p>
                                </div>
                            ))}
                            {notes.length === 0 && <p className="text-muted italic">No notes yet. Add your first note above.</p>}
                        </div>
                    </div>
                )}

                {activeTab === 'tags' && (
                    <Card className="p-8" hoverable={false}>
                        <h3 className="font-bold text-lg" style={{ marginBottom: '1.25rem' }}>Manage Tags</h3>
                        <p className="text-sm text-muted" style={{ marginBottom: '1rem' }}>Click a tag to toggle it on or off for this candidate.</p>
                        <div className="flex flex-wrap gap-3">
                            {data.tags.map(tag => {
                                const isSelected = candidate.tags.some(t => t.id === tag.id);
                                return (
                                    <button
                                        key={tag.id}
                                        onClick={() => {
                                            const newTags = isSelected
                                                ? candidate.tags.filter(t => t.id !== tag.id)
                                                : [...candidate.tags, tag];
                                            updateCandidate(candidate.id, { tags: newTags });
                                        }}
                                        style={{
                                            transition: 'var(--transition-spring)',
                                            opacity: isSelected ? 1 : 0.45,
                                            transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Badge
                                            color={tag.color}
                                            variant={isSelected ? 'solid' : 'outline'}
                                            size="md"
                                        >
                                            {isSelected ? '✓ ' : ''}{tag.label}
                                        </Badge>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}

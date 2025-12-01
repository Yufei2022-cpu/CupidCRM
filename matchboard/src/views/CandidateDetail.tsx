import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { TextArea } from '../components/Input';
import { Select } from '../components/Select';
import { ArrowLeft, MapPin, Briefcase, Trash2, StickyNote } from 'lucide-react';
import { formatDate, formatDateTime } from '../lib/utils';

interface CandidateDetailProps {
    candidateId: string;
    onBack: () => void;
}

export function CandidateDetail({ candidateId, onBack }: CandidateDetailProps) {
    const { data, addNote, addInteraction, updateCandidate, deleteCandidate } = useStore();
    const candidate = data.candidates.find(c => c.id === candidateId);
    const notes = data.notes.filter(n => n.candidateId === candidateId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const interactions = data.interactions.filter(i => i.candidateId === candidateId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const [activeTab, setActiveTab] = useState<'overview' | 'interactions' | 'notes' | 'tags'>('overview');
    const [newNote, setNewNote] = useState('');

    // Interaction Form State
    const [interactionType, setInteractionType] = useState<'call' | 'date' | 'chat'>('chat');
    const [interactionSummary, setInteractionSummary] = useState('');
    const [interactionDate, setInteractionDate] = useState(new Date().toISOString().slice(0, 16));

    if (!candidate) return <div>Candidate not found</div>;

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

    return (
        <div className="p-8 flex flex-col gap-8 max-w-5xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onBack} className="gap-2 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft size={18} /> Back to Dashboard
                </Button>
                <Button variant="ghost" onClick={handleDelete} className="text-slate-500 hover:bg-slate-50 hover:text-slate-700">
                    <Trash2 size={18} className="mr-2" /> Delete Candidate
                </Button>
            </div>

            {/* Header Profile */}
            <Card className="flex flex-col md:flex-row gap-8 items-start p-8">
                <div
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: 'white',
                        boxShadow: '0 10px 25px -5px rgba(92, 138, 114, 0.4)',
                        flexShrink: 0
                    }}
                >
                    {candidate.name.charAt(0)}
                </div>

                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                            <h1 className="font-bold tracking-tight" style={{ fontSize: '2.5rem', lineHeight: 1.1 }}>{candidate.name}, {candidate.age}</h1>
                            <div className="flex items-center gap-6 text-muted mt-3 text-lg">
                                <span className="flex items-center gap-2"><MapPin size={18} /> {candidate.city}</span>
                                <span className="flex items-center gap-2"><Briefcase size={18} /> {candidate.job}</span>
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
                                className="w-40"
                            />
                            <span className="text-xs text-muted font-medium">Added {formatDate(candidate.createdAt)}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6 flex-wrap">
                        {candidate.tags.map(tag => (
                            <Badge key={tag.id} color={tag.color} variant="solid">{tag.label}</Badge>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <div className="flex border-b gap-8" style={{ borderColor: 'var(--border)' }}>
                <button
                    className={`pb-4 font-bold text-lg transition-all relative ${activeTab === 'overview' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                    {activeTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full" style={{ backgroundColor: 'var(--primary)' }} />
                    )}
                </button>
                <button
                    className={`pb-4 font-bold text-lg transition-all relative ${activeTab === 'interactions' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => setActiveTab('interactions')}
                >
                    Interactions
                    {activeTab === 'interactions' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full" style={{ backgroundColor: 'var(--primary)' }} />
                    )}
                </button>
                <button
                    className={`pb-4 font-bold text-lg transition-all relative ${activeTab === 'notes' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => setActiveTab('notes')}
                >
                    Notes
                    {activeTab === 'notes' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full" style={{ backgroundColor: 'var(--primary)' }} />
                    )}
                </button>
                <button
                    className={`pb-4 font-bold text-lg transition-all relative ${activeTab === 'tags' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => setActiveTab('tags')}
                >
                    Tags
                    {activeTab === 'tags' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full" style={{ backgroundColor: 'var(--primary)' }} />
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                {activeTab === 'overview' && (
                    <div className="flex flex-col gap-4">
                        <Card className="p-8">
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <StickyNote size={20} className="text-primary" /> Quick Summary
                            </h3>
                            <p className="text-muted text-lg leading-relaxed">{candidate.notesSummary || "No summary added yet."}</p>
                        </Card>
                    </div>
                )}

                {activeTab === 'interactions' && (
                    <div className="flex flex-col gap-8">
                        <Card className="flex flex-col gap-4 bg-slate-50 border-none shadow-inner" style={{ backgroundColor: 'var(--bg-app)' }}>
                            <h3 className="font-bold text-sm uppercase text-muted tracking-wider">Log New Interaction</h3>
                            <div className="flex gap-4">
                                <select
                                    className="p-3 rounded-lg border bg-white flex-1"
                                    value={interactionType}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInteractionType(e.target.value as any)}
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    <option value="chat">Chat</option>
                                    <option value="call">Call</option>
                                    <option value="date">Date</option>
                                </select>
                                <input
                                    type="datetime-local"
                                    className="p-3 rounded-lg border bg-white flex-1"
                                    value={interactionDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInteractionDate(e.target.value)}
                                    style={{ borderColor: 'var(--border)' }}
                                />
                            </div>
                            <TextArea
                                placeholder="What happened?"
                                value={interactionSummary}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInteractionSummary(e.target.value)}
                                style={{ minHeight: '80px', backgroundColor: 'white' }}
                            />
                            <Button size="md" onClick={handleAddInteraction} className="self-end shadow-md">Add Log</Button>
                        </Card>

                        <div className="flex flex-col gap-6 pl-4 border-l-2 border-slate-200" style={{ borderColor: 'var(--border)' }}>
                            {interactions.map(interaction => (
                                <div key={interaction.id} className="flex gap-6 relative">
                                    <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm"
                                        style={{ backgroundColor: 'var(--primary)' }}></div>
                                    <div className="pb-2 w-full">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge variant="outline">{interaction.type}</Badge>
                                            <span className="text-sm text-muted font-medium">{formatDateTime(interaction.date)}</span>
                                        </div>
                                        <Card className="p-4 bg-white shadow-sm">
                                            <p className="text-base">{interaction.summary}</p>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                            {interactions.length === 0 && <p className="text-muted italic pl-2">No interactions logged yet.</p>}
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-4 items-start">
                            <TextArea
                                placeholder="Add a private note..."
                                value={newNote}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNote(e.target.value)}
                                className="flex-1 shadow-sm"
                                style={{ minHeight: '100px' }}
                            />
                            <Button onClick={handleAddNote} className="h-12 px-6 shadow-md">Add Note</Button>
                        </div>

                        <div className="grid gap-4">
                            {notes.map(note => (
                                <Card key={note.id} className="bg-yellow-50 border-yellow-100" style={{ backgroundColor: '#FEFCE8', borderColor: '#FEF9C3' }}>
                                    <p className="whitespace-pre-wrap text-lg text-slate-800">{note.content}</p>
                                    <p className="text-xs text-muted mt-4 text-right font-medium">{formatDateTime(note.createdAt)}</p>
                                </Card>
                            ))}
                            {notes.length === 0 && <p className="text-muted italic">No notes yet.</p>}
                        </div>
                    </div>
                )}

                {activeTab === 'tags' && (
                    <div className="flex flex-col gap-6">
                        <Card className="p-8">
                            <h3 className="font-bold text-xl mb-6">Manage Tags</h3>
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
                                            className="transition-all duration-200 hover:scale-105"
                                            style={{ opacity: isSelected ? 1 : 0.5 }}
                                        >
                                            <Badge
                                                color={tag.color}
                                                variant={isSelected ? 'solid' : 'outline'}
                                                className="text-lg py-2 px-4 cursor-pointer"
                                            >
                                                {tag.label}
                                            </Badge>
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

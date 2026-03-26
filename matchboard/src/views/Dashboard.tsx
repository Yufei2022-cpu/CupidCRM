import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { CandidateCard } from '../components/CandidateCard';
import { Button } from '../components/Button';
import { Plus, Search, Filter, Users, UserPlus, MessageCircle, Calendar, ArrowUpDown } from 'lucide-react';

interface DashboardProps {
    onCandidateClick: (id: string) => void;
    onAddCandidate: () => void;
}

export function Dashboard({ onCandidateClick, onAddCandidate }: DashboardProps) {
    const { data, deleteCandidate } = useStore();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'active' | 'age-asc' | 'age-desc'>('recent');

    const filteredCandidates = data.candidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.city.toLowerCase().includes(search.toLowerCase()) ||
            c.job.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'active') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (sortBy === 'age-asc') return a.age - b.age;
        if (sortBy === 'age-desc') return b.age - a.age;
        return 0;
    });

    // Stat data
    const stats = [
        { label: 'Total', value: data.candidates.length, icon: Users, color: 'var(--primary)' },
        { label: 'New', value: data.candidates.filter(c => c.status === 'new').length, icon: UserPlus, color: '#3B82F6' },
        { label: 'Chatting', value: data.candidates.filter(c => c.status === 'chatting').length, icon: MessageCircle, color: '#8B5CF6' },
        { label: 'Met', value: data.candidates.filter(c => c.status === 'met once').length, icon: Calendar, color: '#F59E0B' },
    ];

    return (
        <div className="p-8 flex flex-col gap-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-bold tracking-tight" style={{ fontSize: '1.75rem', color: 'var(--text-main)' }}>Candidates</h1>
                    <p className="text-muted" style={{ marginTop: '0.25rem', fontSize: '0.95rem' }}>Manage your relationships and dates.</p>
                </div>
                <Button onClick={onAddCandidate} size="lg" className="shadow-lg gap-2">
                    <Plus size={20} /> Add Candidate
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 stagger-children">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="stat-card">
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                background: stat.color,
                                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                            }} />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted font-medium">{stat.label}</p>
                                    <p className="font-bold" style={{ fontSize: '1.5rem', lineHeight: 1.2 }}>{stat.value}</p>
                                </div>
                                <div style={{
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius)',
                                    backgroundColor: `${stat.color}12`,
                                }}>
                                    <Icon size={20} style={{ color: stat.color }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Search & Filter Bar */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                backgroundColor: 'var(--bg-card)',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)',
            }}>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Search size={18} style={{ color: 'var(--text-light)', position: 'absolute', left: '0.5rem' }} />
                    <input
                        type="text"
                        placeholder="Search by name, city, or job..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            paddingLeft: '2.25rem',
                            border: 'none',
                            backgroundColor: 'transparent',
                            fontSize: '0.95rem',
                            outline: 'none',
                            color: 'var(--text-main)',
                        }}
                    />
                </div>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />
                <div className="flex items-center gap-2">
                    <ArrowUpDown size={16} style={{ color: 'var(--text-light)' }} />
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as any)}
                        style={{
                            minWidth: '120px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                            cursor: 'pointer',
                            outline: 'none',
                            fontSize: '0.9rem',
                            color: 'var(--text-main)',
                        }}
                    >
                        <option value="recent">Recently Added</option>
                        <option value="active">Recently Active</option>
                        <option value="age-asc">Age (Youngest)</option>
                        <option value="age-desc">Age (Oldest)</option>
                    </select>
                </div>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />
                <div className="flex items-center gap-2">
                    <Filter size={16} style={{ color: 'var(--text-light)' }} />
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        style={{
                            minWidth: '150px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                            cursor: 'pointer',
                            outline: 'none',
                            fontSize: '0.9rem',
                            color: 'var(--text-main)',
                        }}
                    >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="chatting">Chatting</option>
                        <option value="met once">Met Once</option>
                        <option value="on hold">On Hold</option>
                        <option value="ended">Ended</option>
                    </select>
                </div>
            </div>

            {/* Candidates Grid */}
            {filteredCandidates.length === 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem 2rem',
                    border: '2px dashed var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                }}>
                    <div style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--primary-light)',
                        marginBottom: '1rem',
                    }}>
                        <Users size={36} style={{ color: 'var(--primary)' }} />
                    </div>
                    <p className="font-semibold text-lg" style={{ color: 'var(--text-main)', marginBottom: '0.25rem' }}>No candidates found</p>
                    <p className="text-sm text-muted" style={{ marginBottom: '1rem' }}>Try adjusting your search or add a new candidate.</p>
                    <Button variant="primary" onClick={onAddCandidate} className="gap-2">
                        <Plus size={18} /> Add your first match
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-5 stagger-children">
                    {filteredCandidates.map(candidate => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            onClick={onCandidateClick}
                            onDelete={deleteCandidate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

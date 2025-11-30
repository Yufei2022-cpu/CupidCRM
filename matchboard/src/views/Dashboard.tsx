import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { CandidateCard } from '../components/CandidateCard';
import { Button } from '../components/Button';
import { Plus, Search, Filter } from 'lucide-react';

interface DashboardProps {
    onCandidateClick: (id: string) => void;
    onAddCandidate: () => void;
}

export function Dashboard({ onCandidateClick, onAddCandidate }: DashboardProps) {
    const { data, deleteCandidate } = useStore();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredCandidates = data.candidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.city.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-8 flex flex-col gap-8 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-bold tracking-tight" style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Candidates</h1>
                    <p className="text-muted mt-1 text-lg">Manage your relationships and dates.</p>
                </div>
                <Button onClick={onAddCandidate} size="lg" className="shadow-lg">
                    <Plus size={20} style={{ marginRight: '0.5rem' }} /> Add Candidate
                </Button>
            </div>

            <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200" style={{ borderColor: 'var(--border)' }}>
                <div className="flex-1 relative">
                    <Search size={20} className="text-muted absolute left-3 top-1/2 transform -translate-y-1/2" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Search by name or city..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10"
                        style={{
                            paddingLeft: '2.5rem',
                            border: 'none',
                            backgroundColor: 'transparent',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>
                <div className="w-px h-8 bg-gray-200" style={{ backgroundColor: 'var(--border)' }}></div>
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-muted" />
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        style={{
                            minWidth: '180px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                            cursor: 'pointer',
                            outline: 'none'
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

            {filteredCandidates.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-muted border-2 border-dashed rounded-lg" style={{ borderColor: 'var(--border)' }}>
                    <div className="p-4 rounded-full bg-gray-50 mb-4">
                        <Search size={32} className="text-gray-300" />
                    </div>
                    <p className="text-lg font-medium">No candidates found.</p>
                    <p className="text-sm">Try adjusting your search or add a new candidate.</p>
                    <Button variant="ghost" onClick={onAddCandidate} className="mt-4">Add your first match</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

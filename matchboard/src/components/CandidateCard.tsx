import React from 'react';
import { type Candidate } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';
import { MapPin, Briefcase, Trash2 } from 'lucide-react';

interface CandidateCardProps {
    candidate: Candidate;
    onClick: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function CandidateCard({ candidate, onClick, onDelete }: CandidateCardProps) {
    return (
        <div onClick={() => onClick(candidate.id)} style={{ cursor: 'pointer' }} className="group relative">
            <Card className="flex flex-col gap-4 h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div
                            style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #F43F5E 0%, #FDA4AF 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: 'white',
                                boxShadow: '0 4px 10px rgba(244, 63, 94, 0.2)'
                            }}
                        >
                            {candidate.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{candidate.name}, {candidate.age}</h3>
                            <div className="flex items-center gap-1.5 text-sm text-muted mt-1">
                                <MapPin size={14} /> {candidate.city}
                            </div>
                        </div>
                    </div>
                    <Badge color={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted bg-slate-50 p-2 rounded-md" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <Briefcase size={14} /> <span className="font-medium">{candidate.job}</span>
                </div>

                {candidate.notesSummary && (
                    <p className="text-sm text-muted leading-relaxed" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {candidate.notesSummary}
                    </p>
                )}

                <div className="flex gap-2 flex-wrap mt-auto pt-2">
                    {candidate.tags.map(tag => (
                        <Badge key={tag.id} color={tag.color} variant="solid">{tag.label}</Badge>
                    ))}
                </div>

                {onDelete && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(candidate.id);
                            }}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete candidate"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'new': return '#3B82F6'; // Blue
        case 'chatting': return '#8B5CF6'; // Purple
        case 'met once': return '#F59E0B'; // Amber
        case 'on hold': return '#6B7280'; // Gray
        case 'ended': return '#EF4444'; // Red
        default: return '#6B7280';
    }
}

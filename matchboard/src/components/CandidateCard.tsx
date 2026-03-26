import { type Candidate } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';
import { formatRelativeTime } from '../lib/utils';
import { MapPin, Briefcase, Trash2, Clock } from 'lucide-react';

interface CandidateCardProps {
    candidate: Candidate;
    onClick: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function CandidateCard({ candidate, onClick, onDelete }: CandidateCardProps) {
    const statusColor = getStatusColor(candidate.status);

    return (
        <div
            onClick={() => onClick(candidate.id)}
            style={{ cursor: 'pointer', position: 'relative', flexShrink: 0, display: 'flex', flexDirection: 'column' }}
            className="group"
        >
            <Card className="flex flex-col gap-4 flex-1" style={{
                borderLeft: `3px solid ${statusColor}`,
            }}>
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'white',
                                boxShadow: '0 4px 10px rgba(var(--primary-rgb), 0.2)',
                                flexShrink: 0,
                            }}
                        >
                            {candidate.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold leading-tight" style={{ fontSize: '1.05rem' }}>{candidate.name}, {candidate.age}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted" style={{ marginTop: '2px' }}>
                                <MapPin size={13} /> {candidate.city}
                            </div>
                        </div>
                    </div>
                    <Badge color={statusColor} size="sm">{candidate.status}</Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted" style={{
                    backgroundColor: 'var(--bg-app)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                }}>
                    <Briefcase size={14} /> <span className="font-medium">{candidate.job}</span>
                </div>

                {candidate.notesSummary && (
                    <p className="text-sm text-muted" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.5,
                    }}>
                        {candidate.notesSummary}
                    </p>
                )}

                <div className="flex justify-between items-end mt-auto gap-4" style={{ paddingTop: '0.25rem' }}>
                    <div className="flex gap-2 flex-wrap">
                        {candidate.tags.map(tag => (
                            <Badge key={tag.id} color={tag.color} variant="solid" size="sm">{tag.label}</Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 text-muted" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }} title="Last Active">
                        <Clock size={12} /> {formatRelativeTime(candidate.updatedAt)}
                    </div>
                </div>

                {onDelete && (
                    <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        opacity: 0,
                        transition: 'var(--transition)',
                    }} className="group-hover-visible">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm('Delete this candidate?')) {
                                    onDelete(candidate.id);
                                }
                            }}
                            style={{
                                padding: '0.375rem',
                                color: 'var(--text-light)',
                                borderRadius: 'var(--radius-sm)',
                                transition: 'var(--transition)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = 'var(--danger-light)';
                                e.currentTarget.style.color = 'var(--danger)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-light)';
                            }}
                            title="Delete candidate"
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'new': return '#3B82F6';
        case 'chatting': return '#8B5CF6';
        case 'met once': return '#F59E0B';
        case 'on hold': return '#6B7280';
        case 'ended': return '#64748B';
        default: return '#6B7280';
    }
}

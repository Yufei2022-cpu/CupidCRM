import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { CandidateCard } from '../components/CandidateCard';
import { Badge } from '../components/Badge';
import { ScrollText, FileJson, FileText, Users, TrendingUp, UserPlus, Heart } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '../components/Button';
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay, useDroppable, useDraggable } from '@dnd-kit/core';

// --- Custom Draggable Wrapper ---
function DraggableCandidateCard({ candidate, onClick, onDelete }: any) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: candidate.id,
        data: candidate,
    });

    return (
        <div 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes}
            style={{ 
                opacity: isDragging ? 0.4 : 1,
                cursor: isDragging ? 'grabbing' : 'grab',
                // Keep the original layout behavior:
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CandidateCard
                candidate={candidate}
                onClick={onClick}
                onDelete={onDelete}
            />
        </div>
    );
}

// --- Custom Droppable Column ---
function DroppableColumn({ column, candidates, onCandidateClick, deleteCandidate }: any) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
    });

    return (
        <div key={column.id} style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Column Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius)',
                backgroundColor: isOver ? 'var(--primary-light)' : 'var(--bg-card)',
                border: isOver ? '1px dashed var(--primary)' : '1px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'var(--transition)',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: column.gradient,
                }} />
                <span className="font-bold" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{column.label}</span>
                <Badge color={column.color} variant="solid" size="sm">{candidates.length}</Badge>
            </div>

            {/* Column Content */}
            <div ref={setNodeRef} style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                paddingRight: '4px',
                paddingBottom: '2rem', // Buffer for dragging to bottom
            }}>
                {candidates.map((candidate: any) => (
                    <DraggableCandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onClick={onCandidateClick}
                        onDelete={deleteCandidate}
                    />
                ))}
                {candidates.length === 0 && (
                    <div style={{
                        height: '80px',
                        border: '2px dashed var(--border)',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-light)',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                    }}>
                        Drop here
                    </div>
                )}
            </div>
        </div>
    );
}

interface OverviewProps {
    onCandidateClick: (id: string) => void;
}

const COLUMNS = [
    { id: 'new', label: 'New', color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)' },
    { id: 'chatting', label: 'Chatting', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
    { id: 'met once', label: 'Met Once', color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)' },
    { id: 'on hold', label: 'On Hold', color: '#6B7280', gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)' },
    { id: 'ended', label: 'Ended', color: '#64748B', gradient: 'linear-gradient(135deg, #64748B, #94A3B8)' },
];

export function Overview({ onCandidateClick }: OverviewProps) {
    const { data, updateCandidate, deleteCandidate } = useStore();
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // allows clicking to pass through without initiating drag immediately
            },
        })
    );

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        setActiveId(null);
        
        if (over && active.data.current?.status !== over.id) {
            updateCandidate(active.id, { status: over.id as any });
        }
    };

    const activeCandidate = activeId ? data.candidates.find(c => c.id === activeId) : null;

    const totalCandidates = data.candidates.length;
    const activeCandidates = data.candidates.filter(c => c.status !== 'ended' && c.status !== 'on hold').length;

    const handleExportJSON = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `matchboard_data_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(92, 138, 114);
        doc.text('MatchBoard Report', 14, 22);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

        const tableData = data.candidates.map(c => [
            c.name, c.age.toString(), c.job, c.city, c.status.toUpperCase(), c.notesSummary || '-'
        ]);

        autoTable(doc, {
            head: [['Name', 'Age', 'Job', 'City', 'Status', 'Notes']],
            body: tableData,
            startY: 40,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [92, 138, 114] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
        });

        doc.save(`matchboard_report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    // Stat cards data
    const stats = [
        { label: 'Total', value: totalCandidates, icon: Users, color: 'var(--primary)' },
        { label: 'Active', value: activeCandidates, icon: TrendingUp, color: '#3B82F6' },
        { label: 'New', value: data.candidates.filter(c => c.status === 'new').length, icon: UserPlus, color: '#10B981' },
        { label: 'Met', value: data.candidates.filter(c => c.status === 'met once').length, icon: Heart, color: '#F59E0B' },
    ];

    return (
        <div className="p-8 h-full flex flex-col gap-6 animate-fade-in overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between" style={{ paddingBottom: '0.5rem' }}>
                <div className="flex items-center gap-4">
                    <div style={{
                        padding: '0.625rem',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ScrollText size={28} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                        <h1 className="font-bold tracking-tight" style={{ fontSize: '1.85rem', color: 'var(--text-main)', lineHeight: 1.1 }}>Overview</h1>
                        <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.25rem' }}>Pipeline view of your relationships.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleExportJSON} className="gap-2">
                        <FileJson size={18} /> Export JSON
                    </Button>
                    <Button variant="primary" onClick={handleExportPDF} className="gap-2">
                        <FileText size={18} /> Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 stagger-children">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="stat-card" style={{ borderTop: 'none' }}>
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
                                    <p className="font-bold" style={{ fontSize: '1.75rem', lineHeight: 1.2, color: 'var(--text-main)' }}>{stat.value}</p>
                                </div>
                                <div style={{
                                    padding: '0.625rem',
                                    borderRadius: 'var(--radius)',
                                    backgroundColor: `${stat.color}12`,
                                }}>
                                    <Icon size={22} style={{ color: stat.color }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Kanban Board */}
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex gap-5 overflow-x-auto pb-4" style={{ flex: 1, minHeight: 0 }}>
                    {COLUMNS.map(column => {
                        const candidates = data.candidates.filter(c => c.status === column.id);
                        return (
                            <DroppableColumn 
                                key={column.id}
                                column={column}
                                candidates={candidates}
                                onCandidateClick={onCandidateClick}
                                deleteCandidate={deleteCandidate}
                            />
                        );
                    })}
                </div>

                <DragOverlay dropAnimation={{
                    duration: 250,
                    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                }}>
                    {activeCandidate ? (
                        <div style={{ transform: 'rotate(2deg)', boxShadow: 'var(--shadow-xl)' }}>
                            <CandidateCard
                                candidate={activeCandidate}
                                onClick={() => {}}
                            />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

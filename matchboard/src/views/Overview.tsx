import React from 'react';
import { useStore } from '../hooks/useStore';
import { CandidateCard } from '../components/CandidateCard';
import { Badge } from '../components/Badge';
import { ScrollText, FileJson, FileText, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '../components/Button';

interface OverviewProps {
    onCandidateClick: (id: string) => void;
}

const COLUMNS = [
    { id: 'new', label: 'New', color: '#3B82F6' },
    { id: 'chatting', label: 'Chatting', color: '#8B5CF6' },
    { id: 'met once', label: 'Met Once', color: '#F59E0B' },
    { id: 'on hold', label: 'On Hold', color: '#6B7280' },
    { id: 'ended', label: 'Ended', color: '#EF4444' },
];

export function Overview({ onCandidateClick }: OverviewProps) {
    const { data, deleteCandidate } = useStore();

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

        // Title
        doc.setFontSize(20);
        doc.setTextColor(225, 29, 72); // Rose-600
        doc.text('MatchBoard Report', 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

        // Candidates Table
        const tableData = data.candidates.map(c => [
            c.name,
            c.age.toString(),
            c.job,
            c.city,
            c.status.toUpperCase(),
            c.notesSummary || '-'
        ]);

        autoTable(doc, {
            head: [['Name', 'Age', 'Job', 'City', 'Status', 'Notes']],
            body: tableData,
            startY: 40,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [225, 29, 72] }, // Rose-600
            alternateRowStyles: { fillColor: [255, 241, 242] }, // Rose-50
        });

        doc.save(`matchboard_report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="p-8 h-full flex flex-col gap-6 animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50" style={{ backgroundColor: '#EEF2FF' }}>
                        <ScrollText size={24} className="text-indigo-500" />
                    </div>
                    <div>
                        <h1 className="font-bold tracking-tight" style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Overview</h1>
                        <p className="text-muted text-lg">Pipeline view of your relationships.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleExportJSON} className="gap-2">
                        <FileJson size={18} />
                        Export JSON
                    </Button>
                    <Button variant="primary" onClick={handleExportPDF} className="gap-2">
                        <FileText size={18} />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 h-full">
                {COLUMNS.map(column => {
                    const candidates = data.candidates.filter(c => c.status === column.id);

                    return (
                        <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                                <span className="font-bold text-slate-700">{column.label}</span>
                                <Badge color={column.color} variant="solid">{candidates.length}</Badge>
                            </div>

                            <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
                                {candidates.map(candidate => (
                                    <CandidateCard
                                        key={candidate.id}
                                        candidate={candidate}
                                        onClick={onCandidateClick}
                                        onDelete={deleteCandidate}
                                    />
                                ))}
                                {candidates.length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                                        Empty
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

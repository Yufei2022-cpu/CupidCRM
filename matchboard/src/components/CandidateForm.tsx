import React, { useState } from 'react';
import { type Candidate, type Tag } from '../types';
import { Input } from './Input';
import { TextArea } from './Input';
import { Select } from './Select';
import { Badge } from './Badge';
import { Button } from './Button';
import { User, MapPin, Briefcase, MessageSquare } from 'lucide-react';

interface CandidateFormProps {
    initialData?: Partial<Candidate>;
    availableTags: Tag[];
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export function CandidateForm({ initialData, availableTags, onSubmit, onCancel }: CandidateFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        age: initialData?.age || '',
        city: initialData?.city || '',
        job: initialData?.job || '',
        status: initialData?.status || 'new',
        notesSummary: initialData?.notesSummary || '',
        tags: initialData?.tags || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            age: Number(formData.age),
        });
    };

    const toggleTag = (tag: Tag) => {
        const hasTag = formData.tags.some(t => t.id === tag.id);
        if (hasTag) {
            setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t.id !== tag.id) }));
        } else {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Section: Basic Info */}
            <div>
                <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
                    <User size={16} style={{ color: 'var(--primary)' }} />
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-main)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Basic Info</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Name"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        placeholder="e.g. Sarah Jenkins"
                    />
                    <Select
                        label="Status"
                        value={formData.status}
                        onChange={(val: string) => setFormData(prev => ({ ...prev, status: val as any }))}
                        options={[
                            { value: 'new', label: 'New', color: '#3B82F6' },
                            { value: 'chatting', label: 'Chatting', color: '#8B5CF6' },
                            { value: 'met once', label: 'Met Once', color: '#F59E0B' },
                            { value: 'on hold', label: 'On Hold', color: '#6B7280' },
                            { value: 'ended', label: 'Ended', color: '#64748B' },
                        ]}
                    />
                </div>
            </div>

            {/* Section: Details */}
            <div>
                <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
                    <MapPin size={16} style={{ color: 'var(--primary)' }} />
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-main)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Details</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-3">
                        <Input
                            label="Age"
                            type="number"
                            value={formData.age}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                            style={{ width: '45%' }}
                            placeholder="25"
                        />
                        <Input
                            label="City"
                            value={formData.city}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            style={{ flex: 1 }}
                            placeholder="e.g. New York"
                        />
                    </div>
                    <Input
                        label="Job / Occupation"
                        value={formData.job}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, job: e.target.value }))}
                        placeholder="e.g. Product Designer"
                    />
                </div>
            </div>

            {/* Section: Summary */}
            <div>
                <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
                    <MessageSquare size={16} style={{ color: 'var(--primary)' }} />
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-main)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Quick Summary</span>
                </div>
                <TextArea
                    value={formData.notesSummary}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, notesSummary: e.target.value }))}
                    placeholder="First impressions, interests, vibe..."
                    style={{ minHeight: '90px' }}
                />
            </div>

            {/* Section: Tags */}
            <div>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                    <Briefcase size={16} style={{ color: 'var(--primary)' }} />
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-main)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Tags</span>
                </div>
                <div className="flex flex-wrap gap-2" style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius)',
                    border: '1px dashed var(--border)',
                    backgroundColor: 'var(--bg-app)',
                }}>
                    {availableTags.map(tag => {
                        const isSelected = formData.tags.some(t => t.id === tag.id);
                        return (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                style={{
                                    opacity: isSelected ? 1 : 0.5,
                                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'var(--transition-spring)',
                                }}
                            >
                                <Badge color={tag.color} variant={isSelected ? 'solid' : 'outline'} size="md">
                                    {isSelected ? '✓ ' : ''}{tag.label}
                                </Badge>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3" style={{
                marginTop: '0.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border)',
            }}>
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Candidate</Button>
            </div>
        </form>
    );
}

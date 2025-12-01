import React, { useState } from 'react';
import { type Candidate, type Tag } from '../types';
import { Input } from './Input';
import { TextArea } from './Input';
import { Select } from './Select';
import { Badge } from './Badge';
import { Button } from './Button';

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2">
            <div className="grid grid-cols-2 gap-6">
                <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="e.g. Sarah Jenkins"
                />

                <div className="flex flex-col gap-1.5">
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

            <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-4">
                    <Input
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        className="w-1/3"
                        placeholder="25"
                    />
                    <Input
                        label="City"
                        value={formData.city}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="flex-1"
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

            <TextArea
                label="Quick Summary"
                value={formData.notesSummary}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, notesSummary: e.target.value }))}
                placeholder="First impressions, interests, vibe..."
            />

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-muted ml-1">Tags</label>
                <div className="flex flex-wrap gap-2 p-4 rounded-lg border border-dashed" style={{ borderColor: 'var(--border)' }}>
                    {availableTags.map(tag => {
                        const isSelected = formData.tags.some(t => t.id === tag.id);
                        return (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                style={{
                                    opacity: isSelected ? 1 : 0.6,
                                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Badge color={tag.color} variant={isSelected ? 'solid' : 'outline'}>
                                    {tag.label}
                                </Badge>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit" className="shadow-md">Save Candidate</Button>
            </div>
        </form>
    );
}

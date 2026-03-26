import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
    color?: string;
}

interface SelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    className?: string;
    placeholder?: string;
}

export function Select({ label, value, onChange, options, className = '', placeholder = 'Select...' }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`flex flex-col gap-2 ${className}`} ref={containerRef}>
            {label && <label className="text-sm font-semibold" style={{ color: 'var(--text-muted)', marginLeft: '2px', letterSpacing: '0.02em' }}>{label}</label>}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius)',
                        border: `1px solid ${isOpen ? 'var(--primary)' : 'var(--border)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'var(--transition)',
                        outline: 'none',
                        backgroundColor: isOpen ? 'white' : 'var(--bg-card)',
                        boxShadow: isOpen ? '0 0 0 3px var(--primary-light)' : 'var(--shadow-xs)',
                    }}
                    onMouseEnter={e => {
                        if (!isOpen) {
                            e.currentTarget.style.borderColor = 'var(--border-hover)';
                        }
                    }}
                    onMouseLeave={e => {
                        if (!isOpen) {
                            e.currentTarget.style.borderColor = 'var(--border)';
                        }
                    }}
                >
                    <div className="flex items-center gap-2">
                        {selectedOption?.color && (
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: selectedOption.color,
                                boxShadow: `0 0 6px ${selectedOption.color}40`
                            }} />
                        )}
                        <span className="font-medium" style={{
                            color: selectedOption ? 'var(--text-main)' : 'var(--text-light)',
                            fontSize: '0.95rem'
                        }}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    </div>
                    <ChevronDown
                        size={18}
                        style={{
                            color: isOpen ? 'var(--primary)' : 'var(--text-light)',
                            transition: 'transform 0.25s ease, color 0.2s',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    />
                </button>

                {isOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '6px',
                        backgroundColor: 'var(--glass-bg)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-xl)',
                        border: '1px solid var(--border)',
                        zIndex: 50,
                        overflow: 'hidden',
                        animation: 'scaleIn 0.15s ease-out',
                    }}>
                        <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '4px' }}>
                            {options.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 0.875rem',
                                        borderRadius: 'var(--radius-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        fontSize: '0.925rem',
                                        transition: 'var(--transition-fast)',
                                        marginBottom: '2px',
                                        backgroundColor: option.value === value ? 'var(--primary-light)' : 'transparent',
                                        color: option.value === value ? 'var(--primary-dark)' : 'var(--text-main)',
                                        fontWeight: option.value === value ? 600 : 400,
                                    }}
                                    onMouseEnter={e => {
                                        if (option.value !== value) {
                                            e.currentTarget.style.backgroundColor = 'var(--bg-app)';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (option.value !== value) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        {option.color && (
                                            <div style={{
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                backgroundColor: option.color,
                                                boxShadow: `0 0 6px ${option.color}40`
                                            }} />
                                        )}
                                        {option.label}
                                    </div>
                                    {option.value === value && <Check size={16} style={{ color: 'var(--primary)' }} />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

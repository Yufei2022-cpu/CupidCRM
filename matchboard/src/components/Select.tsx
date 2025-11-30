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
            {label && <label className="text-base font-bold text-slate-700 ml-1 tracking-wide">{label}</label>}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-200 outline-none shadow-sm ${isOpen
                        ? 'border-rose-500 ring-4 ring-rose-100 bg-white'
                        : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-rose-200'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        {selectedOption?.color && (
                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: selectedOption.color }} />
                        )}
                        <span className={`font-medium text-lg ${selectedOption ? 'text-slate-900' : 'text-slate-400'}`}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    </div>
                    <ChevronDown
                        size={20}
                        className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-rose-500' : ''}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top">
                        <div className="max-h-64 overflow-y-auto p-1.5 custom-scrollbar">
                            {options.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full p-3.5 rounded-lg flex items-center justify-between text-base transition-all duration-150 mb-0.5 ${option.value === value
                                        ? 'bg-rose-50 text-rose-700 font-bold shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {option.color && (
                                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: option.color }} />
                                        )}
                                        {option.label}
                                    </div>
                                    {option.value === value && <Check size={20} className="text-rose-500" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

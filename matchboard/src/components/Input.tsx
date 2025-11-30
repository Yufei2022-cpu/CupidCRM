import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', style, ...props }: InputProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`} style={style}>
            {label && <label className="text-sm font-semibold text-muted ml-1">{label}</label>}
            <input
                className="w-full"
                style={{
                    borderColor: error ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: 'var(--bg-card)',
                }}
                {...props}
            />
            {error && <span className="text-sm" style={{ color: 'var(--primary)' }}>{error}</span>}
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function TextArea({ label, error, className = '', style, ...props }: TextAreaProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`} style={style}>
            {label && <label className="text-sm font-semibold text-muted ml-1">{label}</label>}
            <textarea
                className="w-full"
                style={{
                    borderColor: error ? 'var(--primary)' : 'var(--border)',
                    minHeight: '120px',
                    backgroundColor: 'var(--bg-card)',
                    resize: 'vertical'
                }}
                {...props}
            />
            {error && <span className="text-sm" style={{ color: 'var(--primary)' }}>{error}</span>}
        </div>
    );
}

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', style, ...props }: InputProps) {
    return (
        <div className={`flex flex-col gap-1 ${className}`} style={style}>
            {label && (
                <label className="text-sm font-semibold" style={{ color: 'var(--text-muted)', marginLeft: '2px', letterSpacing: '0.02em' }}>
                    {label}
                </label>
            )}
            <input
                className="w-full"
                style={{
                    borderColor: error ? 'var(--danger)' : 'var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius)',
                    transition: 'var(--transition)',
                }}
                {...props}
            />
            {error && <span className="text-sm" style={{ color: 'var(--danger)' }}>{error}</span>}
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function TextArea({ label, error, className = '', style, ...props }: TextAreaProps) {
    return (
        <div className={`flex flex-col gap-1 ${className}`} style={style}>
            {label && (
                <label className="text-sm font-semibold" style={{ color: 'var(--text-muted)', marginLeft: '2px', letterSpacing: '0.02em' }}>
                    {label}
                </label>
            )}
            <textarea
                className="w-full"
                style={{
                    borderColor: error ? 'var(--danger)' : 'var(--border)',
                    minHeight: '120px',
                    backgroundColor: 'var(--bg-card)',
                    resize: 'vertical',
                    borderRadius: 'var(--radius)',
                    transition: 'var(--transition)',
                }}
                {...props}
            />
            {error && <span className="text-sm" style={{ color: 'var(--danger)' }}>{error}</span>}
        </div>
    );
}

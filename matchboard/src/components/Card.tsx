import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function Card({ children, className = '', style }: CardProps) {
    return (
        <div
            className={`p-6 rounded-lg ${className}`}
            style={{
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)',
                transition: 'var(--transition)',
                ...style
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border)';
            }}
        >
            {children}
        </div>
    );
}

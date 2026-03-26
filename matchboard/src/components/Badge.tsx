import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    color?: string;
    variant?: 'solid' | 'outline';
    size?: 'sm' | 'md';
    className?: string;
}

export function Badge({ children, color = 'var(--text-muted)', variant = 'solid', size = 'sm', className = '' }: BadgeProps) {
    const isHex = color.startsWith('#');

    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: { padding: '0.25rem 0.75rem', fontSize: '0.7rem' },
        md: { padding: '0.375rem 1rem', fontSize: '0.8rem' },
    };

    const style: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        borderRadius: '9999px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        backgroundColor: variant === 'solid' ? (isHex ? `${color}20` : color) : 'transparent',
        color: isHex ? color : 'var(--text-main)',
        border: variant === 'outline' ? `1.5px solid ${isHex ? `${color}60` : color}` : '1px solid transparent',
        transition: 'var(--transition)',
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
    };

    return <span style={style} className={className}>{children}</span>;
}

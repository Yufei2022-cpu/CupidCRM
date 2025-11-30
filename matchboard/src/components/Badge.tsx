import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    color?: string; // Hex color
    variant?: 'solid' | 'outline';
}

export function Badge({ children, color = 'var(--text-muted)', variant = 'solid' }: BadgeProps) {
    const isHex = color.startsWith('#');

    const style: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
        backgroundColor: variant === 'solid' ? (isHex ? `${color}15` : color) : 'transparent', // 15% opacity for pastel look
        color: isHex ? color : 'var(--text-main)',
        border: variant === 'outline' ? `1px solid ${color}` : '1px solid transparent',
        transition: 'var(--transition)',
    };

    return <span style={style}>{children}</span>;
}

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    style,
    ...props
}: ButtonProps) {

    const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius)',
        fontWeight: 600,
        transition: 'var(--transition)',
        cursor: 'pointer',
        letterSpacing: '0.01em',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: 'var(--primary)',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(244, 63, 94, 0.3)',
        },
        secondary: {
            backgroundColor: 'white',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
        },
        outline: {
            backgroundColor: 'transparent',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-muted)',
        }
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: { padding: '0.375rem 0.875rem', fontSize: '0.875rem' },
        md: { padding: '0.625rem 1.25rem', fontSize: '0.95rem' },
        lg: { padding: '0.875rem 1.75rem', fontSize: '1.125rem' },
    };

    return (
        <button
            style={{ ...baseStyles, ...variantStyles[variant], ...sizeStyles[size], ...style }}
            className={className}
            onMouseEnter={e => {
                if (variant === 'primary') {
                    e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 8px -1px rgba(244, 63, 94, 0.4)';
                } else if (variant === 'secondary') {
                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-app)';
                } else if (variant === 'ghost') {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                    e.currentTarget.style.color = 'var(--text-main)';
                }
            }}
            onMouseLeave={e => {
                if (variant === 'primary') {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(244, 63, 94, 0.3)';
                } else if (variant === 'secondary') {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.backgroundColor = 'white';
                } else if (variant === 'ghost') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
}

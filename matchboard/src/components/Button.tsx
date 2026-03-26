import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;

    return (
        <button
            className={`btn-base ${variantClass} ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    hoverable?: boolean;
}

export function Card({ children, className = '', style, hoverable = true }: CardProps) {
    return (
        <div
            className={`card-base ${hoverable ? 'card-hoverable' : ''} p-6 ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}

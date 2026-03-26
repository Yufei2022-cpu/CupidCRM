import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                animation: 'fadeIn 0.2s ease-out',
                padding: '2rem',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius-xl)',
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--border)',
                    animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6" style={{ borderBottom: '1px solid var(--border)' }}>
                    <h2 className="font-bold" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>{title}</h2>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem',
                            borderRadius: 'var(--radius)',
                            color: 'var(--text-muted)',
                            transition: 'var(--transition)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-app)';
                            e.currentTarget.style.color = 'var(--text-main)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

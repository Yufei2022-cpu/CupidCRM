import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius)',
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: 'var(--shadow-md)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h2 className="font-bold" style={{ fontSize: '1.25rem' }}>{title}</h2>
                    <button onClick={onClose} className="text-muted hover:text-main">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

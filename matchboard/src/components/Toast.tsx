import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import '../App.css';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const ICONS = {
  success: <CheckCircle2 size={20} style={{ color: '#10B981' }} />,
  error: <AlertCircle size={20} style={{ color: '#EF4444' }} />,
  info: <Info size={20} style={{ color: '#3B82F6' }} />,
};

const BORDERS = {
  success: 'border-l-4 border-[#10B981]',
  error: 'border-l-4 border-[#EF4444]',
  info: 'border-l-4 border-[#3B82F6]',
};

export function Toast({ id, title, message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (duration === Infinity) return;
    
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => onClose(id), 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        padding: '1rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        width: '320px',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
        border: '1px solid var(--border)',
        pointerEvents: 'auto',
        animation: isClosing ? 'slideOutRight 0.3s ease forwards' : 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
      className={BORDERS[type]}
    >
      <div style={{ flexShrink: 0, marginTop: '2px' }}>
        {ICONS[type]}
      </div>
      <div style={{ flex: 1 }}>
        <h4 className="font-bold" style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: message ? '4px' : '0' }}>
          {title}
        </h4>
        {message && (
          <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
            {message}
          </p>
        )}
      </div>
      <button
        onClick={handleClose}
        style={{
          color: 'var(--text-light)',
          padding: '2px',
          borderRadius: 'var(--radius-sm)',
          transition: 'var(--transition)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-app)';
          e.currentTarget.style.color = 'var(--text-main)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-light)';
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

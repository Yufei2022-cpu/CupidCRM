import React from 'react';
import { Heart, Users, Settings, ScrollText, Sparkles } from 'lucide-react';
import '../App.css';

interface LayoutProps {
    children: React.ReactNode;
    currentView: 'dashboard' | 'settings' | 'overview';
    onNavigate: (view: 'dashboard' | 'settings' | 'overview') => void;
}

const NAV_ITEMS = [
    { id: 'overview' as const, label: 'Overview', icon: ScrollText },
    { id: 'dashboard' as const, label: 'Candidates', icon: Users },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
];

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
    return (
        <div className="flex h-screen" style={{ backgroundColor: 'var(--bg-app)' }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: '260px',
                    background: 'linear-gradient(180deg, var(--bg-card) 0%, #f1f7f3 100%)',
                    borderRight: '1px solid var(--border)',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 10,
                }}
            >
                {/* Logo */}
                <div style={{ padding: '1.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        padding: '0.625rem',
                        borderRadius: 'var(--radius)',
                        backgroundColor: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(var(--primary-rgb), 0.15)',
                    }}>
                        <Heart color="var(--primary)" fill="var(--primary)" size={22} />
                    </div>
                    <div>
                        <h1 className="font-bold tracking-tight" style={{ fontSize: '1.35rem', color: 'var(--text-main)', lineHeight: 1.2 }}>MatchBoard</h1>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-light)', letterSpacing: '0.05em', fontWeight: 500 }}>RELATIONSHIP CRM</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 0.75rem', marginTop: '0.5rem' }}>
                    {NAV_ITEMS.map(item => {
                        const isActive = currentView === item.id;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    borderRadius: 'var(--radius)',
                                    transition: 'var(--transition)',
                                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                {/* Active pill indicator */}
                                {isActive && (
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: '20%',
                                        bottom: '20%',
                                        width: '3px',
                                        borderRadius: '0 4px 4px 0',
                                        backgroundColor: 'var(--primary)',
                                        animation: 'fadeSlideIn 0.3s ease-out',
                                    }} />
                                )}
                                <Icon
                                    size={20}
                                    style={{
                                        color: isActive ? 'var(--primary)' : 'var(--text-light)',
                                        transition: 'color 0.2s',
                                    }}
                                />
                                <span style={{
                                    fontWeight: isActive ? 700 : 500,
                                    fontSize: '0.95rem',
                                    color: isActive ? 'var(--primary-dark)' : 'var(--text-muted)',
                                    transition: 'color 0.2s',
                                }}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom branding */}
                <div style={{
                    marginTop: 'auto',
                    padding: '1.25rem 1.5rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    <Sparkles size={14} style={{ color: 'var(--text-light)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>
                        MatchBoard v1.0
                    </span>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: 'var(--bg-app)',
            }}>
                {children}
            </main>
        </div>
    );
}

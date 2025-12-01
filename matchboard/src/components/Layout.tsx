import React from 'react';
import { Heart, Users, Settings, ScrollText } from 'lucide-react';
import '../App.css';

interface LayoutProps {
    children: React.ReactNode;
    currentView: 'dashboard' | 'settings' | 'overview';
    onNavigate: (view: 'dashboard' | 'settings' | 'overview') => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
    return (
        <div className="flex h-screen bg-app">
            {/* Sidebar */}
            <aside
                style={{
                    width: '260px',
                    backgroundColor: 'var(--bg-card)',
                    borderRight: '1px solid var(--border)',
                    position: 'sticky',
                    top: 0,
                    height: '100vh'
                }}
                className="flex-col shadow-sm z-10"
            >
                <div className="p-8 flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary-light)' }}>
                        <Heart color="var(--primary)" fill="var(--primary)" size={24} />
                    </div>
                    <h1 className="font-bold tracking-tight" style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>MatchBoard</h1>
                </div>

                <nav className="flex-col gap-4 px-4">
                    <button
                        onClick={() => onNavigate('overview')}
                        className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 group ${currentView === 'overview'
                            ? 'shadow-sm'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        style={currentView === 'overview' ? { backgroundColor: 'var(--primary-light)', color: 'var(--primary)' } : {}}
                    >
                        <ScrollText
                            size={24}
                            className={`transition-colors ${currentView === 'overview' ? '' : 'text-slate-400 group-hover:text-slate-600'}`}
                            style={currentView === 'overview' ? { color: 'var(--primary)' } : {}}
                        />
                        <span className={`font-semibold text-lg`} style={currentView === 'overview' ? { color: 'var(--primary-dark)' } : {}}>Overview</span>
                    </button>

                    <button
                        onClick={() => onNavigate('dashboard')}
                        className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 group ${currentView === 'dashboard'
                            ? 'shadow-sm'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        style={currentView === 'dashboard' ? { backgroundColor: 'var(--primary-light)', color: 'var(--primary)' } : {}}
                    >
                        <Users
                            size={24}
                            className={`transition-colors ${currentView === 'dashboard' ? '' : 'text-slate-400 group-hover:text-slate-600'}`}
                            style={currentView === 'dashboard' ? { color: 'var(--primary)' } : {}}
                        />
                        <span className={`font-semibold text-lg`} style={currentView === 'dashboard' ? { color: 'var(--primary-dark)' } : {}}>Candidates</span>
                    </button>

                    <button
                        onClick={() => onNavigate('settings')}
                        className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 group ${currentView === 'settings'
                            ? 'shadow-sm'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        style={currentView === 'settings' ? { backgroundColor: 'var(--primary-light)', color: 'var(--primary)' } : {}}
                    >
                        <Settings
                            size={24}
                            className={`transition-colors ${currentView === 'settings' ? '' : 'text-slate-400 group-hover:text-slate-600'}`}
                            style={currentView === 'settings' ? { color: 'var(--primary)' } : {}}
                        />
                        <span className={`font-semibold text-lg`} style={currentView === 'settings' ? { color: 'var(--primary-dark)' } : {}}>Settings</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-hidden" style={{ backgroundColor: 'var(--bg-app)' }}>
                <div className="h-full w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

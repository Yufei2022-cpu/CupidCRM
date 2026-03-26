import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { CandidateDetail } from './views/CandidateDetail';
import { Modal } from './components/Modal';
import { CandidateForm } from './components/CandidateForm';
import { Overview } from './views/Overview';
import { useStore } from './hooks/useStore';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { Settings, Trash2, Info, Heart, Database, Download, Tag as TagIcon, Plus } from 'lucide-react';
import { Input } from './components/Input';
import { Select } from './components/Select';
import { Badge } from './components/Badge';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings' | 'overview'>('overview');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTagLabel, setNewTagLabel] = useState('');
  const [newTagColor, setNewTagColor] = useState('#f87171');
  const { data, addCandidate, addTag, removeTag } = useStore();

  const handleNavigate = (view: 'dashboard' | 'settings' | 'overview') => {
    setCurrentView(view);
    setSelectedCandidateId(null);
  };

  const handleAddCustomTag = () => {
    if (!newTagLabel.trim()) return;
    addTag({ label: newTagLabel.trim(), color: newTagColor });
    setNewTagLabel('');
  };

  const handleCandidateClick = (id: string) => {
    setSelectedCandidateId(id);
  };

  const handleAddCandidate = (candidateData: any) => {
    addCandidate(candidateData);
    setIsAddModalOpen(false);
    setCurrentView('dashboard');
  };

  if (selectedCandidateId) {
    return (
      <Layout currentView={currentView} onNavigate={handleNavigate}>
        <CandidateDetail
          candidateId={selectedCandidateId}
          onBack={() => setSelectedCandidateId(null)}
        />
      </Layout>
    );
  }

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate}>
      {currentView === 'overview' && (
        <Overview onCandidateClick={handleCandidateClick} />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          onCandidateClick={handleCandidateClick}
          onAddCandidate={() => setIsAddModalOpen(true)}
        />
      )}

      {currentView === 'settings' && (
        <div className="p-8 animate-fade-in" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '0.25rem' }}>
              <div style={{
                padding: '0.625rem',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--primary-light)',
              }}>
                <Settings size={24} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h1 className="font-bold tracking-tight" style={{ fontSize: '1.75rem' }}>Settings</h1>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>Manage your data and preferences.</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Card hoverable={false} className="p-6" style={{ marginBottom: '1rem' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
              <Info size={18} style={{ color: 'var(--primary)' }} />
              <h2 className="font-bold text-lg">About</h2>
            </div>
            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
              <div style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--primary-light)',
              }}>
                <Heart size={20} fill="var(--primary)" color="var(--primary)" />
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: '1.1rem' }}>MatchBoard</p>
                <p className="text-sm text-muted">Version 1.0 — Relationship Tracker</p>
              </div>
            </div>
            <p className="text-sm text-muted" style={{ lineHeight: 1.6 }}>
              A beautiful CRM for managing your dating pipeline. Track candidates,
              log interactions, take notes, and export your data anytime.
            </p>
          </Card>

          {/* Tag Management Section */}
          <Card hoverable={false} className="p-6" style={{ marginBottom: '1rem' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
              <TagIcon size={18} style={{ color: 'var(--primary)' }} />
              <h2 className="font-bold text-lg">Tag Management</h2>
            </div>
            <p className="text-sm text-muted" style={{ marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Create custom colored tags to organize your candidates.
            </p>
            
            <div className="flex gap-3 items-end" style={{ marginBottom: '1.5rem' }}>
              <div style={{ flex: 2 }}>
                <Input 
                  label="Tag Label" 
                  value={newTagLabel} 
                  onChange={(e) => setNewTagLabel(e.target.value)} 
                  placeholder="e.g. VIP, Dancer" 
                />
              </div>
              <div style={{ flex: 1 }}>
                <Select 
                  label="Color" 
                  value={newTagColor} 
                  onChange={setNewTagColor}
                  options={[
                    { value: '#f87171', label: 'Red', color: '#f87171' },
                    { value: '#fbbf24', label: 'Yellow', color: '#fbbf24' },
                    { value: '#34d399', label: 'Green', color: '#34d399' },
                    { value: '#60a5fa', label: 'Blue', color: '#60a5fa' },
                    { value: '#c084fc', label: 'Purple', color: '#c084fc' },
                    { value: '#9ca3af', label: 'Gray', color: '#9ca3af' }
                  ]}
                />
              </div>
              <Button onClick={handleAddCustomTag} disabled={!newTagLabel.trim()} className="gap-2 h-10">
                <Plus size={16} /> Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.tags.map(tag => (
                <Badge key={tag.id} color={tag.color} className="flex items-center gap-1.5 px-3 py-1.5">
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{tag.label}</span>
                  <div 
                    onClick={() => {
                       if (confirm(`Delete tag "${tag.label}"? This removes it from all candidates.`)) {
                           removeTag(tag.id);
                       }
                    }} 
                    style={{ cursor: 'pointer', opacity: 0.6, display: 'flex', alignItems: 'center' }}
                    className="hover:opacity-100 transition-opacity"
                    title="Delete Tag"
                  >
                    <Trash2 size={14} />
                  </div>
                </Badge>
              ))}
            </div>
          </Card>

          {/* Data Section */}
          <Card hoverable={false} className="p-6" style={{ marginBottom: '1rem' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
              <Database size={18} style={{ color: 'var(--primary)' }} />
              <h2 className="font-bold text-lg">Data</h2>
            </div>
            <div className="flex items-center justify-between" style={{
              padding: '0.875rem 1rem',
              backgroundColor: 'var(--bg-app)',
              borderRadius: 'var(--radius)',
              marginBottom: '0.75rem',
            }}>
              <div>
                <p className="font-medium text-sm">Local Storage</p>
                <p className="text-xs text-muted">All data is stored locally in your browser.</p>
              </div>
              <p className="font-bold text-primary">{data.candidates.length} candidates</p>
            </div>
            <Button variant="outline" className="gap-2 w-full" onClick={() => {
              const jsonString = JSON.stringify(data, null, 2);
              const blob = new Blob([jsonString], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `matchboard_backup_${new Date().toISOString().split('T')[0]}.json`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              <Download size={16} /> Download Backup
            </Button>
          </Card>

          {/* Danger Zone */}
          <Card hoverable={false} className="p-6" style={{
            border: '1px solid #FCA5A5',
            backgroundColor: '#FFF7F7',
          }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
              <Trash2 size={18} style={{ color: 'var(--danger)' }} />
              <h2 className="font-bold text-lg" style={{ color: 'var(--danger)' }}>Danger Zone</h2>
            </div>
            <p className="text-sm text-muted" style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
              Permanently delete all your data. This will remove all candidates,
              notes, and interactions. This action cannot be undone.
            </p>
            <Button variant="danger" onClick={() => {
              if (confirm('⚠️ Are you sure you want to clear ALL data?\n\nThis will delete all candidates, notes, and interactions.\nThis action cannot be undone.')) {
                localStorage.removeItem('matchboard_data');
                window.location.reload();
              }
            }} className="gap-2">
              <Trash2 size={16} /> Clear All Data
            </Button>
          </Card>
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Candidate"
      >
        <CandidateForm
          availableTags={data.tags}
          onSubmit={handleAddCandidate}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
}

export default App;

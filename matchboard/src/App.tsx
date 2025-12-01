import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { CandidateDetail } from './views/CandidateDetail';
import { Modal } from './components/Modal';
import { CandidateForm } from './components/CandidateForm';
import { Overview } from './views/Overview';
import { useStore } from './hooks/useStore';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings' | 'overview'>('overview');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, addCandidate } = useStore();

  const handleNavigate = (view: 'dashboard' | 'settings' | 'overview') => {
    setCurrentView(view);
    setSelectedCandidateId(null);
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
        <div className="p-8">
          <h1 className="font-bold text-2xl mb-4">Settings</h1>
          <p className="text-muted">Settings functionality coming soon.</p>
          <button
            className="mt-4 px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
            onClick={() => {
              if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                localStorage.removeItem('matchboard_data');
                window.location.reload();
              }
            }}
          >
            Clear All Data
          </button>
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

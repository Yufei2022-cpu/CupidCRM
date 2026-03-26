import React, { createContext, useContext, useState, useEffect } from 'react';
import { type AppData, type Candidate, type Interaction, type Note, type Tag } from '../types';
import { loadData, saveData } from '../lib/storage';
import { generateId } from '../lib/utils';
import { useToast } from '../contexts/ToastContext';

interface StoreContextType {
  data: AppData;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  addInteraction: (interaction: Omit<Interaction, 'id'>) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  removeTag: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(loadData);
  const { addToast } = useToast();

  useEffect(() => {
    saveData(data);
  }, [data]);

  const addCandidate = (candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCandidate: Candidate = {
      ...candidate,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, candidates: [newCandidate, ...prev.candidates] }));
    addToast({ type: 'success', title: 'Candidate added', message: `Successfully added ${candidate.name} to the board.` });
  };

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setData(prev => ({
      ...prev,
      candidates: prev.candidates.map(c =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      ),
    }));
    if (updates.status) {
       addToast({ type: 'success', title: 'Status updated', message: `Moved candidate to ${updates.status}.` });
    }
  };

  const deleteCandidate = (id: string) => {
    setData(prev => ({
      ...prev,
      candidates: prev.candidates.filter(c => c.id !== id),
    }));
    addToast({ type: 'error', title: 'Candidate deleted', message: 'Candidate and their data have been removed.' });
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...note,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
    addToast({ type: 'success', title: 'Note saved' });
  };

  const addInteraction = (interaction: Omit<Interaction, 'id'>) => {
    const newInteraction: Interaction = {
      ...interaction,
      id: generateId(),
    };
    setData(prev => ({ ...prev, interactions: [newInteraction, ...prev.interactions] }));
    addToast({ type: 'success', title: 'Interaction logged', message: 'The timeline has been updated.' });
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: generateId(),
    };
    setData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
    addToast({ type: 'success', title: 'Tag added', message: `Custom tag "${tag.label}" created.` });
  };

  const removeTag = (id: string) => {
    setData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t.id !== id),
      candidates: prev.candidates.map(c => ({
        ...c,
        tags: c.tags.filter(t => t.id !== id)
      }))
    }));
    addToast({ type: 'info', title: 'Tag removed', message: 'The tag has been globally deleted.' });
  };

  const value = {
    data,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    addNote,
    addInteraction,
    addTag,
    removeTag,
  };

  return (
    <StoreContext.Provider value= { value } >
    { children }
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

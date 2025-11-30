import React, { createContext, useContext, useState, useEffect } from 'react';
import { type AppData, type Candidate, type Interaction, type Note, type Tag } from '../types';
import { loadData, saveData } from '../lib/storage';
import { generateId } from '../lib/utils';

interface StoreContextType {
  data: AppData;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  addInteraction: (interaction: Omit<Interaction, 'id'>) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(loadData);

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
  };

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setData(prev => ({
      ...prev,
      candidates: prev.candidates.map(c =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      ),
    }));
  };

  const deleteCandidate = (id: string) => {
    setData(prev => ({
      ...prev,
      candidates: prev.candidates.filter(c => c.id !== id),
    }));
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...note,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
  };

  const addInteraction = (interaction: Omit<Interaction, 'id'>) => {
    const newInteraction: Interaction = {
      ...interaction,
      id: generateId(),
    };
    setData(prev => ({ ...prev, interactions: [newInteraction, ...prev.interactions] }));
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: generateId(),
    };
    setData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
  };

  const value = {
    data,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    addNote,
    addInteraction,
    addTag,
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

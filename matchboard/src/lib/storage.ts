import type { AppData, Candidate, Tag } from '../types';
// Keep this if used, or remove if unused. Wait, generateId is NOT used in loadData/saveData.


const STORAGE_KEY = 'matchboard_data';

const INITIAL_TAGS: Tag[] = [
  { id: '1', label: 'Funny', color: '#FCD34D' }, // yellow
  { id: '2', label: 'Family-oriented', color: '#6EE7B7' }, // green
  { id: '3', label: 'Introvert', color: '#93C5FD' }, // blue
  { id: '4', label: 'Extrovert', color: '#F87171' }, // red
  { id: '5', label: 'Ambitious', color: '#C4B5FD' }, // purple
];

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    age: 28,
    gender: 'Female',
    city: 'Munich',
    job: 'UX Designer',
    status: 'chatting',
    tags: [INITIAL_TAGS[0], INITIAL_TAGS[2]],
    notesSummary: 'Loves hiking and coffee.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    age: 31,
    gender: 'Male',
    city: 'Berlin',
    job: 'Software Engineer',
    status: 'met once',
    tags: [INITIAL_TAGS[1], INITIAL_TAGS[4]],
    notesSummary: 'Very polite, good conversation about tech.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_DATA: AppData = {
  candidates: MOCK_CANDIDATES,
  notes: [],
  interactions: [],
  tags: INITIAL_TAGS,
};

export function loadData(): AppData {
  try {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (dataStr) {
      const parsedData = JSON.parse(dataStr);

      // Sanitize data to ensure it matches AppData interface
      // This handles cases where old data might be missing new fields
      const sanitizedData: AppData = {
        candidates: Array.isArray(parsedData.candidates)
          ? parsedData.candidates.map((c: any) => ({
            ...c,
            tags: Array.isArray(c.tags) ? c.tags : [],
            notesSummary: c.notesSummary || '',
            status: c.status || 'new',
          }))
          : [],
        notes: Array.isArray(parsedData.notes) ? parsedData.notes : [],
        interactions: Array.isArray(parsedData.interactions) ? parsedData.interactions : [],
        tags: Array.isArray(parsedData.tags) ? parsedData.tags : INITIAL_TAGS,
      };

      return sanitizedData;
    }
  } catch (e) {
    console.error('Failed to load data', e);
  }
  return INITIAL_DATA;
}

export function saveData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data', e);
  }
}

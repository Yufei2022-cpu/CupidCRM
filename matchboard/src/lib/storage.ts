import type { AppData, Candidate, Tag } from '../types';
// Keep this if used, or remove if unused. Wait, generateId is NOT used in loadData/saveData.


const STORAGE_KEY = 'matchboard_data';

const INITIAL_TAGS: Tag[] = [
  { id: '1', label: 'Funny', color: '#FCD34D' }, // yellow
  { id: '2', label: 'Family-oriented', color: '#6EE7B7' }, // green
  { id: '3', label: 'Introvert', color: '#93C5FD' }, // blue
  { id: '4', label: 'Extrovert', color: '#F87171' }, // red
  { id: '5', label: 'Ambitious', color: '#C4B5FD' }, // purple
  { id: '6', label: 'Long-term', color: '#0EA5E9' }, // sky blue
  { id: '7', label: 'Casual', color: '#EC4899' }, // pink
  { id: '8', label: 'Traveler', color: '#F97316' }, // orange
  { id: '9', label: 'Foodie', color: '#EF4444' }, // red
  { id: '10', label: 'Artistic', color: '#8B5CF6' }, // violet
  { id: '11', label: 'Academic', color: '#6366F1' }, // indigo
  { id: '12', label: 'Pet Lover', color: '#10B981' }, // emerald
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
    tags: [INITIAL_TAGS[0], INITIAL_TAGS[2], INITIAL_TAGS[5]],
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
    tags: [INITIAL_TAGS[1], INITIAL_TAGS[4], INITIAL_TAGS[7]],
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
        tags: Array.isArray(parsedData.tags) ? [...parsedData.tags] : [...INITIAL_TAGS],
      };

      // Ensure all initial tags are present (merge logic)
      INITIAL_TAGS.forEach(initialTag => {
        if (!sanitizedData.tags.some(t => t.label === initialTag.label)) {
          sanitizedData.tags.push(initialTag);
        }
      });

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

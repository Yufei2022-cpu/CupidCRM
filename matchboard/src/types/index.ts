export type Status = 'new' | 'chatting' | 'met once' | 'on hold' | 'ended';

export interface Tag {
    id: string;
    label: string;
    color: string;
}

export interface Note {
    id: string;
    candidateId: string;
    content: string;
    createdAt: string; // ISO string
}

export interface Interaction {
    id: string;
    candidateId: string;
    type: 'call' | 'date' | 'chat';
    summary: string;
    date: string; // ISO string
}

export interface Candidate {
    id: string;
    name: string;
    age: number;
    gender: string;
    city: string;
    job: string;
    status: Status;
    tags: Tag[];
    avatar?: string;
    notesSummary?: string; // Quick summary for dashboard
    createdAt: string;
    updatedAt: string;
}

export interface AppData {
    candidates: Candidate[];
    notes: Note[];
    interactions: Interaction[];
    tags: Tag[];
}

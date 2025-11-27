export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export type Tag = 'work' | 'personal' | 'meeting' | 'shopping' | 'todo';

export interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

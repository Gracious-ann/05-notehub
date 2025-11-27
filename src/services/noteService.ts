import axios from 'axios';
import type { CreateNote, Note } from '../types/note';

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  title: string,
  page: number
): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: {
        search: title,
        page,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNote): Promise<Note> {
  const addNote = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',

    {
      title,
      content,
      tag,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return addNote.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteNote = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return deleteNote.data;
}

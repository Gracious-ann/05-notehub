import axios from 'axios';
import type { CreateNote, Notes } from '../types/note';

interface NotesResponseProps {
  notes: Notes[];
  totalPages: number;
}
interface NoteProps {
  note: Notes;
}

export async function fetchNotes(
  title: string,
  page: number
): Promise<NotesResponseProps> {
  const response = await axios.get(
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
}: CreateNote): Promise<NoteProps> {
  const addNote = await axios.post(
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

export async function deleteNote(id: number): Promise<NoteProps> {
  const deleteNote = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return deleteNote.data;
}

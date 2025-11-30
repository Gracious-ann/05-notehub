import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../services/noteService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutationDeleteNote = useMutation({
    mutationFn: async (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <>
      {mutationDeleteNote.isPending && <Loader />}
      {mutationDeleteNote.isError && (
        <ErrorMessage
          message='Failed to delete note'
          duration={2000}
          onClose={() => mutationDeleteNote.reset()}
        />
      )}
      <ul className={css.list}>
        {notes.map(notes => (
          <li
            key={notes.id}
            className={css.listItem}
          >
            <h2 className={css.title}>{notes.title}</h2>
            <p className={css.content}>{notes.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{notes.tag}</span>
              <button
                onClick={() => mutationDeleteNote.mutate(notes.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NoteList;

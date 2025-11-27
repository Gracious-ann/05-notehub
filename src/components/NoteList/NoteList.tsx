import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  deleteMutation: (id: string) => void;
}

function NoteList({ notes, deleteMutation }: NoteListProps) {
  return (
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
              onClick={() => deleteMutation(notes.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

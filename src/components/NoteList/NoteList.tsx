import type { Notes } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Notes[];
  onDelete: (id: number) => void;
}

function NoteList({ notes, onDelete }: NoteListProps) {
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
              onClick={() => onDelete(notes.id)}
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

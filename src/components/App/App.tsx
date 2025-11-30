import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import { useState } from 'react';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';
// import type { CreateNote } from '../../types/note';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  // const [title, setTitle] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, searchText],
    queryFn: () => fetchNotes(searchText, currentPage),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  // const mutationAddNote = useMutation({
  //   mutationFn: async (values: CreateNote) => createNote(values),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['title'] });
  //   },
  // });

  // const mutationDeleteNote = useMutation({
  //   mutationFn: async (id: string) => deleteNote(id),
  //   onSuccess: () => {
  //     // console.log('delete');
  //     queryClient.invalidateQueries({ queryKey: ['title'] });
  //   },
  // });

  const totalPages = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // function addNote (values: CreateNote) {
  //   mutationAddNote.mutate(values);
  // }

  // function handleDeleteNote(id: string) {
  //   mutationDeleteNote.mutate(id);
  // }

  // const addMutationNote = mutationAddNote.mutateAsync;
  // const deleteMutationNote = mutationDeleteNote.mutateAsync;

  const debouncedSearch = useDebouncedCallback((text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button
          onClick={openModal}
          className={css.button}
        >
          Create note +
        </button>
        {
          <SearchBox
            value={inputValue}
            onSearch={value => {
              setInputValue(value);
              debouncedSearch(value);
            }}
          />
        }
        {isLoading && <Loader />}
        {/* {mutationAddNote.isPending && <Loader />} */}
        {/* {mutationDeleteNote.isPending && <Loader />} */}
        {isError && <ErrorMessage />}
        {/* {mutationAddNote.isError && <ErrorMessage />} */}
        {/* {mutationDeleteNote.isError && <ErrorMessage />} */}
        {totalPages > 1 && (
          <Pagination
            totalPage={totalPages}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        )}
        {isModalOpen && (
          <Modal onCancel={closeModal}>
            <NoteForm onCancel={closeModal} />
          </Modal>
        )}
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default App;

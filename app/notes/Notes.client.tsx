"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import css from "./page.module.css";

export default function NotesClient() {
    const [note, setNote] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
 

  const { data, isLoading } = useQuery({
    queryKey: ["notes", note, currentPage],
    queryFn: () => fetchNotes(note, currentPage),
    placeholderData: keepPreviousData,
  })

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setNote(value);
    setCurrentPage(1);
  }, 300);

    const totalPages = data?.totalPages ?? 0;
    
      return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        { totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> }
        <button onClick={openModal} className={css.button}>Create note +</button>
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>}
      </header>
      {data && !isLoading && <NoteList notes={data.notes}/>}
    </div>
  )
}
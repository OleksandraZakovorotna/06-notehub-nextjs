"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import { fetchNoteById } from "@/app/lib/fetchNoteById";
import { useParams } from "next/navigation";

export default function NoteClient() {

    const params = useParams();
    const id = params.id as string;

    const { data: note, error, isLoading } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id)
    });

    if (isLoading) return <p>Loading, please wait...</p>

    if (error || !note) {
        return <p>Something went wrong.</p>
    }

    return (
        <div className={css.container}>
	        <div className={css.item}>
	            <div className={css.header}>
                    <h2>{ note.title}</h2>
	            </div>
                <p className={css.tag}>{note.tag}</p>
	            <p className={css.content}>{note.content}</p>
	            <p className={css.date}>{note.createdAt}</p>
	        </div>
        </div>
    )
}
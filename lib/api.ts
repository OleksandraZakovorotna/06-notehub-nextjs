import axios from "axios"
import type { NewNote, Note } from "@/types/note";
import type { NoteList } from "@/types/noteList"

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

export const fetchNotes = async(note: string, page: number):Promise<NoteList> => {
    const options = {
        params: {
            search: note,
            page,
            perPage: 12,
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${NOTEHUB_TOKEN}`
        }
    }
    

    const response = await axios.get<NoteList>("/notes", options);
    
    return response.data;
    
}


export const createNote = async (newNote: NewNote):Promise<Note> => {
    
    const response = await axios.post<Note>("/notes", newNote, {headers: {
            accept: 'application/json',
            Authorization: `Bearer ${NOTEHUB_TOKEN}`
    }
    });
    
    return response.data;


}

export const deleteNote = async (noteId: string):Promise<Note> => {

        const response = await axios.delete<Note>(`/notes/${noteId}`, {headers: {
            accept: 'application/json',
            Authorization: `Bearer ${NOTEHUB_TOKEN}`
    }
    });
    return response.data;
}

export const fetchNoteById = async (id: string):Promise<Note> => {

        const response = await axios.get<Note>(`/notes/${id}`, {headers: {
            accept: 'application/json',
            Authorization: `Bearer ${NOTEHUB_TOKEN}`
    }
    });
    return response.data;
}

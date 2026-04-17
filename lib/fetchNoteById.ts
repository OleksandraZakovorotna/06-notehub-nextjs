import axios from "axios";
import { Note } from "../types/note";

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

export const fetchNoteById = async (id: string):Promise<Note> => {

        const response = await axios.get<Note>(`/notes/${id}`, {headers: {
            accept: 'application/json',
            Authorization: `Bearer ${NOTEHUB_TOKEN}`
    }
    });
    return response.data;
}

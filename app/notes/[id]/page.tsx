import { fetchNoteById } from "@/app/lib/fetchNoteById"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteClient from "./NoteDetails.client";

type Props = {
    params: {id: string}
}

export default async function Note(props: Props) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note"],
        queryFn: () => fetchNoteById(props.params.id)
    })
    
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteClient/>
    </HydrationBoundary>
    )


}
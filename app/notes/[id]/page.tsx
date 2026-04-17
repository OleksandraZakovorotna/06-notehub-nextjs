import { fetchNoteById } from "@/lib/api"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteClient from "./NoteDetails.client";

type Props = {
  params: {
    id: string
  }
}

export default async function Note({ params }: Props) {
  const queryClient = new QueryClient()

  const id = params.id

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  )
}
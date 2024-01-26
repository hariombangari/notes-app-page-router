import { useRouter } from 'next/router'
import NoteForm from '@/components/note-form';
import { createNote } from "@/actions";

export default function Create() {
  const router = useRouter()
  const channelName = router.query.channelName;
  const onSubmit = async (data) => {
    await createNote(channelName, data);
    router.push(`/notes/${channelName}`)
  }
  return <NoteForm onSubmit={onSubmit} />;
}

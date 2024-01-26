import { useRouter } from "next/router";
import NoteForm from "@/components/note-form";
import { deleteNotes, updateNotes } from "@/actions";
import { getNotes, getNote } from "@/server-actions";

export default function Note({ note }) {
  const router = useRouter();
  const { noteId, channelName } = router.query;
  if (note === null) {
    return <h1>No note found!</h1>;
  }
  const onSubmit = async (data) => {
    await updateNotes(channelName, noteId, data);
    router.push(`/notes/${channelName}`)
  }
  const onDelete = async () => {
    await deleteNotes(channelName, noteId);
    router.push(`/notes/${channelName}`)
  }
  return <NoteForm {...note} onSubmit={onSubmit} onDelete={onDelete} isUpdateView={true} />;
}

export async function getStaticProps(context) {
  const noteId = context.params.noteId;
  const note = await getNote(noteId);
  return {
    props: {
      note,
    },
  };
}

export async function getStaticPaths() {
  const channels = ["hello"];
  const promises = channels.map((channel) => getNotes(channel));
  const results = await Promise.all(promises);
  const paths = [];
  results.forEach((notes) => {
    notes.forEach((note) => {
      paths.push({
        params: {
          noteId: note.id,
          channelName: note.channelId,
        },
      });
    });
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
}

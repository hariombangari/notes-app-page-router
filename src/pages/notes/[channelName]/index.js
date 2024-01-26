import { useRouter } from "next/router";
import CreateNotesButton from "@/components/create-button";
import Note from "@/components/note";
import { getNotes } from "@/server-actions";

export default function Channel({ notes }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-6 gap-4">
      <CreateNotesButton channelName={router.query.channelName} />
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  const channelName = context.params.channelName;
  const notes = await getNotes(channelName);
  return {
    props: {
      notes,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { channelName: "hello" } }],
    fallback: "blocking",
  };
}

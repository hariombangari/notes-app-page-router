import { getNote, deleteNotes, updateNotes } from "@/server-actions";

export default async function handler(req, res) {
  const noteId = req.query.noteId;
  if (req.method === "GET") {
    const note = await getNote(noteId);
    if (note) {
      res.json(note);
      return;
    }
    res.status(404).json({ message: "Not found" });
    return;
  }
  if (req.method === "DELETE") {
    await deleteNotes(noteId, req.query.channelName);
    await res.revalidate(`/notes/${req.query.channelName}`);
    await res.revalidate(`/notes/${req.query.channelName}/${noteId}`);
    res.json({ success: true });    
    return;
  }
  if (req.method === "PATCH") {
    const body = JSON.parse(req.body);
    await updateNotes(noteId, body);
    await res.revalidate(`/notes/${req.query.channelName}`);
    await res.revalidate(`/notes/${req.query.channelName}/${noteId}`);
    res.json({ success: true });
  }
}

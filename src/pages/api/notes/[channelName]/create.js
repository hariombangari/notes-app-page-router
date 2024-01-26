import { createNote } from "@/server-actions";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const note = await createNote(req.query.channelName, body);
    await res.revalidate(`/notes/${req.query.channelName}`);
    res.json(note);
  }
}

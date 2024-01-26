import { getNotes } from "@/server-actions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const channelId = req.query.channelName;
    const data = await getNotes(channelId);
    res.json(data)
  }
}

import { v4 as uuid } from "uuid";
import * as redis from "./redis";

export const createChannel = async (formData) => {
  const channelName = formData.get("channelName");
  redirect(`/notes/${channelName}`);
};

export const createNote = async (channelName, data) => {
  const noteId = uuid();
  const timeNow = Date.now();
  const note = {
    title: data.title,
    content: data.content,
    id: noteId,
    channelId: channelName,
    createdTime: timeNow,
    updatedTime: timeNow,
    archived: false,
    masked: false,
    pinned: false,
  };
  await redis.set(`notes:${noteId}`, note);
  return note;
};

export const getNotes = async (channelId, term) => {
  console.log("SERVER ACTIONS: Get All Notes", channelId);
  const response = await redis.search("idx:notes", `@channelId:{${channelId}}`);
  const results = response.documents.map((document) => document.value);
  return results.filter((note) => note.archived === "false");
};

export const deleteNotes = async (noteId, channelName) => {
  console.log("SERVER ACTIONS: Delete Notes", noteId);
  await redis.del(`notes:${noteId}`);
};

export const getNote = async (noteId) => {
  console.log("SERVER ACTIONS: Get Note", noteId);
  const result = await redis.get(`notes:${noteId}`);
  if (Object.keys(result).length) {
    return result;
  }
  return null;
};

export const updateNotes = async (noteId, data) => {
  console.log("SERVER ACTIONS: Update Note", noteId);
  const note = await redis.get(`notes:${noteId}`);
  note.content = data.content;
  note.title = data.title;
  await redis.set(`notes:${noteId}`, note);
};

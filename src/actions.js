export const createNote = async (channelName, data) => {
  console.log("create notes", channelName);
  const response = await fetch(`/api/notes/${channelName}/create`, {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({
      ...data,
    }),
  });
  return response.json();
};

export const getNotes = async (channelName) => {
  console.log("get notes", channelName);
  const response = await fetch(
    `${process.env.HOST_NAME}/api/notes/${channelName}`
  );
  const json = await response.json();
  return json;
};

export const deleteNotes = async (channelName, noteId) => {
  console.log("delete note", channelName, noteId);
  await fetch(`/api/notes/${channelName}/${noteId}`, {
    method: "DELETE",
  });
};

export const getNote = async (channelName, noteId) => {
  console.log("get note", noteId);
  const response = await fetch(
    `${process.env.HOST_NAME}/api/notes/${channelName}/${noteId}`
  );
  const json = await response.json();
  return json;
};

export const updateNotes = async (channelName, noteId, data) => {
  console.log("update note", noteId);
  await fetch(`/api/notes/${channelName}/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...data,
    }),
  });
};

import { useRef } from "react";

export default function NoteForm({ title, content, onSubmit, onDelete, isUpdateView }) {
  const form = useRef(null);
  const onSubmitClick = (action) => {
    if (action === "submit") {
      const formData = new FormData(form.current);
      const data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });
      onSubmit(data);
    } else if (action === "delete") {
      onDelete()
    }
  };
  return (
    <form
      className="max-w-sm mx-auto"
      onSubmit={(e) => e.preventDefault()}
      ref={form}
    >
      <div className="mb-5">
        <input
          type="text"
          id="title"
          name="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          defaultValue={title}
          required
        />
      </div>
      <div className="mb-5">
        <textarea
          id="content"
          name="content"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your notes here..."
          defaultValue={content}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
        onClick={() => onSubmitClick("submit")}
      >
        {isUpdateView ? "Update" : "Submit"}
      </button>
      {isUpdateView && (
        <button
          onClick={() => onSubmitClick("delete")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Delete
        </button>
      )}
    </form>
  );
}

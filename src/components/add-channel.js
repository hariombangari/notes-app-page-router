import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const Submit = ({ isValid }) => {
  return (
    <button
      type="submit"
      aria-disabled={!isValid}
      className={`inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white rounded-lg border ${
        isValid
          ? "bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          : "bg-gray-300 cursor-not-allowed opacity-50"
      }`}
      disabled={!isValid}
    >
      Go
    </button>
  );
};

const ChannelForm = () => {
  const [isChannelNameValid, setChannelNameValidity] = useState(false);
  const [channelName, setChannelName] = useState("");
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/notes/${channelName}`)
  }
  
  useEffect(() => {
    const regex = /^[a-zA-Z0-9*_.@-]{5,}$/;
    setChannelNameValidity(regex.test(channelName));
  }, [channelName]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Enter your channel name
        </h5>

        <form className="flex items-center" onSubmit={onSubmit}>
          <div className="relative w-full">
            <input
              type="text"
              id="channelName"
              name="channelName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Channel name"
              onInput={(e) => setChannelName(e.target.value)}
              required
            />
          </div>
          <Submit isValid={isChannelNameValid} />
        </form>
      </div>
    </div>
  );
};

export default ChannelForm;

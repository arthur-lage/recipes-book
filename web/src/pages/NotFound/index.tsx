import { Link } from "react-router-dom";

import { HiEmojiSad } from "react-icons/hi";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <HiEmojiSad
        size={128}
        color="#888"
        className="pointer-events-none absolute top-2 rotate-45 opacity-30 left-2"
      />
      <HiEmojiSad
        size={369}
        color="#888"
        className="pointer-events-none absolute right-10 rotate-[-22deg] opacity-70"
      />
      <HiEmojiSad
        size={252}
        color="#888"
        className="pointer-events-none absolute left-10 bottom-16 rotate-[15deg] opacity-20"
      />
      <HiEmojiSad
        size={512}
        color="#888"
        className="pointer-events-none absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[0deg] opacity-10"
      />
      <h1 className="text-[5rem] font-nunito font-bold mb-2 z-10 ">404</h1>
      <span className="text-[1.8rem] font-nunito font-medium mb-8 z-10 ">
        We could not find the page you were looking for.
      </span>
      <Link
        className="z-10 text-[1.6rem] font-nunito font-medium text-blue-500 hover:underline cursor-pointer"
        to="/"
      >
        Click here to go back to the home page
      </Link>
      .
    </div>
  );
}

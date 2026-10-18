"use client";

import { useEffect } from "react";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // we pass the error to a logger
    console.log(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong: Please try again</h1>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}

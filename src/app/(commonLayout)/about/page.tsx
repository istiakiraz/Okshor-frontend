"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [data, setData] = useState();

  // console.log("about", data);

  useEffect(() => {
    // iffe

    (async () => {
      const { data } = await getBlogs();
      setData(data);
    })();
  }, []);

  return <div>AboutPage</div>;
}

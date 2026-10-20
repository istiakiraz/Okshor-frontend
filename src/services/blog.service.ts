import { env } from "@/env";

const API_URL = env.API_URL;

export const blogService = {
  getBlogPost: async function () {
    try {
      const res = await fetch(`${API_URL}/posts`, { next: { revalidate: 10 } });
      const data = await res.json();

      // if(data.success){
      //     return
      // }

      return { data: data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};

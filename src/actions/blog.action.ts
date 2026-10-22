"use server";

import { BlogData, blogService } from "@/services/blog.service";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPost();
};

export const createBlogPost = async (data: BlogData) => {
  const res = await blogService.crateBlogPost(data);
updateTag("blogPosts")
  return res;
};

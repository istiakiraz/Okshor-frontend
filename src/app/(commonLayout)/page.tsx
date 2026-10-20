import BlogCard from "@/components/homeComponents/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data } = await blogService.getBlogPost();

  console.log("data", data);

  return (
    <div className="mt-10 px-10">
      <div className="w-11/12 2xl:w-10/12 mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

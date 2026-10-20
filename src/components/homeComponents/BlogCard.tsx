import { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, MessageSquare } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  // Date format korar jonno
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-800/40 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Thumbnail or Fallback Image */}
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-sm font-medium">
            No Thumbnail
          </div>
        )}

        {/* Featured Badge */}
        {post.isFeatured && (
          <span className="absolute top-3 left-3 bg-amber-500 dark:bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium px-2.5 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blogs/${post.id}`}>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt / Content snippet */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 grow">
          {post.content}
        </p>

        {/* Footer Meta (Date, Views, Comments) */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1" title="Views">
              <Eye className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              <span>{post.view}</span>
            </div>

            <div className="flex items-center gap-1" title="Comments">
              <MessageSquare className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              <span>{post._count?.comments ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
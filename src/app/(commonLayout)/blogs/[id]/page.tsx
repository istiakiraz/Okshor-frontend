import { blogService } from "@/services/blog.service";
import Image from "next/image";
import {
  Calendar,
  Eye,
  MessageSquare,
  ArrowLeft,
  CornerDownRight,
} from "lucide-react";
import Link from "next/link";
import { BlogPost, BlogComment } from "@/types";

// Recursive Comment Item Component for nested replies
function CommentCard({ comment }: { comment: BlogComment }) {
  return (
    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-2">
      {/* Comment Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          User: {comment.authorId.slice(0, 8)}...
        </span>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Comment Content */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {comment.content}
      </p>

      {/* Nested Replies Rendering */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 pl-4 sm:pl-6 border-l-2 border-indigo-100 dark:border-indigo-950/60 space-y-3">
          <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-500 mb-1">
            <CornerDownRight className="w-3 h-3" />
            <span>Replies</span>
          </div>
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPost();
  return data?.data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 3);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await blogService.getBlogById(id);
  const post: BlogPost = response.data;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="w-11/12 2xl:w-10/12 mx-auto">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden p-6 sm:p-10">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-100 dark:border-gray-800 mb-8">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-gray-400" />
              <span>{post.view} views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span>{post._count?.comments ?? 0} Comments</span>
            </div>
          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content Body */}
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg mb-12">
            <p>{post.content}</p>
          </div>

          {/* Comments Section */}
          <section className="border-t border-gray-100 dark:border-gray-800 pt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Comments ({post._count?.comments ?? 0})
            </h3>

            {/* Comments List */}
            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No comments yet. Be the first to comment!
              </p>
            )}
          </section>
        </article>
      </div>
    </main>
  );
}

"use client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { toast } from "sonner";
import { FieldError } from "@/components/ui/field";
import { createBlogPost } from "@/actions/blog.action";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().min(1, "At least one tag is required"),
});

export default function CreateBlogForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: blogSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating blog post...");

      try {
        const formattedData = {
          title: value.title,
          content: value.content,
          tags: value.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        };

        console.log("Submitted Blog Data:", formattedData);

        // post logic

        const res = await createBlogPost(formattedData);

        console.log("blog res", res);

        toast.success("Blog Created Successfully", { id: toastId });
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 w-lg mx-auto md:p-8 p-6 text-left text-sm rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-800 transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create Blog Post
      </h2>

      <form
        id="blog-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Title Field */}
        <form.Field
          name="title"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5"
                >
                  Title
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 outline-none rounded-xl py-2.5 px-4 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  type="text"
                  placeholder="Enter blog title"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        />

        {/* Content Field */}
        <form.Field
          name="content"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5"
                >
                  Content
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 outline-none rounded-xl py-2.5 px-4 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors min-h-[120px] resize-y"
                  placeholder="Write your blog content here..."
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        />

        {/* Tags Field */}
        <form.Field
          name="tags"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5"
                >
                  Tags (Comma separated)
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 outline-none rounded-xl py-2.5 px-4 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  type="text"
                  placeholder="web, react, nextjs"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        />
      </form>

      {/* Submit Button */}
      <button
        form="blog-form"
        type="submit"
        className="w-full mt-4 bg-primary dark:hover:bg-indigo-600 font-semibold py-3 rounded-xl text-white shadow-md shadow-indigo-500/20 transition-all duration-200 cursor-pointer"
      >
        Publish Blog
      </button>
    </div>
  );
}

"use client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { FieldError } from "../ui/field";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "This field is required"),
});

export default function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging user");

      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Login Successfully", { id: toastId });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 w-lg mx-auto md:p-8 p-6 text-left text-sm rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-800 transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create Account - Okshor
      </h2>

      <form
        id="signup-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4  "
      >
        {/* Email Field */}
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 outline-none rounded-xl py-2.5 px-4 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        />

        {/* password field */}
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5"
                >
                  Password
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 outline-none rounded-xl py-2.5 px-4 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        />

        {/* Submit Button */}
      </form>

      <button
        form="signup-form"
        type="submit"
        className="w-full mt-4 bg-primary  dark:hover:bg-indigo-600 font-semibold py-3 rounded-xl text-white shadow-md shadow-indigo-500/20 transition-all duration-200 cursor-pointer"
      >
        Log In
      </button>

      <button
        type="button"
        onClick={() => handleGoogleLogin()}
        className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
      >
        Log in with Google
      </button>
    </div>
  );
}

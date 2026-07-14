"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { normalizeApiError } from "../../utils/apiError";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "admin@example.com",
      password: "Admin@12345"
    }
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    clearErrors();

    try {
      await login(values);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      const normalized = normalizeApiError(error);
      Object.entries(normalized.fieldErrors).forEach(([field, message]) => {
        setError(field, { type: "server", message });
      });
      toast.error(normalized.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-mist px-4 py-8 text-ink">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 md:grid-cols-[1fr_430px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">Enterprise HR Operations</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">HR Employee Management</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            A focused workspace for Admin, HR, and Employee users to manage people, attendance, leave, payroll,
            documents, onboarding, exits, and reports.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["Secure JWT access", "Role-based menus", "Live HR APIs"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
        >
          <h2 className="text-xl font-semibold text-slate-950">Sign in</h2>
          <p className="mt-1 text-sm text-slate-500">Use the seeded admin credentials or an account created in Users.</p>

          <label className="mt-6 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            {...register("email", {
              required: "Email is required",
              onChange: () => clearErrors("email"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email"
              }
            })}
          />
          {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email.message}</p> : null}

          <label className="mt-4 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            {...register("password", {
              required: "Password is required",
              onChange: () => clearErrors("password"),
              minLength: {
                value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
          />
          {errors.password ? (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal px-4 py-2.5 font-semibold text-white transition hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiLogIn aria-hidden="true" />
            {isSubmitting ? "Signing in" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

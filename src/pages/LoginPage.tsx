import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import { loginUser } from "../services/auth";
import toast from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email: form.email,
        password: form.password,
      });

      console.log(response);

      const token =
        response?.data?.accessToken ||
        response?.accessToken ||
        response?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ??
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-[#17364C] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-24 text-white">
          <h1 className="max-w-md text-6xl font-bold leading-tight">
            Keep the marketplace safe, verified, trusted.
          </h1>

          <p className="mt-12 max-w-lg text-2xl text-slate-300">
            Review verifications, approve agents, monitor
            transactions and act with confidence — all from one
            focused console.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#F8FAFC] p-8">
        <div className="w-full max-w-xl rounded-[40px] bg-white p-14 shadow-sm">
          <h2 className="text-center text-5xl font-bold text-[#24364B]">
            Welcome back
          </h2>

          <p className="mt-4 text-center text-xl text-slate-500">
            Sign in to access the moderation console.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-8"
          >
            <div>
              <label className="mb-3 block text-lg font-medium text-slate-700">
                Work email
              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 px-5">
                <FiMail className="text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="w-full bg-transparent px-4 py-5 text-black outline-none"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-lg font-medium text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-[#17364C]"
                >
                  Forgot?
                </button>
              </div>

              <div className="flex items-center rounded-2xl border border-slate-200 px-5">
                <FiLock className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-transparent px-4 py-5 text-black outline-none"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-slate-400" />
                  ) : (
                    <FiEye className="text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#17364C] py-5 text-lg font-semibold text-white transition hover:bg-[#102a3c] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in to dashboard"}

              {!loading && <FiArrowRight />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex items-center justify-center bg-white px-12 py-12">
      <div className="w-full max-w-[700px] rounded-[32px] border border-[#D8DEE6] bg-white p-12 shadow-sm">

        {/* Heading */}

        <div className="mb-10">
          <h2 className="text-[42px] font-bold text-[#17324D]">
            Login to your account
          </h2>

          <p className="mt-3 text-xl text-[#6B7280]">
            Enter your details to access your account
          </p>
        </div>

        {/* Form */}

        <form className="space-y-8">

          {/* Email */}

          <div>
            <label className="mb-3 block text-lg font-semibold text-[#17324D]">
              Email Address
            </label>

            <div className="flex h-[64px] items-center rounded-2xl border border-[#D8DEE6] px-5">
              <Mail size={22} className="text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 text-lg outline-none"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-3 block text-lg font-semibold text-[#17324D]">
              Password
            </label>

            <div className="flex h-[64px] items-center rounded-2xl border border-[#D8DEE6] px-5">
              <Lock size={22} className="text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent px-4 text-lg outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={22} className="text-slate-400" />
                ) : (
                  <Eye size={22} className="text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Remember */}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 text-lg text-[#6B7280]">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="font-medium text-[#17324D]"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login */}

          <button className="h-[62px] w-full rounded-2xl bg-[#17324D] text-xl font-semibold text-white transition hover:bg-[#244867]">
            Login
          </button>
        </form>

        {/* Divider */}

        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-[#6B7280]">
            or Continue with
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social */}

        <div className="grid grid-cols-2 gap-5">

          <button className="flex h-[60px] items-center justify-center gap-3 rounded-2xl border border-[#D8DEE6] font-semibold">
            <FcGoogle size={24} />
            Google
          </button>

          <button className="flex h-[60px] items-center justify-center gap-3 rounded-2xl border border-[#D8DEE6] font-semibold">
            <FaFacebookF size={20} className="text-blue-600" />
            Facebook
          </button>

        </div>

        {/* Terms */}

        <p className="mt-10 text-center text-[15px] leading-7 text-[#6B7280]">
          By signing in, you agree to our{" "}
          <span className="font-semibold text-[#17324D]">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-semibold text-[#17324D]">
            Privacy Policy
          </span>
        </p>

        {/* Help */}

        <div className="mt-10 rounded-2xl border border-[#D8DEE6] bg-[#F8FAFC] p-6">

          <h3 className="font-semibold text-[#17324D]">
            Need help?
          </h3>

          <p className="mt-2 text-[#6B7280]">
            Contact our support team if you're having trouble
            logging into your account.
          </p>

          <button className="mt-4 font-semibold text-[#17324D]">
            Contact Support →
          </button>

        </div>

      </div>
    </section>
  );
}
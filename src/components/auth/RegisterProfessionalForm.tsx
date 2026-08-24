import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  MapPin,
  ChevronDown,
  Eye,
  EyeOff,
  BriefcaseBusiness,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function RegisterProfessionalForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <section className="flex items-center justify-center bg-white px-6 py-8 lg:px-10">
      <div className="w-full max-w-[760px] rounded-[20px] border border-[#D9DEE5] bg-white px-8 py-8 lg:px-10">

        {/* Professional Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#DDFBE3]">
            <BriefcaseBusiness
              size={25}
              className="text-[#22C55E]"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-[28px] font-bold text-[#111827] lg:text-[30px]">
          I am a Professional (Artisan)
        </h2>

        {/* Form */}
        <form className="mt-8 space-y-6">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-base font-medium text-[#111827]">
              Full Name
            </label>

            <div className="flex h-12 items-center rounded-xl border border-[#D9DEE5] px-4">
              <User
                size={20}
                className="shrink-0 text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter your full name"
                className="ml-3 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Email */}
            <div>
              <label className="mb-2 block text-base font-medium text-[#111827]">
                Email
              </label>

              <div className="flex h-12 items-center rounded-xl border border-[#D9DEE5] px-4">
                <Mail
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="ml-3 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-base font-medium text-[#111827]">
                Phone Number
              </label>

              <div className="flex h-12 items-center rounded-xl border border-[#D9DEE5] px-3">

                <span className="mr-2 text-lg">
                  🇳🇬
                </span>

                <span className="text-sm font-medium text-[#111827]">
                  +234
                </span>

                <ChevronDown
                  size={17}
                  className="mx-2 text-[#111827]"
                />

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="ml-1 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Password */}
            <div>
              <label className="mb-2 block text-base font-medium text-[#111827]">
                Password
              </label>

              <div className="flex h-12 items-center rounded-xl border border-[#D9DEE5] px-4">

                <Lock
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="ml-3 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="ml-2 shrink-0"
                >
                  {showPassword ? (
                    <EyeOff
                      size={19}
                      className="text-gray-400"
                    />
                  ) : (
                    <Eye
                      size={19}
                      className="text-gray-400"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-base font-medium text-[#111827]">
                Confirm Password
              </label>

              <div className="flex h-12 items-center rounded-xl border border-[#D9DEE5] px-4">

                <Lock
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  className="ml-3 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="ml-2 shrink-0"
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={19}
                      className="text-gray-400"
                    />
                  ) : (
                    <Eye
                      size={19}
                      className="text-gray-400"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Trade + Experience */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Trade / Skill */}
            <div>
              <label className="mb-2 block text-base font-medium text-[#111827]">
                Trade/Skill Category
              </label>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-between rounded-xl border border-[#D9DEE5] px-4 text-left"
              >
                <span className="text-sm text-gray-400">
                  Select your main skill
                </span>

                <ChevronDown
                  size={20}
                  className="text-[#111827]"
                />
              </button>
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block text-base font-medium text-[#111827]">
                Experience
              </label>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-between rounded-xl border border-[#D9DEE5] px-4 text-left"
              >
                <span className="text-sm text-gray-400">
                  Select your experience level
                </span>

                <ChevronDown
                  size={20}
                  className="text-[#111827]"
                />
              </button>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-base font-medium text-[#111827]">
              Location
            </label>

            <div className="flex h-12 items-center rounded-xl border border-[#D9DEE5] px-4">

              <MapPin
                size={20}
                className="shrink-0 text-gray-400"
              />

              <input
                type="text"
                placeholder="Select your city"
                className="ml-3 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 text-sm text-[#4B5563]">

            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300"
            />

            <span>
              I agree to the{" "}
              <button
                type="button"
                className="text-[#2563EB] hover:underline"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-[#2563EB] hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          </label>

          {/* Create Account */}
          <button
            type="submit"
            className="h-14 w-full rounded-xl bg-[#17324D] text-base font-semibold text-white transition hover:bg-[#244867]"
          >
            Create Your Professional Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E5E7EB]" />

          <span className="whitespace-nowrap text-sm text-[#6B7280]">
            or Continue with
          </span>

          <div className="h-px flex-1 bg-[#E5E7EB]" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-3 rounded-xl border border-[#D9DEE5] text-sm font-medium text-[#111827] transition hover:bg-gray-50"
          >
            <FcGoogle size={22} />
            Google
          </button>

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-3 rounded-xl border border-[#D9DEE5] text-sm font-medium text-[#111827] transition hover:bg-gray-50"
          >
            <FaFacebook
              size={21}
              className="text-[#1877F2]"
            />
            Facebook
          </button>
        </div>

      </div>
    </section>
  );
}
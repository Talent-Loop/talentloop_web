
import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

import AuthNavbar from "../components/auth/AuthNavbar";
import RegisterUserLeftPanel from "../components/auth/RegisterUserLeftPanel";

export default function RegisterUserPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showResend, setShowResend] = useState(false);

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One number",
      valid: /[0-9]/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setShowResend(false);

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setError(
        "Please make sure your password meets all the requirements."
      );
      return;
    }

    if (!agreeToTerms) {
      setError(
        "Please agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    const nameParts = formData.fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    if (!lastName) {
      setError(
        "Please enter your full name, including your last name."
      );
      return;
    }

    const cleanedPhone = formData.phone
      .trim()
      .replace(/\s+/g, "")
      .replace(/^0/, "");

    const fullPhone = `+234${cleanedPhone}`;

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);

    try {
      setLoading(true);

      const response = await fetch(
        "https://backend-talentloop.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email: formData.email.trim(),
            phone: fullPhone,
            password,
            roleName: "client",
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          data?.message ||
            "Registration failed. Please try again."
        );
        return;
      }

      console.log("Client registration successful:", data);

      setSuccess(
        "Account created successfully! Please check your email to verify your account."
      );

      setShowResend(true);

      setPassword("");
    } catch (err) {
      clearTimeout(timeoutId);

      console.error("Registration error:", err);

      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) {
        setError(
          "The server is taking too long to respond. Your account may have been created. Please check your email or use the resend verification option below."
        );

        setShowResend(true);
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email.trim()) {
      setError(
        "Please enter the email address you used to register."
      );
      return;
    }

    setError("");
    setSuccess("");

    try {
      setResending(true);

      const response = await fetch(
        "https://backend-talentloop.onrender.com/api/v1/auth/resend-verification-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          data?.message ||
            "Unable to resend verification email. Please try again."
        );
        return;
      }

      setSuccess(
        data?.message ||
          "Verification email sent successfully. Please check your inbox."
      );
    } catch (err) {
      console.error("Resend verification error:", err);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <AuthNavbar />

      <main className="grid min-h-[calc(100vh-118px)] lg:grid-cols-2">
        {/* Left Panel */}
        <RegisterUserLeftPanel />

        {/* Right Panel */}
        <section className="flex justify-center bg-white px-6 py-12 lg:px-12">
          <div className="w-full max-w-[520px]">
            {/* Client icon */}
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8EEF2] text-[#173D57]">
                <UserRound size={32} strokeWidth={2} />
              </div>
            </div>

            {/* Heading */}
            <div className="mt-5 text-center">
              <h1 className="text-[30px] font-bold text-black">
                I am a client
              </h1>

              <p className="mt-2 text-base text-[#667085]">
                I am looking to hire a professional for a job
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleRegister}
              className="mt-8 space-y-5"
            >
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#252525]">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-14 w-full rounded-xl border border-[#D0D5DD] bg-white pl-12 pr-4 text-base outline-none transition focus:border-[#173D57] focus:ring-1 focus:ring-[#173D57]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#252525]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="h-14 w-full rounded-xl border border-[#D0D5DD] bg-white pl-12 pr-4 text-base outline-none transition focus:border-[#173D57] focus:ring-1 focus:ring-[#173D57]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#252525]">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="h-14 w-full rounded-xl border border-[#D0D5DD] bg-white pl-12 pr-4 text-base outline-none transition focus:border-[#173D57] focus:ring-1 focus:ring-[#173D57]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#252525]">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="h-14 w-full rounded-xl border border-[#D0D5DD] bg-white pl-12 pr-12 text-base outline-none transition focus:border-[#173D57] focus:ring-1 focus:ring-[#173D57]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#173D57]"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Rules */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                {passwordRules.map((rule) => (
                  <div
                    key={rule.label}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        rule.valid
                          ? "border-[#173D57] bg-[#173D57] text-white"
                          : "border-[#98A2B3] text-transparent"
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </div>

                    <span className="text-sm text-[#667085]">
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) =>
                    setAgreeToTerms(e.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-[#173D57]"
                />

                <span className="text-sm leading-5 text-[#667085]">
                  I agree to the{" "}
                  <Link
                    to="#"
                    className="font-medium text-[#173D57] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="#"
                    className="font-medium text-[#173D57] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                  {success}
                </div>
              )}

              {/* Create Account */}
              <button
                type="submit"
                disabled={loading}
                className="h-14 w-full rounded-xl bg-[#173D57] text-base font-semibold text-white transition hover:bg-[#122F43] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Your Client Account"}
              </button>

              {/* Resend Verification */}
              {showResend && (
                <div className="rounded-xl border border-[#D9DEE5] bg-[#F8FAFC] px-4 py-4 text-center">
                  <p className="mb-3 text-sm text-[#4B5563]">
                    Didn't receive the verification email?
                  </p>

                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="font-semibold text-[#2563EB] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {resending
                      ? "Sending..."
                      : "Resend Verification Email"}
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="h-px flex-1 bg-[#D0D5DD]" />

                <span className="text-sm text-[#667085]">
                  or continue with
                </span>

                <div className="h-px flex-1 bg-[#D0D5DD]" />
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex h-14 items-center justify-center gap-3 rounded-xl border border-[#D0D5DD] bg-white text-sm font-medium text-[#252525] transition hover:bg-[#F8FAFC]"
                >
                  <FcGoogle size={22} />
                  Google
                </button>

                <button
                  type="button"
                  className="flex h-14 items-center justify-center gap-3 rounded-xl border border-[#D0D5DD] bg-white text-sm font-medium text-[#252525] transition hover:bg-[#F8FAFC]"
                >
                  <FaFacebook
                    size={21}
                    className="text-[#1877F2]"
                  />
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}


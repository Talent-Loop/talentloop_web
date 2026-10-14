
import { useState, type FormEvent } from "react";

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

  // Form values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedSkill, setSelectedSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Temporary frontend options.
  // These can later be replaced with /services/categories
  // when the backend developer confirms the category response.
  const skillOptions = [
    "Plumber",
    "Electrician",
    "Carpenter",
    "Painter",
    "Mechanic",
    "Welder",
    "Tiler",
    "Bricklayer",
    "POP Installer",
    "AC Technician",
    "Generator Technician",
    "Phone Technician",
    "Fashion Designer",
    "Barber",
    "Hair Stylist",
    "Cleaner",
    "Tailor",
    "Other",
  ];

  const experienceOptions = [
    "Less than 1 year",
    "1 - 2 years",
    "3 - 5 years",
    "5 - 10 years",
    "10+ years",
  ];

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!selectedSkill) {
      setError("Please select your main trade or skill.");
      return;
    }

    if (!experience) {
      setError("Please select your experience level.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter your location.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError(
        "Please agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    // Split full name into first name and last name
    const nameParts = fullName.trim().split(/\s+/);

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    if (!lastName) {
      setError(
        "Please enter your full name, including your last name."
      );
      return;
    }

    // Make sure phone doesn't contain the +234 prefix twice
    const cleanedPhone = phone
      .trim()
      .replace(/\s+/g, "")
      .replace(/^0/, "")
      .replace(/^\+234/, "");

    const fullPhone = `+234${cleanedPhone}`;

    // Save the profile information that the registration endpoint
    // does NOT currently support.
    //
    // We will use this later after login when /profile is called.
    const pendingProfessionalProfile = {
      skills: [selectedSkill],
      experience,
      location: location.trim(),
    };

    localStorage.setItem(
      "pendingProfessionalProfile",
      JSON.stringify(pendingProfessionalProfile)
    );

    // Abort the request if the backend takes too long
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
            email: email.trim(),
            phone: fullPhone,
            password,
            roleName: "provider",
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.message ||
            "Registration failed. Please try again."
        );
        return;
      }

      console.log(
        "Professional registration successful:",
        data
      );

      console.log(
        "Pending professional profile:",
        pendingProfessionalProfile
      );

      setSuccess(
        "Account created successfully! Please check your email to verify your account."
      );

      // Clear sensitive fields after successful registration
      setPassword("");
      setConfirmPassword("");
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
    if (!email.trim()) {
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
            email: email.trim(),
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
        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-6"
        >
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
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
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
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
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
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
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
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
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
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="ml-3 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
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

              <div className="relative">
                <select
                  value={selectedSkill}
                  onChange={(e) =>
                    setSelectedSkill(e.target.value)
                  }
                  className={`h-12 w-full appearance-none rounded-xl border border-[#D9DEE5] bg-white px-4 pr-10 text-sm outline-none ${
                    selectedSkill
                      ? "text-[#111827]"
                      : "text-gray-400"
                  }`}
                >
                  <option value="" disabled>
                    Select your main skill
                  </option>

                  {skillOptions.map((skill) => (
                    <option
                      key={skill}
                      value={skill}
                    >
                      {skill}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#111827]"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block text-base font-medium text-[#111827]">
                Experience
              </label>

              <div className="relative">
                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  className={`h-12 w-full appearance-none rounded-xl border border-[#D9DEE5] bg-white px-4 pr-10 text-sm outline-none ${
                    experience
                      ? "text-[#111827]"
                      : "text-gray-400"
                  }`}
                >
                  <option value="" disabled>
                    Select your experience level
                  </option>

                  {experienceOptions.map(
                    (level) => (
                      <option
                        key={level}
                        value={level}
                      >
                        {level}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#111827]"
                />
              </div>
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
                placeholder="Enter your city"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="ml-3 w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Resend Verification */}
          {success && (
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

          {/* Terms */}
          <label className="flex items-start gap-3 text-sm text-[#4B5563]">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) =>
                setTermsAccepted(e.target.checked)
              }
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
            disabled={loading}
            className="h-14 w-full rounded-xl bg-[#17324D] text-base font-semibold text-white transition hover:bg-[#244867] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Creating Account..."
              : "Create Your Professional Account"}
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


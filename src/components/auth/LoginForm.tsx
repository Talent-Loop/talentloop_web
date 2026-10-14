
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateProfessionalProfile = async (
    accessToken: string
  ) => {
    const pendingProfile = localStorage.getItem(
      "pendingProfessionalProfile"
    );

    // If there is no pending professional profile,
    // simply continue with normal login.
    if (!pendingProfile) {
      return;
    }

    try {
      const parsedProfile = JSON.parse(pendingProfile);

      // The backend currently supports skills,
      // but NOT experience or location.
      if (
        !parsedProfile?.skills ||
        !Array.isArray(parsedProfile.skills) ||
        parsedProfile.skills.length === 0
      ) {
        return;
      }

      const formData = new FormData();

      formData.append(
        "skills",
        JSON.stringify(parsedProfile.skills)
      );

      console.log(
        "Creating professional profile with:",
        parsedProfile.skills
      );

      const response = await fetch(
        "https://backend-talentloop.onrender.com/api/v1/profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "*/*",
          },
          body: formData,
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok) {
        console.log(
          "Professional profile created successfully:",
          data
        );

        // Profile information has successfully been
        // sent to the backend.
        localStorage.removeItem(
          "pendingProfessionalProfile"
        );

        return;
      }

      // If the profile already exists, try updating it instead.
      if (response.status === 409) {
        console.log(
          "Professional profile already exists. Attempting to update skills..."
        );

        const updateFormData = new FormData();

        updateFormData.append(
          "skills",
          JSON.stringify(parsedProfile.skills)
        );

        const updateResponse = await fetch(
          "https://backend-talentloop.onrender.com/api/v1/profile/me",
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "*/*",
            },
            body: updateFormData,
          }
        );

        const updateData = await updateResponse
          .json()
          .catch(() => null);

        if (updateResponse.ok) {
          console.log(
            "Professional profile updated successfully:",
            updateData
          );

          localStorage.removeItem(
            "pendingProfessionalProfile"
          );
        } else {
          console.warn(
            "Profile update failed:",
            updateData
          );
        }

        return;
      }

      console.warn(
        "Professional profile creation failed:",
        data
      );
    } catch (err) {
      console.error(
        "Professional profile setup error:",
        err
      );
    }
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://backend-talentloop.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.message ||
            "Login failed. Please try again."
        );
        return;
      }

      const accessToken = data?.data?.accessToken;
      const refreshToken = data?.data?.refreshToken;

      if (!accessToken) {
        setError(
          "Login succeeded, but no access token was returned."
        );
        return;
      }

      // Save authentication tokens
      localStorage.setItem(
        "accessToken",
        accessToken
      );

      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken
        );
      }

      console.log("Login successful:", data);

      /*
       * If this is a newly registered professional,
       * create their profile using the saved skill.
       *
       * Experience and location are intentionally NOT
       * sent because the backend does not currently
       * support those fields.
       */
      await handleCreateProfessionalProfile(
        accessToken
      );

      // Keep the existing dashboard navigation.
      window.location.href = "/artisan";
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
        <form
          onSubmit={handleLogin}
          className="space-y-8"
        >

          {/* Email */}
          <div>
            <label className="mb-3 block text-lg font-semibold text-[#17324D]">
              Email Address
            </label>

            <div className="flex h-[64px] items-center rounded-2xl border border-[#D8DEE6] px-5">
              <Mail
                size={22}
                className="text-slate-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
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
              <Lock
                size={22}
                className="text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-transparent px-4 text-lg outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={22}
                    className="text-slate-400"
                  />
                ) : (
                  <Eye
                    size={22}
                    className="text-slate-400"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

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
          <button
            type="submit"
            disabled={loading}
            className="h-[62px] w-full rounded-2xl bg-[#17324D] text-xl font-semibold text-white transition hover:bg-[#244867] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Logging in..."
              : "Login"}
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

          <button
            type="button"
            className="flex h-[60px] items-center justify-center gap-3 rounded-2xl border border-[#D8DEE6] font-semibold"
          >
            <FcGoogle size={24} />
            Google
          </button>

          <button
            type="button"
            className="flex h-[60px] items-center justify-center gap-3 rounded-2xl border border-[#D8DEE6] font-semibold"
          >
            <FaFacebookF
              size={20}
              className="text-blue-600"
            />
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

          <button
            type="button"
            className="mt-4 font-semibold text-[#17324D]"
          >
            Contact Support →
          </button>

        </div>

      </div>
    </section>
  );
}

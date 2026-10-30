
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

    if (!pendingProfile) {
      return;
    }

    try {
      const parsedProfile = JSON.parse(pendingProfile);

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

        localStorage.removeItem("pendingProfessionalProfile");
        return;
      }

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

          localStorage.removeItem("pendingProfessionalProfile");
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
          data?.message || "Login failed. Please try again."
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

      // Read the authenticated user's role from the access token.
      let role: string;

      try {
        const tokenParts = accessToken.split(".");
        const tokenPayload = tokenParts[1];

        if (!tokenPayload) {
          throw new Error("Invalid access token.");
        }

        // Decode Base64URL format used by JWT tokens.
        const normalizedPayload = tokenPayload
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        const userData = JSON.parse(
          atob(normalizedPayload)
        );

        role = userData?.role;
      } catch (err) {
        console.error("Unable to read account role:", err);

        setError(
          "Login succeeded, but we couldn't determine your account role."
        );
        return;
      }

      // Only allow client and provider accounts through this login.
      if (role !== "client" && role !== "provider") {
        setError(
          role === "admin"
            ? "Please use the admin login page."
            : "Your account role is not recognized."
        );
        return;
      }

      // Save authentication tokens.
      localStorage.setItem("accessToken", accessToken);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      console.log("Login successful. Account role:", role);

      // Only create/update a professional profile for providers.
      if (role === "provider") {
        await handleCreateProfessionalProfile(accessToken);
      }

      // Redirect according to the authenticated account role.
      if (role === "client") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/artisan";
      }

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
    <section className="flex items-center justify-center bg-white px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
      <div className="w-full max-w-[700px] rounded-2xl border border-[#D8DEE6] bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 lg:p-10 xl:rounded-[32px] xl:p-12">
        {/* Heading */}
        <div className="mb-7 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl font-bold text-[#17324D] sm:text-3xl lg:text-[42px]">
            Login to your account
          </h2>

          <p className="mt-2 text-sm text-[#6B7280] sm:mt-3 sm:text-base lg:text-xl">
            Enter your details to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6 sm:space-y-7 lg:space-y-8">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#17324D] sm:mb-3 sm:text-base lg:text-lg">
              Email Address
            </label>

            <div className="flex h-12 items-center rounded-xl border border-[#D8DEE6] px-3 sm:h-14 sm:rounded-2xl sm:px-5 lg:h-[64px]">
              <Mail size={22} className="shrink-0 text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full min-w-0 bg-transparent px-3 text-sm outline-none sm:px-4 sm:text-base lg:text-lg"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#17324D] sm:mb-3 sm:text-base lg:text-lg">
              Password
            </label>

            <div className="flex h-12 items-center rounded-xl border border-[#D8DEE6] px-3 sm:h-14 sm:rounded-2xl sm:px-5 lg:h-[64px]">
              <Lock size={22} className="shrink-0 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-w-0 bg-transparent px-3 text-sm outline-none sm:px-4 sm:text-base lg:text-lg"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0"
              >
                {showPassword ? (
                  <EyeOff size={22} className="text-slate-400" />
                ) : (
                  <Eye size={22} className="text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:px-5 sm:py-4">
              {error}
            </div>
          )}

          {/* Remember */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-[#6B7280] sm:gap-3 sm:text-base lg:text-lg">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-sm font-medium text-[#17324D] sm:text-base"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-[#17324D] text-base font-semibold text-white transition hover:bg-[#244867] disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:rounded-2xl sm:text-lg lg:h-[62px] lg:text-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-3 sm:my-8 sm:gap-4 lg:my-10">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="whitespace-nowrap text-sm text-[#6B7280]">
            or Continue with
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D8DEE6] text-sm font-semibold sm:h-[60px] sm:gap-3 sm:rounded-2xl sm:text-base"
          >
            <FcGoogle size={24} />
            Google
          </button>

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D8DEE6] text-sm font-semibold sm:h-[60px] sm:gap-3 sm:rounded-2xl sm:text-base"
          >
            <FaFacebookF size={20} className="text-blue-600" />
            Facebook
          </button>
        </div>

        {/* Terms */}
        <p className="mt-7 text-center text-xs leading-6 text-[#6B7280] sm:mt-8 sm:text-sm sm:leading-7 lg:mt-10 lg:text-[15px]">
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
        <div className="mt-7 rounded-xl border border-[#D8DEE6] bg-[#F8FAFC] p-4 sm:mt-8 sm:rounded-2xl sm:p-5 lg:mt-10 lg:p-6">
          <h3 className="text-sm font-semibold text-[#17324D] sm:text-base">
            Need help?
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6B7280] sm:text-base">
            Contact our support team if you're having trouble
            logging into your account.
          </p>

          <button
            type="button"
            className="mt-3 text-sm font-semibold text-[#17324D] sm:mt-4 sm:text-base"
          >
            Contact Support →
          </button>
        </div>
      </div>
    </section>
  );
}

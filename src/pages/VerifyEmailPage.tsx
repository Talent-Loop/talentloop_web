
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing or invalid.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://backend-talentloop.onrender.com/api/v1/auth/verify-email?token=${encodeURIComponent(
            token
          )}`,
          {
            method: "PATCH",
            headers: {
              Accept: "*/*",
            },
          }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          setStatus("error");
          setMessage(
            data?.message ||
              "Email verification failed. The link may have expired."
          );
          return;
        }

        setStatus("success");
        setMessage(
          data?.message ||
            "Email verified successfully. You can now log in."
        );
      } catch (error) {
        console.error("Email verification error:", error);

        setStatus("error");
        setMessage(
          "Unable to connect to the server. Please try again."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
            status === "success"
              ? "bg-green-100"
              : status === "error"
              ? "bg-red-100"
              : "bg-blue-100"
          }`}
        >
          {status === "loading" && (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          )}

          {status === "success" && (
            <span className="text-3xl text-green-600">✓</span>
          )}

          {status === "error" && (
            <span className="text-3xl text-red-600">!</span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#10344A] mb-3">
          {status === "loading"
            ? "Verifying Email"
            : status === "success"
            ? "Email Verified!"
            : "Verification Failed"}
        </h1>

        <p className="text-gray-600 leading-6">{message}</p>

        {(status === "success" || status === "error") && (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-7 w-full rounded-lg bg-[#10344A] px-5 py-3 font-semibold text-white transition hover:bg-[#0c293a]"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}

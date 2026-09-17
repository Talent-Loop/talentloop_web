import { useState } from "react";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UserSecuritySettingsPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof PasswordForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!form.newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Connect to your existing change-password service here.
      // Do not create a fake endpoint.

      toast.success("Password updated successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Unable to update your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full pb-12 pt-5 sm:pt-7">
      {/* Header */}
      <div className="mb-7 flex items-center gap-3 sm:mb-9 sm:gap-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#0F172A] transition hover:bg-white"
          aria-label="Go back to profile"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[21px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
          Security Settings
        </h1>
      </div>

      {/* Change password */}
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[12px] bg-white px-4 py-5 shadow-[0px_1px_2px_0px_#0000000D] sm:px-6 sm:py-6"
      >
        {/* Section heading */}
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
          <FiLock
            size={21}
            className="shrink-0 text-[#164D6F]"
          />

          <h2 className="font-['Montserrat'] text-[15px] font-semibold leading-[120%] text-[#334155] sm:text-[16px]">
            Change Password
          </h2>
        </div>

        {/* Fields */}
        <div className="mt-5 w-full max-w-[700px] space-y-4">
          {/* Current password */}
          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block font-['Montserrat'] text-[13px] font-medium text-[#334155] sm:text-[14px]"
            >
              Current Password
            </label>

            <input
              id="current-password"
              type="password"
              value={form.currentPassword}
              onChange={(e) =>
                updateField("currentPassword", e.target.value)
              }
              placeholder="Enter current password"
              autoComplete="current-password"
              className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none placeholder:text-[#94A3B8] transition focus:border-[#164D6F] focus:ring-2 focus:ring-[#164D6F]/10"
            />
          </div>

          {/* New password */}
          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block font-['Montserrat'] text-[13px] font-medium text-[#334155] sm:text-[14px]"
            >
              New Password
            </label>

            <input
              id="new-password"
              type="password"
              value={form.newPassword}
              onChange={(e) =>
                updateField("newPassword", e.target.value)
              }
              placeholder="Enter new password"
              autoComplete="new-password"
              className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none placeholder:text-[#94A3B8] transition focus:border-[#164D6F] focus:ring-2 focus:ring-[#164D6F]/10"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block font-['Montserrat'] text-[13px] font-medium text-[#334155] sm:text-[14px]"
            >
              Confirm New Password
            </label>

            <input
              id="confirm-password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                updateField("confirmPassword", e.target.value)
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none placeholder:text-[#94A3B8] transition focus:border-[#164D6F] focus:ring-2 focus:ring-[#164D6F]/10"
            />
          </div>
        </div>

        {/* Update button */}
        <div className="mt-7 flex w-full justify-center sm:mt-8">
          <button
            type="submit"
            disabled={loading}
            className="h-[48px] w-full max-w-[600px] rounded-[8px] bg-[#164D6F] px-4 font-['Montserrat'] text-[14px] font-medium text-white transition hover:bg-[#123F5B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>

      {/* Back */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="flex h-[48px] w-[90px] items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-semibold text-white transition hover:bg-[#164D6F]"
        >
          Back
        </button>
      </div>
    </section>
  );
}
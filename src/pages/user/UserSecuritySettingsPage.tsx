
import { useState } from "react";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import clientApi from "../../services/clientApi";
import toast from "react-hot-toast";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function UserSecuritySettingsPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<PasswordErrors>({});

  const updateField = (
    field: keyof PasswordForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newErrors: PasswordErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "New password is required.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your new password.";
    }

    if (
      form.newPassword &&
      form.confirmPassword &&
      form.newPassword !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await clientApi.patch(
        "/auth/update-password",
        {
          oldPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        }
      );

      toast.success(
        response.data?.message || "Password updated successfully!"
      );

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error: any) {
      const responseData = error.response?.data;
      const backendErrors: string[] = responseData?.errors || [];

      if (backendErrors.length > 0) {
        const newErrors: PasswordErrors = {};

        backendErrors.forEach((message) => {
          const lowerMessage = message.toLowerCase();

          if (lowerMessage.includes("oldpassword")) {
            newErrors.currentPassword = message;
          }

          if (lowerMessage.includes("newpassword")) {
            newErrors.newPassword = message;
          }

          if (lowerMessage.includes("confirmpassword")) {
            newErrors.confirmPassword = message;
          }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          toast.error(
            responseData?.message || "Password update failed."
          );
        }
      } else {
        const message =
          responseData?.message ||
          "Unable to update password. Please try again.";

        toast.error(
          Array.isArray(message) ? message.join(", ") : message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-0 pb-12 pt-[22px]">
      <div className="mb-[35px] flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="flex h-8 w-8 items-center justify-center text-[#0F172A]"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Security Settings
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="h-[401px] w-full rounded-[12px] bg-white px-4 py-4"
      >
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
          <FiLock
            size={22}
            className="text-[#164D6F]"
          />

          <h2 className="font-['Montserrat'] text-[16px] font-semibold leading-[120%] text-[#334155]">
            Change Password
          </h2>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block font-['Montserrat'] text-[14px] font-medium text-[#334155]">
              Current Password
            </label>

            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) =>
                updateField("currentPassword", e.target.value)
              }
              placeholder="Enter current password"
              className={`h-[44px] w-full rounded-[12px] border ${
                errors.currentPassword
                  ? "border-red-500"
                  : "border-[#DCE3EA]"
              } bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]`}
            />

            {errors.currentPassword && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-['Montserrat'] text-[14px] font-medium text-[#334155]">
              New Password
            </label>

            <input
              type="password"
              value={form.newPassword}
              onChange={(e) =>
                updateField("newPassword", e.target.value)
              }
              placeholder="Enter new password"
              className={`h-[44px] w-full rounded-[12px] border ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-[#DCE3EA]"
              } bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]`}
            />

            {errors.newPassword && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-['Montserrat'] text-[14px] font-medium text-[#334155]">
              Confirm New Password
            </label>

            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                updateField("confirmPassword", e.target.value)
              }
              placeholder="Confirm new password"
              className={`h-[44px] w-full rounded-[12px] border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-[#DCE3EA]"
              } bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]`}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="h-[48px] w-[600px] rounded-[8px] bg-[#164D6F] px-4 font-['Montserrat'] text-[14px] font-medium text-white transition hover:bg-[#123F5B] disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={() => navigate("/dashboard/profile")}
        className="mt-[433px] flex h-[48px] w-[90px] items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-semibold text-white"
      >
        Back
      </button>
    </section>
  );
}

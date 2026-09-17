import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCamera,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import userHero from "../../assets/userHero.png";

interface ProfileForm {
  fullName: string;
  email: string;
  phone: string;
}

export default function UserEditProfilePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Connect this to your existing getCurrentUser service.
    // Keep the actual API call here rather than introducing mock data.
  }, []);

  const updateField = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setSaving(true);

    try {
      // Connect your update profile API here.

      toast.success("Profile updated successfully.");
      navigate("/dashboard/profile");
    } catch {
      toast.error("Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="w-full pb-12 pt-5 sm:pt-7">
      {/* Header */}
      <div className="mb-7 flex items-center gap-3 sm:mb-10">
        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#0F172A] transition hover:bg-white"
          aria-label="Go back to profile"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[22px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
          Profile
        </h1>
      </div>

      {/* Profile photo */}
      <div className="flex w-full max-w-[459px] flex-col gap-5 rounded-[10px] border border-[#0D2E431F] bg-white p-5 sm:h-[152px] sm:flex-row sm:items-center sm:gap-6">
        <div className="relative h-[112px] w-[112px] shrink-0 sm:h-[128px] sm:w-[141px]">
          <img
            src={userHero}
            alt="Profile"
            className="h-[112px] w-[112px] rounded-full object-cover sm:h-[128px] sm:w-[128px]"
          />

          <button
            type="button"
            aria-label="Change profile photo"
            className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#164D6F] text-white transition hover:bg-[#123F5B] sm:bottom-2 sm:right-[7px]"
          >
            <FiCamera size={13} />
          </button>
        </div>

        <button
          type="button"
          className="self-start font-['Montserrat'] text-[14px] font-semibold text-[#164D6F] transition hover:text-[#123F5B]"
        >
          Change Photo
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 w-full rounded-[12px] bg-white px-4 py-5 shadow-[0px_1px_2px_0px_#0000000D] sm:mt-7 sm:px-6 sm:py-6"
      >
        <div className="w-full max-w-[700px] space-y-5">
          {/* Full name */}
          <div>
            <label className="mb-2 block font-['Montserrat'] text-[13px] font-semibold text-[#64748B]">
              Full Name
            </label>

            <div className="relative">
              <FiUser
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />

              <input
                type="text"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Full Name"
                className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] pl-12 pr-4 text-[14px] text-[#0F172A] outline-none transition focus:border-[#164D6F] focus:ring-2 focus:ring-[#164D6F]/10"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-['Montserrat'] text-[13px] font-semibold text-[#64748B]">
              Email Address
            </label>

            <div className="relative">
              <FiMail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />

              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Email Address"
                className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] pl-12 pr-4 text-[14px] text-[#0F172A] outline-none transition focus:border-[#164D6F] focus:ring-2 focus:ring-[#164D6F]/10"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block font-['Montserrat'] text-[13px] font-semibold text-[#64748B]">
              Phone Number
            </label>

            <div className="relative">
              <FiPhone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />

              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+234 801 234 5678"
                className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] pl-12 pr-4 text-[14px] text-[#0F172A] outline-none transition focus:border-[#164D6F] focus:ring-2 focus:ring-[#164D6F]/10"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="mt-7 flex w-full justify-center sm:mt-8">
          <button
            type="submit"
            disabled={saving}
            className="h-[52px] w-full max-w-[600px] rounded-[12px] bg-[#164D6F] px-4 font-['Montserrat'] text-[14px] font-semibold text-white shadow-[0px_4px_7px_0px_#0000002B] transition hover:bg-[#123F5B] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[56px]"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Back button */}
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
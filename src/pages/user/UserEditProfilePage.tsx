import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCamera,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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

  const updateField = (
    field: keyof ProfileForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSaving(true);

    try {
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="px-0 pb-12 pt-[22px]">
      <div className="mb-[58px] flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="flex h-8 w-8 items-center justify-center text-[#0F172A]"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Profile
        </h1>
      </div>

      {/* Profile photo card */}
      <div className="flex h-[152px] w-[459px] items-center gap-6 rounded-[10px] border border-[#0D2E431F] px-5">
        <div className="relative h-[128px] w-[141px] flex-shrink-0">
          <img
            src={userHero}
            alt="Profile"
            className="h-[128px] w-[128px] rounded-full object-cover"
          />

          <button
            type="button"
            className="absolute bottom-2 right-[7px] flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 border-white bg-[#164D6F] text-white"
          >
            <FiCamera size={13} />
          </button>
        </div>

        <button
          type="button"
          className="font-['Montserrat'] text-[14px] font-semibold text-[#164D6F]"
        >
          Change Photo
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-[28px] w-full rounded-[12px] bg-white px-6 pb-6 pt-6 shadow-[0px_1px_2px_0px_#0000000D]"
      >
        <div className="space-y-5">
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
                value={form.fullName}
                onChange={(e) =>
                  updateField("fullName", e.target.value)
                }
                placeholder="Full Name"
                className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] pl-12 pr-4 text-[14px] text-[#0F172A] outline-none"
              />
            </div>
          </div>

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
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                placeholder="Email Address"
                className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] pl-12 pr-4 text-[14px] text-[#0F172A] outline-none"
              />
            </div>
          </div>

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
                value={form.phone}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                placeholder="+234 801 234 5678"
                className="h-[44px] w-full rounded-[12px] border border-[#DCE3EA] bg-[#F8FAFC] pl-12 pr-4 text-[14px] text-[#0F172A] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className="h-[56px] w-[600px] rounded-[12px] bg-[#164D6F] px-4 font-['Montserrat'] text-[14px] font-semibold text-white shadow-[0px_4px_7px_0px_#0000002B] transition hover:bg-[#123F5B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={() => navigate("/dashboard/profile")}
        className="mt-[226px] flex h-[48px] w-[90px] items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-semibold text-white"
      >
        Back
      </button>
    </section>
  );
}
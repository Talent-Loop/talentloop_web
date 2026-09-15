import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  Mail,
  CheckCircle2,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("Dave");
  const [lastName, setLastName] = useState("Ejike");
  const [email, setEmail] = useState("ejikedave@gmail.com");
  const [location, setLocation] = useState("State");
  const [experience, setExperience] = useState("2");
  const [about, setAbout] = useState(
    "Expert plumber with over 2 years of experience in residential and commercial plumbing systems. Specialized in leak detection, pipe installation, and emergency repairs. I pride myself on punctuality and high-quality workmanship."
  );

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      {/* SIDEBAR */}
      <ArtisanSidebar />

      {/* MAIN AREA */}
      <div className="min-w-0 flex-1">
        {/* HEADER */}
        <ArtisanHeader />

        <main className="px-8 pb-12 pt-5">
          <div className="max-w-[900px]">
            {/* PAGE TITLE */}
            <div className="mb-6 flex items-center gap-3">
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="flex h-8 w-8 items-center justify-center rounded-full text-[#52616B] transition hover:bg-white hover:text-[#10344A]"
    aria-label="Go back"
  >
    <ArrowLeft size={18} strokeWidth={1.8} />
  </button>

  <h1 className="text-[21px] font-semibold text-[#263842]">
    Profile
  </h1>
</div>

            {/* =========================================
                PROFILE PHOTO CARD
            ========================================= */}
            <section className="mb-7 flex h-[118px] w-[365px] items-center rounded-[8px] border border-[#E2E8E7] bg-white px-5 shadow-[0_1px_2px_rgba(16,52,74,0.02)]">
              {/* PHOTO */}
              <div className="relative shrink-0">
                <div className="h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-[#E5EAE9] bg-[#DCE5E3]">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                    alt="Dave Ejike"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* CAMERA BUTTON */}
                <button
                  type="button"
                  aria-label="Change profile photo"
                  className="absolute bottom-[-1px] right-[-1px] flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 border-white bg-[#10344A] text-white shadow-sm transition hover:bg-[#0B293A]"
                >
                  <Camera size={13} strokeWidth={2} />
                </button>
              </div>

              {/* CHANGE PHOTO */}
              <button
                type="button"
                className="ml-6 text-[12px] font-medium text-[#33454E] transition hover:text-[#10344A]"
              >
                Change Photo
              </button>
            </section>

            {/* =========================================
                FORM
            ========================================= */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSave();
              }}
              className="w-full"
            >
              {/* FIRST NAME */}
              <div className="mb-5">
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-[11px] font-medium text-[#3D4D55]"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="h-[46px] w-full rounded-[6px] border border-[#DDE4E2] bg-white px-4 text-[12px] text-[#34454E] outline-none transition placeholder:text-[#9AA4A8] focus:border-[#10344A]"
                />
              </div>

              {/* LAST NAME */}
              <div className="mb-5">
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-[11px] font-medium text-[#3D4D55]"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="h-[46px] w-full rounded-[6px] border border-[#DDE4E2] bg-white px-4 text-[12px] text-[#34454E] outline-none transition focus:border-[#10344A]"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-medium text-[#3D4D55]"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={15}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89969C]"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-[46px] w-full rounded-[6px] border border-[#DDE4E2] bg-white pl-11 pr-4 text-[12px] text-[#34454E] outline-none transition focus:border-[#10344A]"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div className="mb-5">
                <label
                  htmlFor="location"
                  className="mb-2 block text-[11px] font-medium text-[#3D4D55]"
                >
                  Location
                </label>

                <div className="relative">
                  <select
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="h-[46px] w-full appearance-none rounded-[6px] border border-[#DDE4E2] bg-white px-4 pr-10 text-[12px] text-[#34454E] outline-none transition focus:border-[#10344A]"
                  >
                    <option value="State">State</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Kano">Kano</option>
                  </select>

                  <ChevronDown
                    size={16}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#74828A]"
                  />
                </div>
              </div>

              {/* YEARS OF EXPERIENCE */}
              <div className="mb-5">
                <label
                  htmlFor="experience"
                  className="mb-2 block text-[11px] font-medium text-[#3D4D55]"
                >
                  Years of Experience
                </label>

                <input
                  id="experience"
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                  className="h-[46px] w-full rounded-[6px] border border-[#DDE4E2] bg-white px-4 text-[12px] text-[#34454E] outline-none transition focus:border-[#10344A]"
                />
              </div>

              {/* ABOUT */}
              <div className="mb-8">
                <label
                  htmlFor="about"
                  className="mb-2 block text-[11px] font-medium text-[#3D4D55]"
                >
                  About
                </label>

                <textarea
                  id="about"
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  rows={6}
                  className="min-h-[145px] w-full resize-none rounded-[6px] border border-[#DDE4E2] bg-white px-4 py-3 text-[12px] leading-[1.7] text-[#34454E] outline-none transition focus:border-[#10344A]"
                />
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex h-[50px] w-full max-w-[500px] items-center justify-center rounded-[7px] bg-[#10344A] text-[12px] font-semibold text-white shadow-[0_3px_8px_rgba(16,52,74,0.12)] transition hover:bg-[#0B293A] active:scale-[0.99]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* =========================================
          SUCCESS MESSAGE
      ========================================= */}
      {showSuccess && (
        <div className="fixed right-6 top-6 z-50 flex min-w-[280px] items-center gap-3 rounded-[8px] border border-[#D8E9DF] bg-white px-4 py-3 shadow-[0_5px_20px_rgba(0,0,0,0.10)]">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5F4EA]">
            <CheckCircle2
              size={17}
              strokeWidth={2}
              className="text-[#3D9560]"
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold text-[#263842]">
              Profile updated successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  MapPin,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

export default function WorkerProfilePage() {
  const navigate = useNavigate();

  const portfolioImages = [
    {
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=500&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=500&q=80",
      count: "2",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      {/* SIDEBAR */}
      <ArtisanSidebar />

      {/* MAIN CONTENT */}
      <div className="min-w-0 flex-1">
        <ArtisanHeader />

        <main className="px-8 pb-10 pt-3">
          <div className="max-w-[1060px]">

            {/* PAGE TITLE */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#52616B] transition hover:bg-white hover:text-[#10344A]"
                >
                  <ArrowLeft size={18} strokeWidth={1.8} />
                </button>

                <h1 className="text-[21px] font-semibold text-[#25343D]">
                  Worker Profile
                </h1>
              </div>

              {/* EDIT PROFILE */}
              <button
                type="button"
                onClick={() => navigate("/profile/edit")}
                className="flex h-[34px] min-w-[96px] items-center justify-center rounded-[6px] bg-[#10344A] px-4 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#0B293A]"
              >
                Edit Profile
              </button>
            </div>

            {/* PROFILE SUMMARY */}
            <section className="mb-5 rounded-[9px] border border-[#E2E8E7] bg-white px-6 py-5 shadow-[0_1px_2px_rgba(16,52,74,0.02)]">
              <div className="flex items-center justify-between gap-8">

                {/* PERSONAL INFO */}
                <div className="flex min-w-0 items-center gap-5">

                  {/* PROFILE PHOTO */}
                  <div className="relative shrink-0">
                    <div className="h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-[#E8ECEB] bg-[#DCE5E3]">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                        alt="Dave Ejike"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/profile/edit")}
                      className="absolute bottom-0 right-0 flex h-[25px] w-[25px] items-center justify-center rounded-full border-2 border-white bg-[#10344A] text-white shadow-sm transition hover:bg-[#0B293A]"
                    >
                      <Camera size={12} strokeWidth={2} />
                    </button>
                  </div>

                  {/* NAME */}
                  <div>
                    <h2 className="text-[17px] font-semibold text-[#263842]">
                      Dave Ejike
                    </h2>

                    <p className="mt-1 text-[12px] font-medium text-[#65757E]">
                      Professional Plumber
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#89969C]">
                      <MapPin size={13} strokeWidth={1.8} />
                      <span>Lagos, Nigeria</span>
                    </div>
                  </div>
                </div>

                {/* STATISTICS */}
                <div className="flex shrink-0 items-center gap-3">

                  <div className="flex h-[70px] w-[91px] flex-col items-center justify-center rounded-[7px] border border-[#E5EAE9] bg-[#FCFDFD]">
                    <span className="text-[20px] font-semibold leading-none text-[#263842]">
                      4.8
                    </span>
                    <span className="mt-2 text-[8px] font-medium tracking-[0.08em] text-[#929DA1]">
                      RATING
                    </span>
                  </div>

                  <div className="flex h-[70px] w-[91px] flex-col items-center justify-center rounded-[7px] border border-[#E5EAE9] bg-[#FCFDFD]">
                    <span className="text-[20px] font-semibold leading-none text-[#263842]">
                      56
                    </span>
                    <span className="mt-2 text-[8px] font-medium tracking-[0.08em] text-[#929DA1]">
                      JOBS DONE
                    </span>
                  </div>

                  <div className="flex h-[70px] w-[91px] flex-col items-center justify-center rounded-[7px] border border-[#E5EAE9] bg-[#FCFDFD]">
                    <span className="text-[20px] font-semibold leading-none text-[#263842]">
                      2yrs
                    </span>
                    <span className="mt-2 text-[8px] font-medium tracking-[0.08em] text-[#929DA1]">
                      EXP
                    </span>
                  </div>

                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section className="mb-5 rounded-[9px] border border-[#E2E8E7] bg-white px-6 py-5">
              <h2 className="mb-3 text-[14px] font-semibold text-[#263842]">
                About
              </h2>

              <p className="max-w-[900px] text-[11px] leading-[1.8] text-[#78878E]">
                Expert plumber with over 2 years of experience in residential
                and commercial plumbing systems. Specialized in leak
                detection, pipe installation, and emergency repairs. I pride
                myself on punctuality and high-quality workmanship.
              </p>
            </section>

            {/* PORTFOLIO */}
            <section className="mb-5 rounded-[9px] border border-[#E2E8E7] bg-white px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[#263842]">
                  Portfolio
                </h2>

                <button
                  type="button"
                  className="text-[10px] font-medium text-[#66777F] transition hover:text-[#10344A]"
                >
                  View all
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1">
                {portfolioImages.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="group relative h-[96px] w-[100px] shrink-0 overflow-hidden rounded-[14px] bg-[#17232A]"
                  >
                    <img
                      src={item.image}
                      alt={`Plumbing portfolio ${index + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/15" />

                    {item.count && (
                      <div className="absolute bottom-2 right-2 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-white/95 px-1.5 text-[9px] font-semibold text-[#263842] shadow-sm">
                        {item.count}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* REVIEWS */}
            <section className="mb-5 rounded-[9px] border border-[#E2E8E7] bg-white px-6 py-5">

              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[#263842]">
                  Reviews
                </h2>

                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="text-[13px] text-[#D99A32]">★</span>
                  <span className="font-semibold text-[#5D6970]">
                    4.8
                  </span>
                  <span className="text-[#929DA1]">
                    (94 reviews)
                  </span>
                </div>
              </div>

              {/* REVIEW 1 */}
              <div className="border-b border-[#EEF1F0] py-4 first:pt-0">
                <div className="flex items-start justify-between gap-8">
                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#DDEEE5] text-[11px] font-semibold text-[#4E7560]">
                      SA
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[11px] font-semibold text-[#34454E]">
                        Sarah Adams
                      </h3>

                      <p className="mt-1 max-w-[700px] text-[10px] leading-[1.7] text-[#849197]">
                        Emeka was very professional and fixed our kitchen leak
                        in no time. Highly recommended!
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-[2px] pt-1 text-[12px] text-[#D99A32]">
                    ★★★★★
                  </div>
                </div>
              </div>

              {/* REVIEW 2 */}
              <div className="pt-4">
                <div className="flex items-start justify-between gap-8">

                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#DDEEE5] text-[11px] font-semibold text-[#4E7560]">
                      SA
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[11px] font-semibold text-[#34454E]">
                        Sarah Adams
                      </h3>

                      <p className="mt-1 max-w-[700px] text-[10px] leading-[1.7] text-[#849197]">
                        Emeka was very professional and fixed our kitchen leak
                        in no time. Highly recommended!
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-[2px] pt-1 text-[12px] text-[#D99A32]">
                    ★★★
                  </div>

                </div>
              </div>

            </section>

            {/* BACK BUTTON */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex h-[38px] min-w-[72px] items-center justify-center gap-2 rounded-[6px] bg-[#10344A] px-4 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#0B293A]"
              >
                <ArrowLeft size={14} strokeWidth={2} />
                Back
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Pencil } from "lucide-react";
import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

export default function JobProgressPage() {
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = useState(false);

  // Check if the job has been completed
  useEffect(() => {
    const completed = localStorage.getItem("fixKitchenSinkCompleted");

    if (completed === "true") {
      setIsCompleted(true);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdateStatus = () => {
    navigate("/my-jobs/update-status");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <ArtisanHeader />

        <div className="px-8 pb-12 pt-10 md:px-12">
          {/* Page Title */}
          <h1 className="text-[22px] font-semibold text-[#27364A]">
            My Job Progress
          </h1>

          {/* Job Information */}
          <div className="mt-7">
            <h2 className="text-[16px] font-semibold text-[#27364A]">
              Fix Leaking Pipe
            </h2>

            <p className="mt-1.5 text-[12px] text-[#8994A2]">
              Plumbing · Lekki Phase 1
            </p>
          </div>

          {/* Job Progress */}
          <section className="mt-12 max-w-[850px]">
            {/* Progress Header */}
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[#354357]">
                Job Progress
              </h3>

              {/* Hide Update Status when job is completed */}
              {!isCompleted && (
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-[#506B8B] transition hover:text-[#294C76]"
                >
                  Update Status
                  <Pencil size={11} />
                </button>
              )}
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[12px] top-[25px] h-[155px] w-px bg-[#DDE2E7]" />

              {/* =================================
                  STAGE 1 - ACCEPTED
              ================================= */}
              <div className="relative flex min-h-[90px]">
                <div className="relative z-10 flex w-[25px] shrink-0 items-start justify-center">
                  <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#35A66F] text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>

                <div className="ml-4 pt-0.5">
                  <h4 className="text-[13px] font-bold text-[#3B485A]">
                    Accepted
                  </h4>

                  <p className="mt-1 text-[10px] text-[#8994A2]">
                    Job approved on Oct 12, 10:30 AM
                  </p>
                </div>
              </div>

              {/* =================================
                  STAGE 2 - IN PROGRESS
              ================================= */}
              <div className="relative flex min-h-[90px]">
                <div className="relative z-10 flex w-[25px] shrink-0 items-start justify-center">
                  <div
                    className={`flex h-[25px] w-[25px] items-center justify-center rounded-full text-[10px] font-semibold text-white ${
                      isCompleted
                        ? "bg-[#35A66F]"
                        : "bg-[#172D4A]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={14} strokeWidth={3} />
                    ) : (
                      "2"
                    )}
                  </div>
                </div>

                <div className="ml-4 pt-0.5">
                  <h4 className="text-[13px] font-bold text-[#3B485A]">
                    In progress
                  </h4>

                  <p className="mt-1 text-[10px] text-[#8994A2]">
                    Currently in progress.
                  </p>
                </div>
              </div>

              {/* =================================
                  STAGE 3 - COMPLETED
              ================================= */}
              <div className="relative flex min-h-[75px]">
                <div className="relative z-10 flex w-[25px] shrink-0 items-start justify-center">
                  <div
                    className={`flex h-[25px] w-[25px] items-center justify-center rounded-full ${
                      isCompleted
                        ? "bg-[#35A66F] text-white"
                        : "border-[1.5px] border-[#CFD5DC] bg-white"
                    }`}
                  >
                    {isCompleted && (
                      <Check size={14} strokeWidth={3} />
                    )}
                  </div>
                </div>

                <div className="ml-4 pt-0.5">
                  <h4
                    className={`text-[13px] ${
                      isCompleted
                        ? "font-bold text-[#3B485A]"
                        : "font-medium text-[#A7AFB9]"
                    }`}
                  >
                    Completed
                  </h4>

                  <p
                    className={`mt-1 text-[10px] ${
                      isCompleted
                        ? "text-[#8994A2]"
                        : "text-[#A7AFB9]"
                    }`}
                  >
                    Final stage
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="mt-8 flex h-[32px] items-center gap-1.5 rounded-[4px] bg-[#172D4A] px-4 text-[11px] font-medium text-white transition hover:bg-[#203B5D]"
            >
              <ArrowLeft size={12} />
              Back
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}


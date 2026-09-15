
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

type Status = "Accepted" | "In Progress" | "Completed";

export default function UpdateJobStatusPage() {
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] =
    useState<Status>("Accepted");

  const [showCompletionModal, setShowCompletionModal] =
    useState(false);

  const handleUpdateStatus = () => {
    if (selectedStatus === "Completed") {
      setShowCompletionModal(true);
      return;
    }

    // Status is updated for Accepted / In Progress.
    // The selected state remains visible.
  };

  const handleBack = () => {
    navigate(-1);
  };

 const handleConfirm = () => {
  localStorage.setItem("fixKitchenSinkCompleted", "true");
  setShowCompletionModal(false);
  navigate("/my-jobs/0");
};

  const statuses = [
    {
      value: "Accepted" as Status,
      description: "Job has been accepted but not begun",
    },
    {
      value: "In Progress" as Status,
      description: "Work has begun on-site",
    },
    {
      value: "Completed" as Status,
      description: "Service is finished and verified",
    },
  ];

  const statusOrder: Status[] = [
    "Accepted",
    "In Progress",
    "Completed",
  ];

  const selectedIndex = statusOrder.indexOf(selectedStatus);

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

          {/* Job Information Card */}
          <div className="mt-7 w-full max-w-[850px] rounded-[10px] border border-[#E7EBEF] bg-white px-5 py-4 shadow-[0_2px_7px_rgba(0,0,0,0.03)]">
            <h2 className="text-[15px] font-semibold text-[#27364A]">
              Fix Kitchen Sink
            </h2>

            <p className="mt-1.5 text-[11px] text-[#8994A2]">
              Plumbing · Lekki, Lagos
            </p>
          </div>

          {/* Status Selection */}
          <section className="mt-9 w-full max-w-[850px]">
            <h3 className="mb-5 text-[13px] font-medium text-[#3B485A]">
              Select Current Status
            </h3>

            {/* Status Options */}
            <div className="space-y-3">
              {statuses.map((status) => {
                const statusIndex = statusOrder.indexOf(status.value);

                // Every stage up to the current stage stays green.
                const isCompleted =
                  statusIndex <= selectedIndex;

                const isCurrent =
                  selectedStatus === status.value;

                return (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() =>
                      setSelectedStatus(status.value)
                    }
                    className={`flex w-full items-center justify-between rounded-[8px] border bg-white px-5 py-4 text-left transition ${
                      isCompleted
                        ? "border-[1.5px] border-[#35A66F]"
                        : "border-[#E2E6EA] hover:border-[#C8D0D8]"
                    }`}
                  >
                    {/* Status Text */}
                    <div>
                      <h4
                        className={`text-[13px] ${
                          isCompleted
                            ? "font-bold text-[#354357]"
                            : "font-medium text-[#A7AFB9]"
                        }`}
                      >
                        {status.value}
                      </h4>

                      <p
                        className={`mt-1 text-[10px] ${
                          isCompleted
                            ? "text-[#929BA6]"
                            : "text-[#A7AFB9]"
                        }`}
                      >
                        {status.description}
                      </p>
                    </div>

                    {/* Radio */}
                    <div
                      className={`flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border ${
                        isCompleted
                          ? "border-[#35A66F]"
                          : "border-[#BFC6CE]"
                      }`}
                    >
                      {isCompleted && (
                        <div className="h-[9px] w-[9px] rounded-full bg-[#35A66F]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Update Status Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="h-[45px] w-full max-w-[440px] rounded-[6px] bg-[#172D4A] text-[13px] font-medium text-white transition hover:bg-[#203B5D]"
              >
                Update Status
              </button>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="mt-12 flex h-[32px] items-center gap-1.5 rounded-[4px] bg-[#172D4A] px-4 text-[11px] font-medium text-white transition hover:bg-[#203B5D]"
            >
              <ArrowLeft size={12} />
              Back
            </button>
          </section>
        </div>
      </main>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="w-full max-w-[380px] rounded-[10px] bg-white px-7 py-8 text-center shadow-[0_10px_35px_rgba(0,0,0,0.15)]">
            {/* Green Check */}
            <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#35A66F] text-white">
              <Check size={25} strokeWidth={3} />
            </div>

            {/* Title */}
            <h2 className="mt-5 text-[16px] font-bold text-[#27364A]">
              Job completed
            </h2>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-[270px] text-[11px] leading-5 text-[#8994A2]">
              Great work! Confirm payment to close the job
            </p>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="mt-6 h-[40px] w-full rounded-[6px] bg-[#172D4A] text-[12px] font-medium text-white transition hover:bg-[#203B5D]"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


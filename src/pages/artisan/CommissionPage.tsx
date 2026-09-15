import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  Landmark,
  X,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

type ProjectStatus = "PENDING" | "PAID";

type Project = {
  status: ProjectStatus;
  commission: string;
};

const projects: Project[] = [
  {
    status: "PENDING",
    commission: "₦1,000",
  },
  {
    status: "PENDING",
    commission: "₦450.00",
  },
  {
    status: "PAID",
    commission: "₦1,000",
  },
  {
    status: "PAID",
    commission: "₦1,000",
  },
];

export default function CommissionPage() {
  const navigate = useNavigate();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#263238]">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 bg-[#FCFDFD]">
        {/* Header */}
        <ArtisanHeader />

        <div className="px-7 pb-10 pt-7 sm:px-8 lg:px-10">
          {/* Page Title */}
          <div className="mb-5">
            <h1 className="text-[25px] font-semibold tracking-[-0.3px] text-[#263238]">
              Commission
            </h1>
          </div>

          {/* Commission Hero Card */}
          <section
            className="
              relative
              flex
              min-h-[145px]
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-[16px]
              px-6
              py-6
              shadow-[0_5px_20px_rgba(16,52,74,0.08)]
            "
            style={{
              background:
                "linear-gradient(108deg, #123A53 0%, #153E54 38%, #4E4140 67%, #A76B43 100%)",
            }}
          >
            {/* Subtle warm glow */}
            <div className="pointer-events-none absolute -right-20 top-[-80px] h-[240px] w-[240px] rounded-full bg-[#D8894F]/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[2px] text-white/80">
                COMMISSION DUE
              </p>

              <h2 className="text-[38px] font-bold leading-[1.1] tracking-[-1px] text-white sm:text-[42px]">
                ₦1,450.00
              </h2>

              <div className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-white/15 px-3 py-[5px] backdrop-blur-sm">
                <span className="text-[11px] font-medium text-white/90">
                  ↗ +12.5% this month
                </span>
              </div>
            </div>
          </section>

          {/* Notice + Payment */}
          <section className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Notice */}
            <div className="flex min-h-[50px] flex-1 items-center rounded-[10px] bg-[#FFFDF3] px-4 py-3">
              <div className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF3C7]">
                <AlertCircle
                  size={15}
                  strokeWidth={2}
                  className="text-[#B88922]"
                />
              </div>

              <p className="text-[12px] leading-5 text-[#9B7A2E]">
                You must pay your commission after 3 completed jobs to
                continue accepting new jobs.
              </p>
            </div>

            {/* Payment Button */}
            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="
                flex
                h-[50px]
                w-full
                shrink-0
                items-center
                justify-center
                rounded-[9px]
                bg-[#10344A]
                px-7
                text-[13px]
                font-semibold
                text-white
                shadow-[0_4px_12px_rgba(16,52,74,0.14)]
                transition-all
                duration-200
                hover:bg-[#17465F]
                hover:shadow-[0_6px_16px_rgba(16,52,74,0.18)]
                active:scale-[0.99]
                sm:w-[205px]
              "
            >
              Pay Commission Now
            </button>
          </section>

          {/* Recent Projects */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-[#263238]">
                Recent Projects
              </h2>

              <button
                type="button"
                className="text-[12px] font-medium text-[#B87948] transition-colors hover:text-[#965B32]"
              >
                View All
              </button>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard
                  key={`${project.status}-${index}`}
                  project={project}
                />
              ))}
            </div>
          </section>

          {/* Back Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="
                inline-flex
                h-[40px]
                items-center
                gap-2
                rounded-[8px]
                bg-[#10344A]
                px-5
                text-[12px]
                font-medium
                text-white
                shadow-[0_3px_10px_rgba(16,52,74,0.12)]
                transition-all
                duration-200
                hover:bg-[#17465F]
                hover:shadow-[0_5px_13px_rgba(16,52,74,0.16)]
              "
            >
              <ArrowLeft size={15} strokeWidth={2} />
              Back
            </button>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* CAUTION MODAL                                             */}
      {/* ========================================================= */}

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D2635]/35 px-4 backdrop-blur-[2px]">
          <div className="relative w-full max-w-[430px] rounded-[16px] bg-white px-8 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="
                absolute
                right-5
                top-5
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-[#68747A]
                transition-colors
                hover:bg-[#F4F6F7]
                hover:text-[#263238]
              "
              aria-label="Close"
            >
              <X size={18} strokeWidth={2} />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center">
              {/* Warning Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF5D8]">
                <AlertCircle
                  size={24}
                  strokeWidth={2}
                  className="text-[#C28A2A]"
                />
              </div>

              {/* Title */}
              <h2 className="mt-4 text-[20px] font-semibold text-[#263238]">
                Caution
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-[330px] text-[13px] leading-[22px] text-[#737E84]">
                Please transfer the exact amount to the bank account details
                provided to complete your subscription.
              </p>

              {/* Proceed */}
              <button
                type="button"
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowBankDetails(true);
                }}
                className="
                  mt-7
                  flex
                  h-[46px]
                  w-full
                  items-center
                  justify-center
                  rounded-[9px]
                  bg-[#10344A]
                  text-[13px]
                  font-semibold
                  text-white
                  shadow-[0_4px_12px_rgba(230,145,65,0.28)]
                  transition-all
                  duration-200
                  hover:bg-[#17465F]
                  hover:shadow-[0_6px_16px_rgba(230,145,65,0.35)]
                  active:scale-[0.99]
                "
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TRANSFER FUNDS MODAL                                     */}
      {/* ========================================================= */}

      {showBankDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D2635]/35 px-4 backdrop-blur-[2px]">
          <div className="relative w-full max-w-[500px] rounded-[16px] bg-white px-8 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowBankDetails(false)}
              className="
                absolute
                right-5
                top-5
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-[#68747A]
                transition-colors
                hover:bg-[#F4F6F7]
                hover:text-[#263238]
              "
              aria-label="Close"
            >
              <X size={18} strokeWidth={2} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center">
              {/* Bank Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4F7]">
                <Landmark
                  size={24}
                  strokeWidth={2}
                  className="text-[#10344A]"
                />
              </div>

              {/* Title */}
              <h2 className="mt-4 text-[20px] font-semibold text-[#263238]">
                Transfer Funds
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-[390px] text-[13px] leading-[22px] text-[#737E84]">
                Please transfer the exact amount to the bank account details
                provided below to complete your subscription.
              </p>
            </div>

            {/* Bank Details */}
            <div className="mt-7 rounded-[10px] border border-[#EDF0F1] bg-[#FBFCFC] px-5 py-2">
              {/* Bank Name */}
              <div className="flex min-h-[55px] items-center justify-between gap-5 border-b border-[#EDF0F1]">
                <span className="text-[12px] font-medium text-[#7A858B]">
                  Bank Name
                </span>

                <span className="text-right text-[12px] font-semibold text-[#263238]">
                  Horizonatl Finaancial Bank
                </span>
              </div>

              {/* Account Number */}
              <div className="flex min-h-[55px] items-center justify-between gap-5 border-b border-[#EDF0F1]">
                <span className="text-[12px] font-medium text-[#7A858B]">
                  Account Number
                </span>

                <span className="text-right text-[12px] font-semibold tracking-[0.3px] text-[#263238]">
                  2234578998
                </span>
              </div>

              {/* Account Name */}
              <div className="flex min-h-[55px] items-center justify-between gap-5">
                <span className="text-[12px] font-medium text-[#7A858B]">
                  Account Name
                </span>

                <span className="text-right text-[12px] font-semibold text-[#263238]">
                  SaaS Flow Pro Inc.
                </span>
              </div>
            </div>

            {/* I Have Paid */}
            <button
              type="button"
              onClick={() => {
                setShowBankDetails(false);
                setShowVerification(true);

                setTimeout(() => {
                  setShowVerification(false);
                  setShowSuccess(true);
                }, 3000);
              }}
              className="
                mt-6
                flex
                h-[47px]
                w-full
                items-center
                justify-center
                rounded-[9px]
                bg-[#10344A]
                text-[13px]
                font-semibold
                text-white
                shadow-[0_4px_12px_rgba(230,145,65,0.28)]
                transition-all
                duration-200
                hover:bg-[#17465F]
                hover:shadow-[0_6px_16px_rgba(230,145,65,0.35)]
                active:scale-[0.99]
              "
            >
              I have paid
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VERIFICATION IN PROGRESS MODAL                            */}
      {/* ========================================================= */}

      {showVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D2635]/35 px-4 backdrop-blur-[2px]">
          <div className="relative flex w-full max-w-[430px] flex-col items-center rounded-[16px] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            {/* Clock Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF5EA]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E69141]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="#E69141"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M12 7V12L15 14"
                    stroke="#E69141"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-5 text-[20px] font-semibold text-[#263238]">
              Verification in progress
            </h2>

            {/* Loading / Verifying Circle */}
            <div className="relative mt-8 flex h-[58px] w-[58px] items-center justify-center">
              <div className="absolute h-[58px] w-[58px] animate-spin rounded-full border-[4px] border-[#F6E5D3] border-t-[#E69141]" />

              <div className="h-[38px] w-[38px] rounded-full bg-white" />
            </div>

            {/* Supporting Text */}
            <p className="mt-6 max-w-[340px] text-center text-[13px] leading-[21px] text-[#737E84]">
              We are verifying your payment. Please wait while we confirm your
              transaction.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SAVE SUCCESSFULLY MODAL                                   */}
      {/* ========================================================= */}

      
       {showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D2635]/35 px-4 backdrop-blur-[2px]">
    <div className="relative flex w-full max-w-[430px] flex-col items-center rounded-[16px] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      {/* Success Icon Box */}
      <div
        className="
          flex
          h-[72px]
          w-[72px]
          items-center
          justify-center
          rounded-[10px]
          border
          border-[#E3EAF0]
          bg-white
          shadow-[0_10px_24px_rgba(16,52,74,0.18)]
        "
      >
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EEF7F2]">
          <Check
            size={25}
            strokeWidth={2.5}
            className="text-[#31935A]"
          />
        </div>
      </div>

      {/* Success Text */}
      <h2 className="mt-6 text-[20px] font-semibold text-[#263238]">
        Save successfully
      </h2>

      {/* Done Button */}
      <button
        type="button"
        onClick={() => setShowSuccess(false)}
        className="
          mt-7
          flex
          h-[46px]
          w-full
          items-center
          justify-center
          rounded-[9px]
          bg-[#10344A]
          text-[13px]
          font-semibold
          text-white
          shadow-[0_4px_12px_rgba(230,145,65,0.28)]
          transition-all
          duration-200
          hover:bg-[#17465F]
          hover:shadow-[0_6px_16px_rgba(230,145,65,0.35)]
          active:scale-[0.99]
        "
      >
        Done
      </button>
    </div>
  </div>
)}
     
    </div>
  );
}

/* =============================================================== */
/* PROJECT CARD                                                    */
/* =============================================================== */

function ProjectCard({ project }: { project: Project }) {
  const isPaid = project.status === "PAID";

  return (
    <article
      className="
        group
        min-h-[177px]
        rounded-[12px]
        border
        border-[#EDF0F1]
        bg-white
        p-5
        shadow-[0_2px_9px_rgba(24,42,52,0.025)]
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-[0_5px_16px_rgba(24,42,52,0.07)]
      "
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-start gap-3">
          {/* Tool Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F4F5]">
            <BriefcaseBusiness
              size={17}
              strokeWidth={1.8}
              className="text-[#315A70]"
            />
          </div>

          <div className="min-w-0 pt-[1px]">
            <h3 className="truncate text-[13px] font-semibold text-[#263238]">
              Fixing of Sink
            </h3>

            <p className="mt-[5px] text-[10px] text-[#899399]">
              Completed May 12, 2024
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`
            ml-3
            shrink-0
            rounded-full
            px-3
            py-[5px]
            text-[9px]
            font-semibold
            tracking-[0.3px]
            ${
              isPaid
                ? "bg-[#EDF8F1] text-[#31935A]"
                : "bg-[#FFF7E5] text-[#B98222]"
            }
          `}
        >
          {project.status}
        </span>
      </div>

      {/* Financial Information */}
      <div className="mt-6 grid grid-cols-2">
        {/* Earning */}
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#9AA3A8]">
            EARNING
          </p>

          <p className="mt-1 text-[14px] font-semibold text-[#37434A]">
            ₦11,500
          </p>
        </div>

        {/* Commission */}
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#9AA3A8]">
            COMMISSION
          </p>

          <p
            className={`mt-1 text-[14px] font-semibold ${
              isPaid ? "text-[#31935A]" : "text-[#C28A2A]"
            }`}
          >
            {project.commission}
          </p>
        </div>
      </div>
    </article>
  );
}
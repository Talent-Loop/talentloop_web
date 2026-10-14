import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Pencil } from "lucide-react";
import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

interface Job {
  _id: string;
  title?: string;
  serviceId?: string;
  jobLocation?: string;
  status?: string;
  budget?: number;
  agreedPrice?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export default function JobProgressPage() {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setError("Job ID is missing.");
        setLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You are not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://backend-talentloop.onrender.com/api/v1/jobs/${jobId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "*/*",
            },
          }
        );

        const data = await response.json();

        console.log("JOB PROGRESS API RESPONSE:", data);

        if (!response.ok) {
          setError(data?.message || "Failed to fetch job.");
          return;
        }

        const fetchedJob = data?.data?.data || data?.data;

        setJob(fetchedJob);
      } catch (err) {
        console.error("JOB PROGRESS API ERROR:", err);
        setError("Something went wrong while loading the job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdateStatus = () => {
    if (!jobId) return;

    navigate(`/my-jobs/update-status?jobId=${jobId}`);
  };

  const status = job?.status?.toLowerCase() || "";

  const isInProgress =
    status === "in_progress" ||
    status === "progress" ||
    status === "in-progress";

  const isCompleted = status === "completed";

  const isAccepted =
    status === "accepted" ||
    status === "assigned" ||
    isInProgress ||
    isCompleted;

  const formatDate = (date?: string) => {
    if (!date) return "Job accepted";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Job accepted";
    }

    return `Job approved on ${parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}, ${parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
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

          {/* Loading */}
          {loading && (
            <div className="mt-10 text-[13px] text-[#8994A2]">
              Loading job...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-10">
              <p className="text-[13px] text-red-500">{error}</p>

              <button
                type="button"
                onClick={handleBack}
                className="mt-5 flex h-[32px] items-center gap-1.5 rounded-[4px] bg-[#172D4A] px-4 text-[11px] font-medium text-white transition hover:bg-[#203B5D]"
              >
                <ArrowLeft size={12} />
                Back
              </button>
            </div>
          )}

          {/* Job Content */}
          {!loading && !error && job && (
            <>
              {/* Job Information */}
              <div className="mt-7">
                <h2 className="text-[16px] font-semibold text-[#27364A]">
                  {job.title || "Untitled Job"}
                </h2>

                <p className="mt-1.5 text-[12px] text-[#8994A2]">
                  {job.serviceId || "Service"} ·{" "}
                  {job.jobLocation || "Location not provided"}
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
                      <div
                        className={`flex h-[25px] w-[25px] items-center justify-center rounded-full ${
                          isAccepted
                            ? "bg-[#35A66F] text-white"
                            : "border-[1.5px] border-[#CFD5DC] bg-white"
                        }`}
                      >
                        {isAccepted && (
                          <Check size={14} strokeWidth={3} />
                        )}
                      </div>
                    </div>

                    <div className="ml-4 pt-0.5">
                      <h4
                        className={`text-[13px] ${
                          isAccepted
                            ? "font-bold text-[#3B485A]"
                            : "font-medium text-[#A7AFB9]"
                        }`}
                      >
                        Accepted
                      </h4>

                      <p className="mt-1 text-[10px] text-[#8994A2]">
                        {isAccepted
                          ? formatDate(job.updatedAt || job.createdAt)
                          : "Waiting for job acceptance."}
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
                          isCompleted || isInProgress
                            ? "bg-[#35A66F]"
                            : "bg-[#172D4A]"
                        }`}
                      >
                        {isCompleted || isInProgress ? (
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
                        {isCompleted
                          ? "Job is completed."
                          : isInProgress
                          ? "Currently in progress."
                          : "Waiting to start."}
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
                        {isCompleted
                          ? "Job completed successfully."
                          : "Final stage"}
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
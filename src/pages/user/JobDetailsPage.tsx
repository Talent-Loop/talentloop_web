
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Wallet,
} from "lucide-react";
import clientApi from "../../services/clientApi";

interface JobMilestone {
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  status?: string;
}

interface JobDetails {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  budget?: number | string;
  jobLocation?: string;
  location?: string;
  category?: string | { name?: string };
  service?: string | { name?: string };
  serviceId?: string | { name?: string };
  createdAt?: string;
  photo?: string;
  photos?: string[];
  milestones?: JobMilestone[];
}

function getJobFromResponse(responseData: unknown): JobDetails | null {
  if (!responseData || typeof responseData !== "object") {
    return null;
  }

  const response = responseData as {
    data?: unknown;
  };

  let result = response.data;

  // Supports APIs that wrap the job inside data.data.
  if (result && typeof result === "object" && "data" in result) {
    const nested = (result as { data?: unknown }).data;

    if (nested && typeof nested === "object") {
      result = nested;
    }
  }

  if (!result || typeof result !== "object" || Array.isArray(result)) {
    return null;
  }

  return result as JobDetails;
}

function getName(
  value: string | { name?: string } | undefined,
): string {
  if (typeof value === "string") return value;
  return value?.name ?? "";
}

function formatStatus(status?: string): string {
  if (!status) return "Unknown";

  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date?: string): string {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatBudget(budget?: number | string): string {
  if (budget === undefined || budget === null || budget === "") {
    return "Not specified";
  }

  const amount = Number(budget);

  if (!Number.isFinite(amount)) {
    return String(budget);
  }

  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchJob() {
      if (!id) {
        setError("No job ID was provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await clientApi.get(
          `/jobs/${encodeURIComponent(id)}`,
        );

        const jobData = getJobFromResponse(response.data);

        if (!jobData) {
          throw new Error("The job details could not be read.");
        }

        if (!cancelled) {
          setJob(jobData);
        }
      } catch (err: unknown) {
        if (cancelled) return;

        const message =
          typeof err === "object" &&
          err !== null &&
          "response" in err
            ? (
                err as {
                  response?: {
                    data?: {
                      message?: string | string[];
                    };
                  };
                }
              ).response?.data?.message
            : undefined;

        setError(
          Array.isArray(message)
            ? message.join(", ")
            : typeof message === "string"
              ? message
              : err instanceof Error
                ? err.message
                : "Unable to load this job. Please try again.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchJob();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const category =
    getName(job?.service) ||
    getName(job?.category) ||
    getName(job?.serviceId);

  const location = job?.jobLocation || job?.location;
  const status = formatStatus(job?.status);

  const statusColor =
    job?.status?.toLowerCase() === "completed"
      ? "bg-green-100 text-green-700"
      : job?.status?.toLowerCase() === "cancelled"
        ? "bg-red-100 text-red-700"
        : job?.status?.toLowerCase() === "in_progress"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#10344A]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#10344A]" />
            <p className="text-sm text-gray-500">
              Loading job details...
            </p>
          </div>
        ) : error || !job ? (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <h1 className="text-lg font-semibold text-gray-900">
              Unable to load job
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {error || "This job could not be found."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-lg bg-[#10344A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#174963]"
              >
                Try Again
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard/jobs")}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                View My Jobs
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-500">
                    Job Details
                  </p>

                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {job.title || "Untitled Job"}
                  </h1>

                  {category && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <BriefcaseBusiness size={16} />
                      {category}
                    </p>
                  )}
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${statusColor}`}
                >
                  {status}
                </span>
              </div>
            </div>

            {job.photo && (
              <div className="border-b border-gray-100 p-6 sm:px-8">
                <img
                  src={job.photo}
                  alt={job.title || "Job"}
                  className="max-h-80 w-full rounded-xl object-cover"
                />
              </div>
            )}

            {job.photos && job.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3 border-b border-gray-100 p-6 sm:grid-cols-3 sm:px-8">
                {job.photos.map((photo, index) => (
                  <img
                    key={`${photo}-${index}`}
                    src={photo}
                    alt={`Job photo ${index + 1}`}
                    className="h-36 w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            <div className="grid gap-4 border-b border-gray-100 p-6 sm:grid-cols-3 sm:px-8">
              <div className="rounded-xl bg-gray-50 p-4">
                <Wallet className="mb-3 text-[#10344A]" size={20} />
                <p className="text-xs text-gray-500">Budget</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {formatBudget(job.budget)}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <MapPin className="mb-3 text-[#10344A]" size={20} />
                <p className="text-xs text-gray-500">Location</p>
                <p className="mt-1 break-words font-semibold text-gray-900">
                  {location || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <CalendarDays className="mb-3 text-[#10344A]" size={20} />
                <p className="text-xs text-gray-500">Date Posted</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {formatDate(job.createdAt)}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Description
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {job.description || "No description was provided for this job."}
              </p>

              {job.milestones && job.milestones.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Milestones
                  </h2>

                  <div className="mt-4 space-y-3">
                    {job.milestones.map((milestone, index) => (
                      <div
                        key={milestone._id || index}
                        className="rounded-xl border border-gray-100 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-medium text-gray-800">
                            {milestone.title ||
                              milestone.name ||
                              `Milestone ${index + 1}`}
                          </p>

                          {milestone.status && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                              {formatStatus(milestone.status)}
                            </span>
                          )}
                        </div>

                        {milestone.description && (
                          <p className="mt-2 text-sm text-gray-500">
                            {milestone.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import JobProgressModal from "./JobProgressModal";
import { getMyJobs, type ClientJob } from "../../services/userDashboard";

type JobStatus = "Pending" | "Progress" | "Completed" | "Cancelled";

interface Job {
  id: number;
  _id: string;
  title: string;
  category: string;
  status: JobStatus;
  biddings: number;
  worker?: string;
  providerId?: string | { _id?: string; id?: string };
  provider?:
    | string
    | {
        _id?: string;
        id?: string;
        name?: string;
        fullName?: string;
      };
}

const filters: Array<"All" | JobStatus> = [
  "All",
  "Pending",
  "Progress",
  "Completed",
  "Cancelled",
];

function getJobStatus(status: string): JobStatus {
  const normalized = status.toLowerCase().replace(/[_-]/g, " ").trim();

  if (normalized === "completed") return "Completed";

  if (normalized === "cancelled" || normalized === "canceled") {
    return "Cancelled";
  }

  if (
    normalized === "in progress" ||
    normalized === "inprogress" ||
    normalized === "accepted"
  ) {
    return "Progress";
  }

  return "Pending";
}

function getCategory(job: ClientJob): string {
  const category = job.category ?? job.service;

  if (typeof category === "string") return category;

  if (category && typeof category === "object") {
    return category.name ?? "General";
  }

  return "General";
}

type WorkerDetails = {
  _id?: string;
  id?: string;
  name?: string;
  fullName?: string;
};

type ExtendedClientJob = ClientJob & {
  worker?: string | WorkerDetails;
  assignedProvider?: WorkerDetails | string;
  assignedTo?: WorkerDetails | string;
  provider?: string | WorkerDetails;
  providerId?: string | { _id?: string; id?: string };
};

function getWorkerName(job: ClientJob): string | undefined {
  const rawJob = job as ExtendedClientJob;

  const candidates = [
    rawJob.provider,
    rawJob.worker,
    rawJob.assignedProvider,
    rawJob.assignedTo,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      // A MongoDB ID is not a display name.
      if (!/^[a-f\d]{24}$/i.test(candidate)) {
        return candidate;
      }
    }

    if (candidate && typeof candidate === "object") {
      const name = candidate.fullName ?? candidate.name;

      if (name) return name;
    }
  }

  return undefined;
}

function getProviderId(job: ClientJob): Job["providerId"] {
  const rawJob = job as ExtendedClientJob;

  const candidates = [
    rawJob.providerId,
    rawJob.provider,
    rawJob.worker,
    rawJob.assignedProvider,
    rawJob.assignedTo,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      if (/^[a-f\d]{24}$/i.test(candidate)) {
        return candidate;
      }
    }

    if (candidate && typeof candidate === "object") {
      const id = candidate._id ?? candidate.id;

      if (id) return id;
    }
  }

  return undefined;
}

function getStatusClasses(status: JobStatus) {
  switch (status) {
    case "Pending":
      return "bg-[#FFA0421C] text-[#C78315]";
    case "Progress":
      return "bg-[#52FF421C] text-[#3D9A32]";
    case "Completed":
      return "bg-[#DCE4E9] text-[#286080]";
    case "Cancelled":
      return "bg-[#FEE2E2] text-[#B91C1C]";
    default:
      return "bg-[#DCE4E9] text-[#286080]";
  }
}

function mapClientJobs(response: ClientJob[]): Job[] {
  return response.map((job, index) => {
    const worker = getWorkerName(job);
    const providerId = getProviderId(job);
    const provider = (job as ExtendedClientJob).provider;

    return {
      id: index + 1,
      _id: job._id ?? job.id ?? "",
      title: job.title,
      category: getCategory(job),
      status: getJobStatus(job.status),
      biddings: 0,
      ...(worker !== undefined && { worker }),
      ...(providerId !== undefined && { providerId }),
      ...(provider !== undefined && { provider }),
    };
  });
}

export default function MyJobsPage() {
  const [activeFilter, setActiveFilter] =
    useState<"All" | JobStatus>("All");

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadJobs() {
    try {
      setLoading(true);
      setError("");

      const response = await getMyJobs();
      setJobs(mapClientJobs(response));
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setError("Unable to load your jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchJobs() {
      try {
        const response = await getMyJobs();

        if (!cancelled) {
          setJobs(mapClientJobs(response));
          setError("");
        }
      } catch (err) {
        console.error("Failed to load jobs:", err);

        if (!cancelled) {
          setError("Unable to load your jobs. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredJobs =
    activeFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === activeFilter);

  return (
    <main className="relative min-h-[1117px] w-full overflow-x-hidden bg-[#F0F4F2]">
      <div className="relative min-h-[1117px] w-full max-w-[1179px] bg-[#F7FAF9]">

        {/* PAGE TITLE */}
        <h1
          className="
            absolute left-[10px] top-[16px] h-[32px] w-[99px]
            whitespace-nowrap font-['Inter'] text-[24px] font-bold
            leading-[32px] tracking-[0px] text-[#1E293B]
          "
        >
          My Jobs
        </h1>

        {/* FILTER BUTTONS */}
        <div
          className="
            absolute left-[10px] right-[10px] top-[100px]
            flex min-h-[40px] w-auto flex-wrap items-center
            gap-[10px] lg:left-[10px] lg:right-auto
            lg:top-[140px] lg:h-[40px] lg:w-[1108px]
            lg:flex-nowrap lg:gap-[16px]
          "
        >
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`
                  flex h-[40px] shrink-0 items-center justify-center rounded-[10px]
                  border px-[16px] font-['Montserrat'] text-[11px]
                  font-semibold transition lg:px-[34px] lg:text-[12px]
                  ${
                    active
                      ? "border-[#DCE4E9] bg-[#DCE4E9] text-[#1E293B]"
                      : "border-[#DCE4E9] bg-transparent text-[#1E293B]"
                  }
                `}
              >
                {filter === "Progress" ? "In Progress" : filter}
              </button>
            );
          })}
        </div>

        {/* JOB LIST */}
        <div
          className="
            absolute left-[10px] right-[10px] top-[200px]
            flex w-auto flex-col gap-[10px]
            lg:left-[10px] lg:right-auto lg:top-[220px] lg:w-screen
          "
        >
          {loading ? (
            <p className="py-6 text-sm text-[#737373]">
              Loading your jobs...
            </p>
          ) : error ? (
            <div className="py-6">
              <p className="text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={loadJobs}
                className="mt-3 rounded-lg bg-[#164D6F] px-4 py-2 text-sm text-white"
              >
                Try again
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <p className="py-6 text-sm text-[#737373]">
              {activeFilter === "All"
                ? "You haven't posted any jobs yet."
                : `No ${
                    activeFilter === "Progress"
                      ? "in-progress"
                      : activeFilter.toLowerCase()
                  } jobs found.`}
            </p>
          ) : (
            filteredJobs.map((job) => (
              <button
                key={job._id || job.id}
                type="button"
                onClick={() => setSelectedJob(job)}
                className="
                  relative flex h-[86px] w-full flex-shrink-0
                  cursor-pointer flex-col items-start rounded-[10px]
                  bg-white px-[16px] pt-[12px] text-left
                  shadow-[0px_4px_6px_-5px_#0000001F]
                  transition hover:shadow-[0px_5px_12px_-5px_#00000030]
                  lg:w-[1000px]
                "
              >
                <span
                  className="
                    font-['Montserrat'] text-[16px] font-semibold
                    leading-[20px] text-[#111827]
                  "
                >
                  {job.title}
                </span>

                <span
                  className="
                    mt-[5px] font-['Montserrat'] text-[12px]
                    font-normal leading-[17px] text-[#737373]
                  "
                >
                  Category : {job.category}
                </span>

                {job.worker ? (
                  <div className="mt-[3px] flex items-center gap-[7px]">
                    <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#164D6F] text-[7px] font-semibold text-white">
                      {job.worker
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>

                    <span className="font-['Montserrat'] text-[11px] font-medium text-[#5F6368]">
                      {job.worker}
                    </span>

                    <ShieldCheck className="h-[13px] w-[13px] fill-[#1267D6] text-[#1267D6]" />
                  </div>
                ) : (
                  <span
                    className="
                      mt-[3px] font-['Montserrat'] text-[11px]
                      font-normal leading-[17px] text-[#737373]
                    "
                  >
                    Biddings : {job.biddings}
                  </span>
                )}

                <span
                  className={`
                    absolute right-[12px] top-[31px] flex h-[23px]
                    w-[93px] items-center justify-center rounded-[22px]
                    px-[10px] font-['Montserrat'] text-[10px]
                    font-normal lg:right-[50px] ${getStatusClasses(job.status)}
                  `}
                >
                  {job.status === "Progress" ? "In Progress" : job.status}
                </span>
              </button>
            ))
          )}
        </div>

        {/* JOB PROGRESS MODAL */}
        {selectedJob && (
          <JobProgressModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </div>
    </main>
  );
}

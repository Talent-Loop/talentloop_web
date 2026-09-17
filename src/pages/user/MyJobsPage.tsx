import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import JobProgressModal from "./JobProgressModal";

type JobStatus = "Pending" | "Progress" | "Completed" | "Cancelled";

interface Job {
  id: number;
  title: string;
  category: string;
  status: JobStatus;
  biddings: number;
  worker?: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Fix Kitchen Sink",
    category: "Plumbing",
    status: "Pending",
    biddings: 5,
  },
  {
    id: 2,
    title: "Fix Kitchen Sink",
    category: "Plumbing",
    status: "Progress",
    biddings: 5,
    worker: "Emeka Johnson",
  },
  {
    id: 3,
    title: "Fix Kitchen Sink",
    category: "Plumbing",
    status: "Completed",
    biddings: 5,
  },
  {
    id: 4,
    title: "Fix Kitchen Sink",
    category: "Plumbing",
    status: "Completed",
    biddings: 5,
  },
  {
    id: 5,
    title: "Fix Kitchen Sink",
    category: "Plumbing",
    status: "Completed",
    biddings: 5,
  },
];

const filters: Array<"All" | JobStatus> = [
  "All",
  "Pending",
  "Progress",
  "Completed",
  "Cancelled",
];

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

export default function MyJobsPage() {
  const [activeFilter, setActiveFilter] =
    useState<"All" | JobStatus>("All");

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs =
    activeFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === activeFilter);

  return (
    <section className="w-full pb-10 pt-6 sm:pt-7">
      {/* Header */}
      <div className="w-full">
        <h1 className="font-['Inter'] text-[22px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
          My Jobs
        </h1>
      </div>

      {/* Filters */}
      <div
        className="
          mt-7
          flex
          w-full
          max-w-[1108px]
          gap-2
          overflow-x-auto
          pb-1
          sm:mt-10
          sm:gap-3
          md:flex-wrap
          md:overflow-visible
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
                flex
                h-10
                flex-shrink-0
                items-center
                justify-center
                rounded-[10px]
                border
                px-5
                font-['Montserrat']
                text-[11px]
                font-semibold
                transition
                sm:px-7
                sm:text-[12px]
                ${
                  active
                    ? "border-[#DCE4E9] bg-[#DCE4E9] text-[#1E293B]"
                    : "border-[#DCE4E9] bg-transparent text-[#1E293B] hover:bg-white"
                }
              `}
            >
              {filter === "Progress" ? "In Progress" : filter}
            </button>
          );
        })}
      </div>

      {/* Jobs */}
      <div className="mt-7 flex w-full max-w-[1000px] flex-col gap-3 sm:mt-8">
        {filteredJobs.map((job) => (
          <button
            key={job.id}
            type="button"
            onClick={() => setSelectedJob(job)}
            className="
              relative
              flex
              min-h-[86px]
              w-full
              flex-col
              items-start
              rounded-[10px]
              bg-white
              px-4
              py-3
              pr-28
              text-left
              shadow-[0px_4px_6px_-5px_#0000001F]
              transition
              hover:shadow-[0px_5px_12px_-5px_#00000030]
              sm:px-5
              sm:pr-36
            "
          >
            {/* Job title */}
            <span className="font-['Montserrat'] text-[15px] font-semibold leading-5 text-[#111827] sm:text-[16px]">
              {job.title}
            </span>

            {/* Category */}
            <span className="mt-1 font-['Montserrat'] text-[11px] font-normal leading-[17px] text-[#737373] sm:text-[12px]">
              Category : {job.category}
            </span>

            {/* Worker OR biddings */}
            {job.worker ? (
              <div className="mt-1 flex min-w-0 max-w-full items-center gap-1.5">
                <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#164D6F] text-[7px] font-semibold text-white">
                  EJ
                </div>

                <span className="truncate font-['Montserrat'] text-[10px] font-medium text-[#5F6368] sm:text-[11px]">
                  {job.worker}
                </span>

                <ShieldCheck className="h-[13px] w-[13px] flex-shrink-0 fill-[#1267D6] text-[#1267D6]" />
              </div>
            ) : (
              <span className="mt-1 font-['Montserrat'] text-[10px] font-normal leading-[17px] text-[#737373] sm:text-[11px]">
                Biddings : {job.biddings}
              </span>
            )}

            {/* Status */}
            <span
              className={`
                absolute
                right-3
                top-1/2
                flex
                h-[23px]
                min-w-[78px]
                -translate-y-1/2
                items-center
                justify-center
                rounded-[22px]
                px-2.5
                font-['Montserrat']
                text-[9px]
                font-normal
                sm:right-5
                sm:min-w-[93px]
                sm:text-[10px]
                ${getStatusClasses(job.status)}
              `}
            >
              {job.status === "Progress" ? "In Progress" : job.status}
            </span>
          </button>
        ))}

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="flex min-h-[160px] w-full items-center justify-center rounded-[12px] bg-white text-sm text-[#94A3B8]">
            No jobs found.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedJob && (
        <JobProgressModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
}
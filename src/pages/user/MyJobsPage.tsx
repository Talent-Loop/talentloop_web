import { useState } from "react";
import {
  Check,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
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
    <main className="relative min-h-[1117px] w-full bg-[#F0F4F2]">
      <div className="relative min-h-[1117px] w-[1179px] bg-[#F7FAF9]">
        {/* =====================================================
            PAGE TITLE
        ====================================================== */}

        <h1
          className="
            absolute
            left-[10px]
            top-[16px]
            h-[32px]
            w-[99px]
            whitespace-nowrap
            font-['Inter']
            text-[24px]
            font-bold
            leading-[32px]
            tracking-[0px]
            text-[#1E293B]
          "
        >
          My Jobs
        </h1>

        {/* =====================================================
            FILTER BUTTONS
        ====================================================== */}

        <div
          className="
            absolute
            left-[10px]
            top-[140px]
            flex
            h-[40px]
            w-[1108px]
            items-center
            gap-[16px]
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
                  h-[40px]
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  px-[34px]
                  font-['Montserrat']
                  text-[12px]
                  font-semibold
                  transition
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

        {/* =====================================================
            JOB LIST
        ====================================================== */}

        <div
          className="
            absolute
            left-[10px]
            top-[220px]
            flex
            w-screen
            flex-col
            gap-[10px]
          "
        >
          {filteredJobs.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => setSelectedJob(job)}
              className="
                relative
                flex
                h-[86px]
                w-[1000px]
                flex-shrink-0
                cursor-pointer
                flex-col
                items-start
                rounded-[10px]
                bg-white
                px-[16px]
                pt-[12px]
                text-left
                shadow-[0px_4px_6px_-5px_#0000001F]
                transition
                hover:shadow-[0px_5px_12px_-5px_#00000030]
              "
            >
              {/* Job title */}
              <span
                className="
                  font-['Montserrat']
                  text-[16px]
                  font-semibold
                  leading-[20px]
                  text-[#111827]
                "
              >
                {job.title}
              </span>

              {/* Category */}
              <span
                className="
                  mt-[5px]
                  font-['Montserrat']
                  text-[12px]
                  font-normal
                  leading-[17px]
                  text-[#737373]
                "
              >
                Category : {job.category}
              </span>

              {/* Worker OR biddings */}
              {job.worker ? (
                <div className="mt-[3px] flex items-center gap-[7px]">
                  <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#164D6F] text-[7px] font-semibold text-white">
                    EJ
                  </div>

                  <span className="font-['Montserrat'] text-[11px] font-medium text-[#j5F6368]">
                    {job.worker}
                  </span>

                  <ShieldCheck
                    className="h-[13px] w-[13px] fill-[#1267D6] text-[#1267D6]"
                  />
                </div>
              ) : (
                <span
                  className="
                    mt-[3px]
                    font-['Montserrat']
                    text-[11px]
                    font-normal
                    leading-[17px]
                    text-[#737373]
                  "
                >
                  Biddings : {job.biddings}
                </span>
              )}

              {/* Status */}
              <span
                className={`
                  absolute
                  right-[50px]
                  top-[31px]
                  flex
                  h-[23px]
                  w-[93px]
                  items-center
                  justify-center
                  rounded-[22px]
                  px-[10px]
                  font-['Montserrat']
                  text-[10px]
                  font-normal
                  ${getStatusClasses(job.status)}
                `}
              >
                {job.status}
              </span>
            </button>
          ))}
        </div>

        {/* =====================================================
            JOB PROGRESS MODAL
        ====================================================== */}

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
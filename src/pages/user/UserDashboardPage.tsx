
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit3,
  FiTool,
  FiWind,
  FiZap,
  FiScissors,
  FiPlus,
} from "react-icons/fi";

import { getMyJobs, type ClientJob } from "../../services/userDashboard";
import userHero from "../../assets/userHero.png";

const services = [
  { name: "Plumbing", icon: FiTool },
  { name: "Painting", icon: FiEdit3 },
  { name: "Carpentry", icon: FiTool },
  { name: "AC Repair", icon: FiWind },
  { name: "Electrical", icon: FiZap },
  { name: "Tailoring", icon: FiScissors },
];

function formatStatus(status: string) {
  const normalized = status.toLowerCase().replace(/[_-]/g, " ");

  return normalized.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-[#ECFDD5] text-[#65A30D]";
    case "in_progress":
    case "in progress":
      return "bg-[#FFF0D2] text-[#C78315]";
    case "cancelled":
      return "bg-[#FEE2E2] text-[#B91C1C]";
    default:
      return "bg-[#E8EEF2] text-[#17364A]";
  }
}

export default function UserDashboardPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<ClientJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const result = await getMyJobs();

        if (active) {
          setJobs(result);
        }
      } catch (err) {
        console.error("Failed to load client jobs:", err);

        if (active) {
          setError("We couldn't load your jobs. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full max-w-[1079px] overflow-x-hidden pb-10">
      {/* HERO */}
      <section
        className="relative h-[260px] w-full overflow-hidden rounded-[30px] bg-cover bg-center"
        style={{ backgroundImage: `url(${userHero})` }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute left-6 top-10 z-10 sm:left-[52px] sm:top-[64px]">
          <h1 className="max-w-[341px] font-['Montserrat'] text-[30px] font-semibold leading-[1.2] text-white sm:text-[39px]">
            Get your work
            <br />
            done by the best
          </h1>

          <p className="mt-[10px] font-['Montserrat'] text-[16px] font-semibold leading-[170%] text-white">
            Find the right artisan for any job
          </p>
        </div>

        <button
          type="button"
          aria-label="Post a job"
          onClick={() => navigate("/dashboard/post")}
          className="absolute bottom-[28px] right-[28px] z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border-[3px] border-[#17364A] bg-white text-[#17364A] shadow-sm"
        >
          <FiPlus className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </section>

      {/* SERVICES */}
      <section className="mt-[30px] w-full">
        <h2 className="mb-[24px] font-['Montserrat'] text-[20px] font-semibold text-[#17364A]">
          Services
        </h2>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-[18px] lg:grid-cols-6">
          {services.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex h-[105px] w-full flex-col items-center justify-center rounded-[28px] border border-[#DCE4E9] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
            >
              <div className="mb-[10px] flex h-[44px] w-[51px] items-center justify-center rounded-full bg-[#E8EEF2]">
                <Icon
                  className="h-[19px] w-[19px] text-[#17364A]"
                  strokeWidth={2}
                />
              </div>

              <span className="font-['Montserrat'] text-[12px] font-normal leading-[140%] text-[#222222] sm:text-[14px]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT JOBS + POST A JOB */}
      <section className="mt-[45px] flex w-full flex-col items-stretch gap-8 lg:mt-[62px] lg:flex-row lg:items-start lg:gap-[40px]">
        {/* RECENT JOBS */}
        <div className="flex min-w-0 flex-1 flex-col gap-[16px] lg:max-w-[500px]">
          <div className="flex items-center justify-between">
            <h2 className="font-['Montserrat'] text-[16px] font-semibold leading-[27px] text-[#111111]">
              Recent Jobs
            </h2>

            <button
              type="button"
              onClick={() => navigate("/dashboard/jobs")}
              className="font-['Montserrat'] text-[14px] font-normal leading-[27px] text-[#23658B]"
            >
              view all
            </button>
          </div>

          {loading ? (
            <div className="rounded-[21px] border border-[#E9E9E9] bg-white p-6 text-sm text-[#64748B]">
              Loading your jobs...
            </div>
          ) : error ? (
            <div className="rounded-[21px] border border-red-200 bg-white p-6">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-3 text-sm font-semibold text-[#23658B]"
              >
                Try again
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-[21px] border border-[#E9E9E9] bg-white px-5 py-8 text-center">
              <p className="font-['Montserrat'] text-sm font-semibold text-[#17364A]">
                No jobs yet
              </p>
              <p className="mt-2 text-sm text-[#64748B]">
                Post your first job to get started.
              </p>
              <button
                type="button"
                onClick={() => navigate("/dashboard/post")}
                className="mt-4 rounded-full bg-[#0D2E43] px-5 py-2 text-sm font-semibold text-white"
              >
                Post a job
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-[16px]">
              {jobs.slice(0, 3).map((job, index) => {
                const jobId = job._id ?? job.id;
                const location =
                  job.jobLocation ??
                  (typeof job.location === "string" ? job.location : "");

                return (
                  <button
                    key={jobId ?? `${job.title}-${index}`}
                    type="button"
                    onClick={() => {
                      if (jobId) {
                        navigate(`/dashboard/jobs/${jobId}`);
                      } else {
                        navigate("/dashboard/jobs");
                      }
                    }}
                    className="relative flex min-h-[96px] w-full flex-shrink-0 items-center rounded-[21px] border border-[#E9E9E9] bg-white text-left shadow-[0px_4px_8px_-4px_#00000017]"
                  >
                    {/* Avatar */}
                    <div className="absolute left-[17px] top-1/2 h-[56px] w-[56px] -translate-y-1/2">
                      <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#D8DDE0]">
                        <span className="text-[22px]">👨🏾‍🔧</span>
                      </div>
                    </div>

                    {/* Job information */}
                    <div className="min-w-0 flex-1 py-4 pl-[88px] pr-3 sm:pl-[93px] sm:pr-4">
                      <h3 className="truncate font-['Montserrat'] text-[14px] font-semibold leading-[120%] text-[#111111] sm:text-[16px]">
                        {job.title}
                      </h3>

                      <p className="mt-2 truncate font-['Montserrat'] text-[12px] font-normal leading-[140%] text-[#64748B]">
                        {location || "Location not provided"}
                      </p>
                    </div>

                    {/* Status */}
                    <span
                      className={`mr-3 flex min-h-[30px] max-w-[112px] shrink-0 items-center justify-center rounded-[22px] px-3 py-1 font-['Montserrat'] text-[10px] font-medium sm:mr-4 sm:text-[11px] ${statusStyle(job.status)}`}
                    >
                      {formatStatus(job.status)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* POST A JOB */}
        <div className="flex min-h-[208px] w-full flex-shrink-0 flex-col items-center rounded-[10px] border border-[#B7C8D2] bg-[#E8EDF1] lg:w-[440px]">
          <div className="relative mt-[40px] h-[110px] w-full max-w-[301px]">
            <p className="absolute left-1/2 top-0 w-[240px] -translate-x-1/2 text-center font-['Montserrat'] text-[14px] font-normal leading-[140%] text-[#222222]">
              We've got professionals for
              <br />
              every kind of job
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard/post")}
              className="absolute left-1/2 top-[60px] flex h-[50px] w-full -translate-x-1/2 items-center justify-center gap-[12px] rounded-[31px] border border-[#B7C8D2] bg-[#0D2E43] px-4 font-['Montserrat'] text-[14px] font-semibold text-white"
            >
              <FiPlus className="h-[16px] w-[16px] rounded-full bg-white text-[#0D2E43]" />
              Post a job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

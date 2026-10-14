
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";
import { CheckCircle2, Clock3 } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  serviceId?: string;
  jobLocation?: string;
  budget?: number;
  agreedPrice?: number | null;
  status: string;
}

export default function MyJobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setError("You are not logged in.");
          return;
        }

        const response = await fetch(
          "https://backend-talentloop.onrender.com/api/v1/jobs/my-jobs?page=1&limit=20",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "*/*",
            },
          }
        );

        const data = await response.json();

        console.log("MY JOBS API RESPONSE:", data);

        if (!response.ok) {
          setError(data?.message || "Failed to fetch your jobs.");
          return;
        }

        setJobs(data?.data?.data || []);
      } catch (err) {
        console.error("MY JOBS ERROR:", err);
        setError("Something went wrong while loading your jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  const getPrice = (job: Job) => {
    const price = job.agreedPrice ?? job.budget;

    if (price === undefined || price === null) {
      return "₦0";
    }

    return `₦${price.toLocaleString()}`;
  };

  const getCategory = (job: Job) => {
    // The jobs API currently returns serviceId rather than
    // the service name, so we keep the category area safe.
    return job.serviceId || "Service";
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F8]">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <ArtisanHeader />

        <div className="px-8 pb-10 pt-10">
          {/* Page Title */}
          <h1 className="mb-10 text-[20px] font-semibold text-[#111111]">
            My Jobs
          </h1>

          {/* Loading */}
          {loading && (
            <div className="py-10 text-center text-[13px] text-[#8A9AB5]">
              Loading your jobs...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl bg-white px-5 py-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <p className="text-[13px] text-red-500">{error}</p>
            </div>
          )}

          {/* No Jobs */}
          {!loading && !error && jobs.length === 0 && (
            <div className="rounded-2xl bg-white px-5 py-10 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <p className="text-[14px] font-medium text-[#172033]">
                No jobs found
              </p>

              <p className="mt-2 text-[12px] text-[#8A9AB5]">
                Your jobs will appear here when you have jobs assigned to you.
              </p>
            </div>
          )}

          {/* Jobs */}
          {!loading && !error && jobs.length > 0 && (
            <div className="space-y-4">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  onClick={() => navigate(`/my-jobs/${job._id}`)}
                  className="flex min-h-[104px] cursor-pointer items-center justify-between rounded-2xl bg-white px-5 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                >
                  {/* Job Information */}
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#172033]">
                      {job.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-3 text-[13px] text-[#8A9AB5]">
                      <span>{getCategory(job)}</span>

                      <span className="h-1 w-1 rounded-full bg-[#B8C1CC]" />

                      <span>{job.jobLocation || "Location unavailable"}</span>
                    </div>

                    <p className="mt-2 text-[16px] font-semibold text-[#185A7D]">
                      {getPrice(job)}
                    </p>
                  </div>

                  {/* Status */}
                  <StatusBadge status={job.status} />
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase();

  if (
    normalizedStatus === "open" ||
    normalizedStatus === "pending"
  ) {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-[#FFF4C7] px-3 py-1.5 text-[11px] font-medium text-[#A88600]">
        <Clock3 size={12} />
        <span>Pending</span>
      </div>
    );
  }

  if (
    normalizedStatus === "in_progress" ||
    normalizedStatus === "progress"
  ) {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-[#E8EEF2] px-3 py-1.5 text-[11px] font-medium text-[#216080]">
        <CheckCircle2 size={12} />
        <span>Progress</span>
      </div>
    );
  }

  if (normalizedStatus === "completed") {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-[#DDF8E8] px-3 py-1.5 text-[11px] font-medium text-[#07883E]">
        <CheckCircle2 size={12} />
        <span>Completed</span>
      </div>
    );
  }

  if (normalizedStatus === "accepted") {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-[#DDF8E8] px-3 py-1.5 text-[11px] font-medium text-[#07883E]">
        <CheckCircle2 size={12} />
        <span>Accepted</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-[#E8EEF2] px-3 py-1.5 text-[11px] font-medium text-[#216080]">
      <CheckCircle2 size={12} />
      <span>{status}</span>
    </div>
  );
}


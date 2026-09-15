import { useNavigate } from "react-router-dom";
import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";
import { CheckCircle2, Clock3 } from "lucide-react";

const jobs = [
  {
    title: "Fix Leaking Pipe",
    category: "Plumbing",
    location: "Lekki Phase 1",
    price: "₦3,000",
    status: "Accepted",
  },
  {
    title: "Fix Leaking Pipe",
    category: "Plumbing",
    location: "Lekki Phase 1",
    price: "₦3,000",
    status: "Pending",
  },
  {
    title: "Fix Leaking Pipe",
    category: "Plumbing",
    location: "Lekki Phase 1",
    price: "₦3,000",
    status: "Progress",
  },
  {
    title: "Fix Leaking Pipe",
    category: "Plumbing",
    location: "Lekki Phase 1",
    price: "₦3,000",
    status: "Completed",
  },
];

export default function MyJobsPage() {
  const navigate = useNavigate();
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

          {/* Jobs */}
          <div className="space-y-4">
            {jobs.map((job, index) => (
             <article
  key={index}
  onClick={() => navigate(`/my-jobs/${index}`)}
  className="flex min-h-[104px] cursor-pointer items-center justify-between rounded-2xl bg-white px-5 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
>
                {/* Job Information */}
                <div>
                  <h2 className="text-[16px] font-semibold text-[#172033]">
                    {job.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-3 text-[13px] text-[#8A9AB5]">
                    <span>{job.category}</span>

                    <span className="h-1 w-1 rounded-full bg-[#B8C1CC]" />

                    <span>{job.location}</span>
                  </div>

                  <p className="mt-2 text-[16px] font-semibold text-[#185A7D]">
                    {job.price}
                  </p>
                </div>

                {/* Status */}
                <StatusBadge status={job.status} />
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Pending") {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-[#FFF4C7] px-3 py-1.5 text-[11px] font-medium text-[#A88600]">
        <Clock3 size={12} />
        <span>Pending</span>
      </div>
    );
  }

  if (status === "Progress") {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-[#E8EEF2] px-3 py-1.5 text-[11px] font-medium text-[#216080]">
        <CheckCircle2 size={12} />
        <span>Progress</span>
      </div>
    );
  }

  if (status === "Completed") {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-[#DDF8E8] px-3 py-1.5 text-[11px] font-medium text-[#07883E]">
        <CheckCircle2 size={12} />
        <span>Completed</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-[#DDF8E8] px-3 py-1.5 text-[11px] font-medium text-[#07883E]">
      <CheckCircle2 size={12} />
      <span>Accepted</span>
    </div>
  );
}
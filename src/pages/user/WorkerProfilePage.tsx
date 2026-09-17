import {
  FiArrowLeft,
  FiMapPin,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const worker = {
  name: "John Doe",
  role: "Expert Plumber",
  location: "Jos, Plateau State",
  rating: "4.8",
  reviews: 94,
  completedJobs: 128,
  responseTime: "1 hour",
  experience: "2+ years",
  about:
    "Expert plumber with over 2 years of experience in residential and commercial plumbing systems. Specialized in leak detection, pipe installation, and emergency repairs. I pride myself on punctuality and high-quality workmanship.",
};

const portfolio = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=400&q=80",
  },
];

const reviews = [
  {
    id: 1,
    name: "Mike Alfred",
    rating: 5,
    text: "Excellent work. Very professional and completed the job exactly as promised.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    text: "Very responsive and knowledgeable. I would definitely hire him again.",
    date: "1 month ago",
  },
];

export default function WorkerProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="w-full bg-[#F7FAF9] pb-12 pt-5 sm:pb-16 sm:pt-7">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2 sm:mb-8 sm:gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#0F172A] transition hover:bg-[#E8EDF1]"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[22px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
          Worker Profile
        </h1>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-[1113px] rounded-[16px] border border-[#0D2E431F] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Worker Info */}
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full bg-[#D8DDE0] sm:h-[96px] sm:w-[96px]">
              <span className="text-[36px] sm:text-[42px]">👨🏾‍🔧</span>

              <span className="absolute bottom-0.5 right-0.5 h-6 w-6 rounded-full border-2 border-white bg-[#22C55E] p-[3px] sm:bottom-1 sm:right-1 sm:h-[27px] sm:w-[27px]">
                <span className="block h-full w-full rounded-full bg-[#22C55E]" />
              </span>
            </div>

            <div className="min-w-0">
              <h2 className="font-['Montserrat'] text-[19px] font-semibold text-[#0F172A] sm:text-[20px]">
                {worker.name}
              </h2>

              <p className="mt-1 font-['Montserrat'] text-[14px] font-medium text-[#475569]">
                {worker.role}
              </p>

              <div className="mt-2 flex items-start gap-1 text-[13px] text-[#64748B]">
                <FiMapPin className="mt-0.5 shrink-0" size={14} />
                <span>{worker.location}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid w-full grid-cols-3 gap-2 sm:gap-4 lg:w-auto lg:gap-5">
            <StatCard
              value={worker.completedJobs}
              label="Jobs completed"
            />

            <StatCard
              value={worker.rating}
              label="Rating"
              icon={
                <FiStar
                  size={14}
                  className="fill-[#164D6F] text-[#164D6F]"
                />
              }
            />

            <StatCard
              value={worker.responseTime}
              label="Response time"
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="mt-7 w-full max-w-[1113px] sm:mt-8">
        <h2 className="mb-3 font-['Montserrat'] text-[18px] font-semibold text-[#0F172A]">
          About
        </h2>

        <p className="max-w-[1080px] font-['Montserrat'] text-[14px] leading-[165%] text-[#475569]">
          {worker.about}
        </p>
      </div>

      {/* Portfolio */}
      <div className="mt-8 w-full max-w-[1113px] sm:mt-9">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-['Montserrat'] text-[18px] font-semibold text-[#0F172A]">
            Portfolio
          </h2>

          <span className="text-[12px] text-[#64748B] sm:text-[13px]">
            Recent work
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-[9px]">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="aspect-square w-full max-w-[114px] overflow-hidden rounded-[10px] bg-[#E8EDF1]"
            >
              <img
                src={item.image}
                alt={`Portfolio work ${item.id}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-9 w-full max-w-[1113px] sm:mt-10">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-['Montserrat'] text-[18px] font-semibold text-[#0F172A]">
            Reviews
          </h2>

          <div className="flex items-center gap-2">
            <FiStar
              size={16}
              className="fill-[#164D6F] text-[#164D6F]"
            />

            <span className="font-['Public_Sans'] text-[14px] font-bold leading-5 text-[#164D6F]">
              {worker.rating} ({worker.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-full rounded-[16px] border border-[#0D2E431F] bg-white p-4 sm:min-h-[116px] sm:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-['Montserrat'] text-[14px] font-semibold text-[#0F172A]">
                    {review.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: review.rating }).map(
                      (_, index) => (
                        <FiStar
                          key={index}
                          size={13}
                          className="fill-[#164D6F] text-[#164D6F]"
                        />
                      ),
                    )}
                  </div>
                </div>

                <span className="shrink-0 text-[11px] text-[#94A3B8] sm:text-[12px]">
                  {review.date}
                </span>
              </div>

              <p className="mt-3 font-['Montserrat'] text-[13px] leading-[140%] text-[#475569]">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 flex w-full max-w-[1113px] flex-col gap-3 sm:mt-10 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-[48px] w-full items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#E8EDF1] font-['Montserrat'] text-[14px] font-semibold text-[#0D2E43] transition hover:bg-[#DDE4E8] sm:w-[90px]"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() => navigate(`/dashboard/messages/${id ?? "worker"}`)}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#164D6F] px-5 font-['Montserrat'] text-[14px] font-semibold text-white transition hover:bg-[#123F5B] sm:w-auto"
        >
          <FiMessageSquare size={17} />
          Message Worker
        </button>
      </div>
    </section>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="flex h-[88px] min-w-0 flex-col justify-center rounded-[16px] border border-[#0D2E431F] bg-white px-3 py-3 sm:h-[94px] sm:w-[110px] sm:p-4">
      <div className="flex items-center gap-1 font-['Montserrat'] text-[16px] font-bold text-[#0F172A] sm:text-[18px]">
        {icon}
        <span className="truncate">{value}</span>
      </div>

      <span className="mt-1 text-[10px] leading-4 text-[#64748B] sm:whitespace-nowrap sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}
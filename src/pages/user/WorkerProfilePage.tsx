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
    <section className="min-h-full bg-[#F7FAF9] px-[32px] pb-16 pt-[22px]">
      {/* Header */}
      <div className="mb-[36px] flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center text-[#0F172A]"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Worker Profile
        </h1>
      </div>

      {/* Profile card */}
      <div className="flex min-h-[159px] w-full max-w-[1113px] items-center rounded-[16px] border border-[#0D2E431F] bg-white px-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#D8DDE0]">
            <span className="text-[42px]">👨🏾‍🔧</span>

            <span className="absolute bottom-1 right-1 h-[27px] w-[27px] rounded-full border-2 border-white bg-[#22C55E] p-[4px]">
              <span className="block h-full w-full rounded-full bg-[#22C55E]" />
            </span>
          </div>

          <div>
            <h2 className="font-['Montserrat'] text-[20px] font-semibold text-[#0F172A]">
              {worker.name}
            </h2>

            <p className="mt-1 font-['Montserrat'] text-[14px] font-medium text-[#475569]">
              {worker.role}
            </p>

            <div className="mt-2 flex items-center gap-1 text-[13px] text-[#64748B]">
              <FiMapPin size={14} />
              <span>{worker.location}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="ml-auto grid h-[94px] w-[396px] grid-cols-3 gap-8">
          <StatCard
            value={worker.completedJobs}
            label="Jobs completed"
          />

          <StatCard
            value={worker.rating}
            label="Rating"
            icon={<FiStar size={14} />}
          />

          <StatCard
            value={worker.responseTime}
            label="Response time"
          />
        </div>
      </div>

      {/* About */}
      <div className="mt-[28px] max-w-[1113px]">
        <h2 className="mb-3 font-['Montserrat'] text-[18px] font-semibold text-[#0F172A]">
          About
        </h2>

        <p className="max-w-[1080px] font-['Montserrat'] text-[14px] leading-[165%] text-[#475569]">
          {worker.about}
        </p>
      </div>

      {/* Portfolio */}
      <div className="mt-[32px] max-w-[1113px]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-['Montserrat'] text-[18px] font-semibold text-[#0F172A]">
            Portfolio
          </h2>

          <span className="text-[13px] text-[#64748B]">
            Recent work
          </span>
        </div>

        <div className="flex w-[359px] gap-[9px]">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="h-[114px] w-[114px] overflow-hidden rounded-[10px] bg-[#E8EDF1]"
            >
              <img
                src={item.image}
                alt="Portfolio work"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-[40px] w-full max-w-[1113px]">
        <div className="mb-4 flex h-7 items-center justify-between px-[15px]">
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
              className="min-h-[116px] rounded-[16px] border border-[#0D2E431F] bg-white p-4"
            >
              <div className="flex items-start justify-between">
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

                <span className="text-[12px] text-[#94A3B8]">
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

      {/* Bottom actions */}
      <div className="mt-10 flex max-w-[1113px] gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-[48px] w-[90px] items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#E8EDF1] font-['Montserrat'] text-[14px] font-semibold text-[#0D2E43]"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() => navigate(`/dashboard/messages/${id ?? "worker"}`)}
          className="flex h-[48px] items-center justify-center gap-2 rounded-[8px] bg-[#164D6F] px-5 font-['Montserrat'] text-[14px] font-semibold text-white"
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
    <div className="flex h-[94px] w-[110.66px] flex-col justify-center rounded-[16px] border border-[#0D2E431F] bg-white p-4">
      <div className="flex items-center gap-1 font-['Montserrat'] text-[18px] font-bold text-[#0F172A]">
        {icon}
        {value}
      </div>

      <span className="mt-1 whitespace-nowrap text-[11px] text-[#64748B]">
        {label}
      </span>
    </div>
  );
}
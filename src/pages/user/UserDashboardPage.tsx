import {
  FiEdit3,
  FiTool,
  FiWind,
  FiZap,
  FiScissors,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const services = [
  { name: "Plumbing", icon: FiTool },
  { name: "Painting", icon: FiEdit3 },
  { name: "Carpentry", icon: FiTool },
  { name: "AC Repair", icon: FiWind },
  { name: "Electrical", icon: FiZap },
  { name: "Tailoring", icon: FiScissors },
];

const recentJobs = [
  {
    title: "Fix faulty wiring",
    category: "Electrical",
    date: "Yesterday",
    status: "Completed",
  },
  {
    title: "Fix Kitchen Sink",
    category: "Plumbing",
    date: "Today",
    status: "In progress",
  },
  {
    title: "Fix Kitchen Sink",
    category: "Plumbing",
    date: "Today",
    status: "In progress",
  },
];

export default function UserDashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[1079px] overflow-x-hidden pb-10">
      {/* HERO */}
      <section
        className="relative h-[260px] w-full overflow-hidden rounded-[30px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/userHero.png')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Hero content */}
        <div className="absolute left-[52px] top-[64px] z-10">
          <h1 className="max-w-[341px] font-['Montserrat'] text-[39px] font-semibold leading-[1.2] text-white">
            Get your work
            <br />
            done by the best
          </h1>

          <p className="mt-[10px] font-['Montserrat'] text-[16px] font-semibold leading-[170%] text-white">
            Find the right artisan for any job
          </p>
        </div>

        {/* Plus button */}
        <button
          type="button"
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

        {/* IMPORTANT:
            grid instead of horizontal flex/overflow */}
        <div className="grid w-full grid-cols-6 gap-[18px]">
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

              <span className="font-['Montserrat'] text-[14px] font-normal leading-[140%] text-[#222222]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

          {/* RECENT JOBS + POST A JOB */}
      <section className="mt-[62px] flex w-[1024px] items-start gap-[40px]">
        {/* RECENT JOBS */}
        <div className="flex h-[363px] w-[500px] flex-col gap-[16px]">
          {/* Recent Jobs Header */}
          <div className="flex h-[27px] w-[500px] items-center justify-between">
            <h2 className="font-['Montserrat'] text-[16px] font-semibold leading-[27px] text-[#111111]">
              Recent Jobs
            </h2>

            <button
              type="button"
              className="font-['Montserrat'] text-[14px] font-normal leading-[27px] text-[#23658B]"
            >
              view all
            </button>
          </div>

          {/* Jobs */}
          <div className="flex flex-col gap-[16px]">
            {recentJobs.map((job, index) => (
              <div
                key={`${job.title}-${index}`}
                className="relative flex h-[96px] w-[500px] flex-shrink-0 items-center rounded-[21px] border border-[#E9E9E9] bg-white shadow-[0px_4px_8px_-4px_#00000017]"
              >
            {/* Avatar */}
          <div className="absolute left-[17px] top-[20px] h-[56px] w-[56px]">
            {/* Avatar circle */}
            <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#D8DDE0]">
              <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full text-[22px]">
                👨🏾‍🔧
              </div>
            </div>

            {/* Online indicator */}
            <span className="absolute bottom-[-1px] right-[-1px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-white">
              <span className="h-[11px] w-[11px] rounded-full bg-[#22C55E]" />
            </span>
          </div>

                {/* Job Text */}
                <div className="absolute left-[93px] top-[30px] flex h-[41px] w-[100px] flex-col gap-[5px]">
                  <h3 className="whitespace-nowrap font-['Montserrat'] text-[16px] font-semibold leading-[120%] text-[#111111]">
                    {job.title}
                  </h3>

                  <p className="whitespace-nowrap font-['Montserrat'] text-[12px] font-normal leading-[140%] text-[#64748B]">
                    {job.category} · {job.date}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`absolute left-[350px] top-[32px] flex h-[32px] w-[119px] items-center justify-center gap-[10px] rounded-[22px] px-[10px] font-['Montserrat'] text-[11px] font-normal ${
                    job.status === "Completed"
                      ? "bg-[#ECFDD5] text-[#65A30D]"
                      : "bg-[#FFF0D2] text-[#C78315]"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* POST A JOB */}
        <div className="flex h-[208px] w-[440px] flex-shrink-0 flex-col items-center rounded-[10px] border border-[#B7C8D2] bg-[#E8EDF1] mask-origin-content">
          {/* Inner Group */}
          <div className="relative mt-[49px] h-[110px] w-[301px]">
            {/* Text */}
            <p className="absolute left-1/2 top-0 w-[197px] -translate-x-1/2 text-center font-['Montserrat'] text-[14px] font-normal leading-[140%] text-[#222222]">
              We've got professionals for
              <br />
              every kind of job
            </p>

            {/* Post a Job Button */}
            <button
              type="button"
              onClick={() =>
                navigate(`/dashboard/post`)}
              className="absolute left-1/2 top-[60px] flex h-[50px] w-[301px] -translate-x-1/2 items-center justify-center gap-[12px] rounded-[31px] border border-[#B7C8D2] bg-[#0D2E43] px-0 py-[1px] font-['Montserrat'] text-[14px] font-semibold text-white"
            >
              <FiPlus className="h-[16px] w-[16px] bg-amber-50 text-[#0D2E43] rounded-2xl font-bold" />
              Post a job
            </button>
          </div>
        </div>
      </section>
      </div> )}
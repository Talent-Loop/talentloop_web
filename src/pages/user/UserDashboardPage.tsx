import {
  FiEdit3,
  FiTool,
  FiWind,
  FiZap,
  FiScissors,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import userHero from "../../assets/userHero.png";

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
    <section className="w-full pb-10">
      {/*  HERO */}
      <section
        className="
          relative
          h-[220px]
          w-full
          overflow-hidden
          rounded-[24px]
          bg-cover
          bg-center
          sm:h-[240px]
          sm:rounded-[28px]
          lg:h-[260px]
          lg:rounded-[30px]
        "
        style={{
          backgroundImage: `url(${userHero})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Hero content */}
        <div
          className="
            absolute
            inset-x-5
            top-1/2
            z-10
            -translate-y-1/2
            sm:left-8
            sm:right-auto
            lg:left-[52px]
          "
        >
          <h1
            className="
              max-w-[341px]
              font-['Montserrat']
              text-[28px]
              font-semibold
              leading-[1.2]
              text-white
              sm:text-[34px]
              lg:text-[39px]
            "
          >
            Get your work
            <br />
            done by the best
          </h1>

          <p
            className="
              mt-2
              font-['Montserrat']
              text-[13px]
              font-semibold
              leading-[170%]
              text-white
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            Find the right artisan for any job
          </p>
        </div>

        {/* Add job */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/post")}
          className="
            absolute
            bottom-5
            right-5
            z-10
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border-[3px]
            border-[#17364A]
            bg-white
            text-[#17364A]
            shadow-sm
            transition
            hover:scale-105
            sm:bottom-6
            sm:right-6
            sm:h-[62px]
            sm:w-[62px]
          "
          aria-label="Post a job"
        >
          <FiPlus
            className="h-6 w-6 sm:h-7 sm:w-7"
            strokeWidth={2.5}
          />
        </button>
      </section>

      {/*  SERVICES*/}
      <section className="mt-7 w-full sm:mt-8">
        <h2
          className="
            mb-4
            font-['Montserrat']
            text-[18px]
            font-semibold
            text-[#17364A]
            sm:mb-5
            sm:text-[20px]
          "
        >
          Services
        </h2>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-3
            sm:gap-4
            lg:grid-cols-6
            lg:gap-[18px]
          "
        >
          {services.map(({ name, icon: Icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => navigate(`/dashboard/post?category=${encodeURIComponent(name)}`)}
              className="
                flex
                min-h-[96px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-[20px]
                border
                border-[#DCE4E9]
                bg-white
                px-2
                py-4
                shadow-[0_2px_4px_rgba(0,0,0,0.04)]
                transition
                hover:border-[#B7C8D2]
                hover:shadow-sm
                sm:min-h-[105px]
                sm:rounded-[24px]
                lg:rounded-[28px]
              "
            >
              <div
                className="
                  mb-2.5
                  flex
                  h-10
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E8EEF2]
                  sm:h-11
                  sm:w-[51px]
                "
              >
                <Icon
                  className="h-[18px] w-[18px] text-[#17364A] sm:h-[19px] sm:w-[19px]"
                  strokeWidth={2}
                />
              </div>

              <span
                className="
                  text-center
                  font-['Montserrat']
                  text-[12px]
                  font-normal
                  leading-[140%]
                  text-[#222222]
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/*  RECENT JOBS + POST A JOB*/}
      <section
        className="
          mt-10
          grid
          w-full
          grid-cols-1
          gap-7
          sm:mt-12
          lg:mt-[62px]
          lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]
          lg:gap-8
          xl:gap-10
        "
      >
        {/*  RECENT JOBS*/}
        <div className="min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2
              className="
                font-['Montserrat']
                text-[16px]
                font-semibold
                leading-7
                text-[#111111]
              "
            >
              Recent Jobs
            </h2>

            <button
              type="button"
              onClick={() => navigate("/dashboard/jobs")}
              className="
                font-['Montserrat']
                text-[13px]
                font-normal
                leading-7
                text-[#23658B]
                transition
                hover:text-[#164D6F]
                sm:text-[14px]
              "
            >
              view all
            </button>
          </div>

          {/* Jobs */}
          <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:gap-4">
            {recentJobs.map((job, index) => (
              <button
                key={`${job.title}-${index}`}
                type="button"
                onClick={() => navigate("/dashboard/jobs")}
                className="
                  flex
                  min-h-[88px]
                  w-full
                  items-center
                  gap-3
                  rounded-[18px]
                  border
                  border-[#E9E9E9]
                  bg-white
                  px-3
                  py-3
                  text-left
                  shadow-[0px_4px_8px_-4px_#00000017]
                  transition
                  hover:shadow-md
                  sm:min-h-[96px]
                  sm:gap-4
                  sm:rounded-[21px]
                  sm:px-4
                "
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      bg-[#D8DDE0]
                      sm:h-14
                      sm:w-14
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        text-[20px]
                        sm:h-[50px]
                        sm:w-[50px]
                        sm:text-[22px]
                      "
                    >
                      👨🏾‍🔧
                    </div>
                  </div>

                  {/* Online indicator */}
                  <span
                    className="
                      absolute
                      bottom-[-1px]
                      right-[-1px]
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                    "
                  >
                    <span className="h-[11px] w-[11px] rounded-full bg-[#22C55E]" />
                  </span>
                </div>

                {/* Job info */}
                <div className="min-w-0 flex-1">
                  <h3
                    className="
                      truncate
                      font-['Montserrat']
                      text-[14px]
                      font-semibold
                      leading-[120%]
                      text-[#111111]
                      sm:text-[16px]
                    "
                  >
                    {job.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      truncate
                      font-['Montserrat']
                      text-[11px]
                      font-normal
                      leading-[140%]
                      text-[#64748B]
                      sm:text-[12px]
                    "
                  >
                    {job.category} · {job.date}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`
                    shrink-0
                    rounded-[22px]
                    px-2.5
                    py-2
                    text-center
                    font-['Montserrat']
                    text-[9px]
                    font-normal
                    sm:min-w-[119px]
                    sm:px-[10px]
                    sm:text-[11px]
                    ${
                      job.status === "Completed"
                        ? "bg-[#ECFDD5] text-[#65A30D]"
                        : "bg-[#FFF0D2] text-[#C78315]"
                    }
                  `}
                >
                  {job.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/*  POST A JOB*/}
        <div
          className="
            flex
            min-h-[190px]
            w-full
            flex-col
            items-center
            justify-center
            rounded-[10px]
            border
            border-[#B7C8D2]
            bg-[#E8EDF1]
            px-5
            py-7
            lg:min-h-[208px]
          "
        >
          <p
            className="
              max-w-[230px]
              text-center
              font-['Montserrat']
              text-[13px]
              font-normal
              leading-[140%]
              text-[#222222]
              sm:text-[14px]
            "
          >
            We've got professionals for
            <br />
            every kind of job
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/post")}
            className="
              mt-5
              flex
              h-12
              w-full
              max-w-[301px]
              items-center
              justify-center
              gap-2.5
              rounded-[31px]
              border
              border-[#B7C8D2]
              bg-[#0D2E43]
              px-4
              font-['Montserrat']
              text-[13px]
              font-semibold
              text-white
              transition
              hover:bg-[#123B54]
              sm:mt-6
              sm:h-[50px]
              sm:text-[14px]
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#0D2E43]
              "
            >
              <FiPlus
                className="h-3.5 w-3.5"
                strokeWidth={2.5}
              />
            </span>

            Post a job
          </button>
        </div>
      </section>
    </section>
  );
}
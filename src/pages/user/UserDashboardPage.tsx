
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiEdit3,
  FiTool,
  FiWind,
  FiZap,
  FiScissors,
  FiPlus,
  FiArrowRight,
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

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
          setJobs(Array.isArray(result) ? result : []);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[1079px] overflow-x-hidden pb-10"
    >
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative h-[260px] w-full overflow-hidden rounded-[30px] bg-cover bg-center"
        style={{ backgroundImage: `url(${userHero})` }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/45"
        />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute left-6 top-10 z-10 sm:left-[52px] sm:top-[64px]"
        >
          <h1 className="max-w-[341px] font-['Montserrat'] text-[30px] font-semibold leading-[1.2] text-white sm:text-[39px]">
            Get your work
            <br />
            done by the best
          </h1>

          <p className="mt-[10px] font-['Montserrat'] text-[16px] font-semibold leading-[170%] text-white">
            Find the right artisan for any job
          </p>
        </motion.div>

        <motion.button
          type="button"
          aria-label="Post a job"
          onClick={() => navigate("/dashboard/post")}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute bottom-[28px] right-[28px] z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border-[3px] border-[#17364A] bg-white text-[#17364A] shadow-sm"
        >
          <FiPlus className="h-7 w-7" strokeWidth={2.5} />
        </motion.button>
      </motion.section>

      {/* SERVICES */}
      <section className="mt-[30px] w-full">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-[24px] font-['Montserrat'] text-[20px] font-semibold text-[#17364A]"
        >
          Services
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-[18px] lg:grid-cols-6"
        >
          {services.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              whileHover={{
                y: -7,
                scale: 1.03,
                boxShadow: "0px 12px 22px rgba(23,54,74,0.13)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="group flex h-[105px] w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border border-[#DCE4E9] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-[10px] flex h-[44px] w-[51px] items-center justify-center rounded-full bg-[#E8EEF2]"
              >
                <Icon
                  className="h-[19px] w-[19px] text-[#17364A]"
                  strokeWidth={2}
                />
              </motion.div>

              <span className="font-['Montserrat'] text-[12px] font-normal leading-[140%] text-[#222222] transition-colors duration-300 group-hover:text-[#17364A] sm:text-[14px]">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RECENT JOBS + POST A JOB */}
      <section className="mt-[45px] flex w-full flex-col items-stretch gap-8 lg:mt-[62px] lg:flex-row lg:items-start lg:gap-[40px]">
        {/* RECENT JOBS */}
        <div className="flex min-w-0 flex-1 flex-col gap-[16px] lg:max-w-[500px]">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between"
          >
            <h2 className="font-['Montserrat'] text-[16px] font-semibold leading-[27px] text-[#111111]">
              Recent Jobs
            </h2>

            <button
              type="button"
              onClick={() => navigate("/dashboard/jobs")}
              className="group flex items-center gap-1 font-['Montserrat'] text-[14px] font-normal leading-[27px] text-[#23658B] transition-colors duration-200 hover:text-[#0D2E43]"
            >
              view all
              <motion.span
                className="flex"
                whileHover={{ x: 5 }}
              >
                <FiArrowRight />
              </motion.span>
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-[21px] border border-[#E9E9E9] bg-white p-6 text-sm text-[#64748B]"
              >
                Loading your jobs...
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-[21px] border border-red-200 bg-white p-6"
              >
                <p className="text-sm text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-3 text-sm font-semibold text-[#23658B] transition-colors hover:text-[#0D2E43]"
                >
                  Try again
                </button>
              </motion.div>
            ) : jobs.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-[21px] border border-[#E9E9E9] bg-white px-5 py-8 text-center"
              >
                <p className="font-['Montserrat'] text-sm font-semibold text-[#17364A]">
                  No jobs yet
                </p>
                <p className="mt-2 text-sm text-[#64748B]">
                  Post your first job to get started.
                </p>
                <motion.button
                  type="button"
                  onClick={() => navigate("/dashboard/post")}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-4 rounded-full bg-[#0D2E43] px-5 py-2 text-sm font-semibold text-white"
                >
                  Post a job
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="jobs"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-[16px]"
              >
                {jobs.slice(0, 3).map((job, index) => {
                  const jobId = job._id ?? job.id;
                  const location =
                    job.jobLocation ??
                    (typeof job.location === "string" ? job.location : "");

                  return (
                    <motion.button
                      key={jobId ?? `${job.title}-${index}`}
                      variants={itemVariants}
                      type="button"
                      onClick={() => {
                        if (jobId) {
                          navigate(`/dashboard/jobs/${jobId}`);
                        } else {
                          navigate("/dashboard/jobs");
                        }
                      }}
                      whileHover={{
                        y: -4,
                        borderColor: "#C9D7DF",
                        boxShadow: "0px 12px 24px rgba(23,54,74,0.12)",
                      }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.25 }}
                      className="group relative flex min-h-[96px] w-full flex-shrink-0 items-center rounded-[21px] border border-[#E9E9E9] bg-white text-left shadow-[0px_4px_8px_-4px_#00000017]"
                    >
                      {/* Avatar */}
                      <div className="absolute left-[17px] top-1/2 h-[56px] w-[56px] -translate-y-1/2">
                        <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#D8DDE0] transition-transform duration-300 group-hover:scale-105">
                          <span className="text-[22px]">👨🏾‍🔧</span>
                        </div>
                      </div>

                      {/* Job information */}
                      <div className="min-w-0 flex-1 py-4 pl-[88px] pr-3 sm:pl-[93px] sm:pr-4">
                        <h3 className="truncate font-['Montserrat'] text-[14px] font-semibold leading-[120%] text-[#111111] transition-colors duration-300 group-hover:text-[#23658B] sm:text-[16px]">
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

                      {/* Hover arrow */}
                      <motion.span
                        className="mr-3 flex shrink-0"
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        <FiArrowRight className="h-4 w-4 text-[#23658B] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </motion.span>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* POST A JOB */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          whileHover={{
            y: -5,
            boxShadow: "0px 10px 22px rgba(23,54,74,0.10)",
          }}
          className="flex min-h-[208px] w-full flex-shrink-0 flex-col items-center rounded-[10px] border border-[#B7C8D2] bg-[#E8EDF1] lg:w-[440px]"
        >
          <div className="relative mt-[40px] h-[110px] w-full max-w-[301px]">
            <p className="absolute left-1/2 top-0 w-[240px] -translate-x-1/2 text-center font-['Montserrat'] text-[14px] font-normal leading-[140%] text-[#222222]">
              We've got professionals for
              <br />
              every kind of job
            </p>

            <motion.button
              type="button"
              onClick={() => navigate("/dashboard/post")}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group absolute left-1/2 top-[60px] flex h-[50px] w-full -translate-x-1/2 items-center justify-center gap-[12px] rounded-[31px] border border-[#B7C8D2] bg-[#0D2E43] px-4 font-['Montserrat'] text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#173F59]"
            >
              <motion.span
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                <FiPlus className="h-[16px] w-[16px] rounded-full bg-white text-[#0D2E43]" />
              </motion.span>
              Post a job
              <FiArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

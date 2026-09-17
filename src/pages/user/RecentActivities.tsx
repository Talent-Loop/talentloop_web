import React from "react";

type ActivityStatus = "Verified" | "Pending" | "Rejected";

interface RecentActivity {
  id: number;
  initials: string;
  worker: string;
  skill: string;
  status: ActivityStatus;
  rating: string;
  jobs: string;
}

const activities: RecentActivity[] = [
  {
    id: 1,
    initials: "AO",
    worker: "Austin Olatunji",
    skill: "Plumber",
    status: "Verified",
    rating: "3.8",
    jobs: "3",
  },
  {
    id: 2,
    initials: "JF",
    worker: "James Frank",
    skill: "Home Cleaning",
    status: "Pending",
    rating: "-",
    jobs: "-",
  },
  {
    id: 3,
    initials: "OI",
    worker: "Obinna Ike",
    skill: "Tailoring",
    status: "Verified",
    rating: "3.8",
    jobs: "4",
  },
  {
    id: 4,
    initials: "KA",
    worker: "Kate Asana",
    skill: "Catering",
    status: "Verified",
    rating: "4.0",
    jobs: "3",
  },
  {
    id: 5,
    initials: "AO",
    worker: "Austin Olatunji",
    skill: "Solar Technician",
    status: "Verified",
    rating: "3.7",
    jobs: "6",
  },
  {
    id: 6,
    initials: "JF",
    worker: "James Frank",
    skill: "Welder",
    status: "Pending",
    rating: "-",
    jobs: "-",
  },
  {
    id: 7,
    initials: "OI",
    worker: "Obinna Ike",
    skill: "Event planner",
    status: "Verified",
    rating: "3.8",
    jobs: "3",
  },
  {
    id: 8,
    initials: "KA",
    worker: "Kate Asana",
    skill: "Baker",
    status: "Verified",
    rating: "4.7",
    jobs: "12",
  },
  {
    id: 9,
    initials: "AO",
    worker: "Austin Olatunji",
    skill: "AC technician",
    status: "Verified",
    rating: "3.5",
    jobs: "3",
  },
  {
    id: 10,
    initials: "JF",
    worker: "James Frank",
    skill: "Freezer technician",
    status: "Pending",
    rating: "-",
    jobs: "-",
  },
  {
    id: 11,
    initials: "OI",
    worker: "Obinna Ike",
    skill: "Carpenter",
    status: "Verified",
    rating: "3.9",
    jobs: "7",
  },
  {
    id: 12,
    initials: "KA",
    worker: "Kate Asana",
    skill: "Painter",
    status: "Rejected",
    rating: "-",
    jobs: "-",
  },
];

function StatusBadge({ status }: { status: ActivityStatus }) {
  const styles: Record<ActivityStatus, string> = {
    Verified: "bg-[#D1FAE5] text-[#16A34A]",
    Pending: "bg-[#FEF3C7] text-[#F59E0B]",
    Rejected: "bg-[#EF0000] text-white",
  };

  return (
    <span
      className={`
        inline-flex
        min-h-[20px]
        items-center
        rounded-[4px]
        px-2.5
        py-0.5
        font-['Inter']
        text-[12px]
        font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

function WorkerAvatar({
  initials,
}: {
  initials: string;
}) {
  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#0D3B56]
        font-['Inter']
        text-[12px]
        font-medium
        text-white
      "
    >
      {initials}
    </div>
  );
}

function ReportButton({
  status,
}: {
  status: ActivityStatus;
}) {
  return (
    <button
      type="button"
      className={`
        inline-flex
        h-7
        items-center
        justify-center
        rounded-[5px]
        px-3
        font-['Inter']
        text-[12px]
        font-medium
        transition
        ${
          status === "Rejected"
            ? "bg-[#EF0000] text-white hover:bg-[#D90000]"
            : "bg-[#E8EEF3] text-[#94A3B8] hover:bg-[#DDE6EC]"
        }
      `}
    >
      Report
    </button>
  );
}

export default function RecentActivities() {
  return (
    <section
      className="
        w-full
        overflow-hidden
        rounded-[10px]
        border
        border-[#0D2E431F]
        bg-white
      "
    >
      {/* Header */}
      <div className="px-4 pt-4 sm:px-5 sm:pt-[17px] lg:px-[25px]">
        <h2
          className="
            font-['Inter']
            text-[17px]
            font-semibold
            leading-6
            text-[#24364B]
            sm:text-[18px]
          "
        >
          Recent Activities
        </h2>
      </div>

      {/* DESKTOP / TABLET TABLE */}
      <div className="mt-3 hidden overflow-x-auto px-4 pb-3 sm:block sm:px-5 lg:px-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E8EEF3]">
              <th className="py-3 pr-4 text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Worker
              </th>

              <th className="px-3 py-3 text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Skill
              </th>

              <th className="px-3 py-3 text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Status
              </th>

              <th className="px-3 py-3 text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Ratings
              </th>

              <th className="px-3 py-3 text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Jobs
              </th>

              <th className="py-3 pl-3 text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.id}
                className="border-b border-[#F0F4F7] last:border-b-0"
              >
                {/* Worker */}
                <td className="py-3 pr-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <WorkerAvatar initials={activity.initials} />

                    <span
                      className="
                        truncate
                        font-['Inter']
                        text-[12px]
                        font-semibold
                        text-[#24364B]
                      "
                    >
                      {activity.worker}
                    </span>
                  </div>
                </td>

                {/* Skill */}
                <td className="px-3 py-3">
                  <span
                    className="
                      font-['Inter']
                      text-[12px]
                      font-medium
                      text-[#24364B]
                    "
                  >
                    {activity.skill}
                  </span>
                </td>

                {/* Status */}
                <td className="px-3 py-3">
                  <StatusBadge status={activity.status} />
                </td>

                {/* Rating */}
                <td className="px-3 py-3">
                  <span
                    className="
                      font-['Inter']
                      text-[12px]
                      font-semibold
                      text-[#24364B]
                    "
                  >
                    {activity.rating}
                  </span>
                </td>

                {/* Jobs */}
                <td className="px-3 py-3">
                  <span
                    className="
                      font-['Inter']
                      text-[12px]
                      font-semibold
                      text-[#24364B]
                    "
                  >
                    {activity.jobs}
                  </span>
                </td>

                {/* Action */}
                <td className="py-3 pl-3">
                  <ReportButton status={activity.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  MOBILE ACTIVITY CARDS */}
      <div className="mt-3 space-y-2 px-3 pb-3 sm:hidden">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="
              rounded-[8px]
              border
              border-[#E8EEF3]
              bg-[#FAFCFD]
              p-3
            "
          >
            {/* Worker + status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <WorkerAvatar initials={activity.initials} />

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      font-['Inter']
                      text-[12px]
                      font-semibold
                      text-[#24364B]
                    "
                  >
                    {activity.worker}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      font-['Inter']
                      text-[11px]
                      font-medium
                      text-[#64748B]
                    "
                  >
                    {activity.skill}
                  </p>
                </div>
              </div>

              <StatusBadge status={activity.status} />
            </div>

            {/* Details */}
            <div
              className="
                mt-3
                grid
                grid-cols-2
                gap-2
                border-t
                border-[#E8EEF3]
                pt-3
              "
            >
              <div>
                <p className="font-['Inter'] text-[10px] font-medium text-[#94A3B8]">
                  Rating
                </p>

                <p className="mt-0.5 font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                  {activity.rating}
                </p>
              </div>

              <div>
                <p className="font-['Inter'] text-[10px] font-medium text-[#94A3B8]">
                  Jobs
                </p>

                <p className="mt-0.5 font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                  {activity.jobs}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="mt-3 flex justify-end">
              <ReportButton status={activity.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
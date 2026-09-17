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
  const styles = {
    Verified: "bg-[#D1FAE5] text-[#16A34A]",
    Pending: "bg-[#FEF3C7] text-[#F59E0B]",
    Rejected: "bg-[#EF0000] text-white",
  };

  return (
    <span
      className={`inline-flex h-[20px] items-center rounded-[4px] px-[10px] text-[12px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function RecentActivities() {
  return (
    <section className="w-full overflow-hidden rounded-[10px] border border-[#0D2E431F] bg-white">
      <div className="px-[25px] pt-[17px]">
        <h2 className="font-['Inter'] text-[18px] font-semibold leading-[24px] text-[#24364B]">
          Recent Activities
        </h2>
      </div>

      <div className="overflow-x-auto px-[24px] pb-[8px]">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="h-[40px]">
              <th className="w-[24%] text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Worker
              </th>

              <th className="w-[16%] text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Skill
              </th>

              <th className="w-[18%] text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Status
              </th>

              <th className="w-[18%] text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Ratings
              </th>

              <th className="w-[17%] text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Jobs
              </th>

              <th className="w-[7%] text-left font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="h-[50px]">
                <td>
                  <div className="flex items-center gap-[6px]">
                    <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#0D3B56] font-['Inter'] text-[12px] font-medium text-white">
                      {activity.initials}
                    </div>

                    <span className="font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                      {activity.worker}
                    </span>
                  </div>
                </td>

                <td>
                  <span className="font-['Inter'] text-[12px] font-medium text-[#24364B]">
                    {activity.skill}
                  </span>
                </td>

                <td>
                  <StatusBadge status={activity.status} />
                </td>

                <td>
                  <span className="font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                    {activity.rating}
                  </span>
                </td>

                <td>
                  <span className="font-['Inter'] text-[12px] font-semibold text-[#24364B]">
                    {activity.jobs}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    className={`inline-flex h-[20px] items-center justify-center rounded-[4px] px-[10px] font-['Inter'] text-[12px] font-medium ${
                      activity.status === "Rejected"
                        ? "bg-[#EF0000] text-white"
                        : "bg-[#E8EEF3] text-[#94A3B8]"
                    }`}
                  >
                    Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
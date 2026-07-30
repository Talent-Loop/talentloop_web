import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { FiEye, FiX } from "react-icons/fi";

import {
  getAgentApplications,
  approveAgentApplication,
  rejectAgentApplication,
} from "../services/agentApplications";
import type {
  AgentApplication,
} from "../types/agentApplications";

export default function AgentApplicationPage() {
  const [applications, setApplications] = useState<AgentApplication[]>([]);
const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] =
    useState<AgentApplication | null>(null);

  const [selectedVerification, setSelectedVerification] =
    useState<AgentApplication | null>(null);

  const [showRejectModal, setShowRejectModal] =
    useState(false);

  const [rejectReason, setRejectReason] =
    useState("");

  const fetchApplications = async () => {
  try {
    const response = await getAgentApplications();

    console.log("APPLICATIONS:", response);

    setApplications(response.data.applications);
  } catch (error) {
    console.error("Failed to fetch applications", error);
  }
};

useEffect(() => {
  fetchApplications();
}, []);

const filteredApplications = applications.filter((application) => {
  const term = search.toLowerCase();

  return (
    application.userId.name
      ?.toLowerCase()
      .includes(term) ||

    application.userId.email
      ?.toLowerCase()
      .includes(term) ||

    application.city
      ?.toLowerCase()
      .includes(term) ||

    application.state
      ?.toLowerCase()
      .includes(term)
  );
});

return (
  <>
    <section className="space-y-6">
      <div>
        <h1 className="text-[48px] font-bold text-[#24364B]">
          Agent Applications
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Review agent applications
        </p>
      </div>

      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">

          <div className="border-b border-slate-200 p-5">
  <input
    type="text"
    placeholder="Search applicant..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="h-14 w-full rounded-full border border-slate-300 px-6 text-[#24364B] outline-none placeholder:text-slate-400 focus:border-slate-400"
  />
</div>
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="px-6 py-6">Applicant</th>
                <th className="px-6 py-6">Application</th>
                <th className="px-6 py-6">Submitted</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
             {filteredApplications.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100"
                >
                  <td className="px-6 py-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                        {item.userId.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <span className="font-medium text-slate-800">
                        {item.userId.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-7">
                    Agent Application
                  </td>

                  <td className="px-6 py-7">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-7">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-medium capitalize ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      • {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-7">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setSelectedUser(item)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-700"
                      >
                        <FiEye />
                        View
                      </button>

                      {item.status === "pending" && (
                        <>
                         <button
  onClick={() => {
    setSelectedVerification(item);
    setRejectReason("");
    setShowRejectModal(true);
  }}
  className="rounded-full border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-50"
>
  Reject
</button>

                         <button
  onClick={async () => {
    try {
      await approveAgentApplication(item._id);

      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Failed to approve application.");
    }
  }}
  className="rounded-full bg-[#0F4C75] px-6 py-2 font-medium text-white hover:bg-[#0c3e61]"
>
  Approve
</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
  <tr>
    <td
      colSpan={5}
      className="py-14 text-center text-slate-500"
    >
      No applications found.
    </td>
  </tr>
)}
            </tbody>
            </table>
          </div>

          {showRejectModal && selectedVerification && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-[790px] rounded-[32px] bg-white p-12 shadow-2xl">

      <div className="space-y-3">
        <h2 className="text-[52px] font-bold text-black">
          Reject Application
        </h2>

        <p className="text-[24px] text-slate-600">
          {selectedVerification.userId.name}'s application will be rejected
        </p>
      </div>

      <textarea
        value={rejectReason}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setRejectReason(e.target.value)
        }
        placeholder="Reason for rejection..."
        className="mt-10 h-[180px] w-full resize-none rounded-[24px] bg-slate-50 p-8 text-[24px] outline-none"
      />

      <div className="mt-10 flex justify-end gap-6">

        <button
          onClick={() => {
            setShowRejectModal(false);
            setRejectReason("");
          }}
          className="rounded-[20px] border border-slate-300 px-12 py-4"
        >
          Cancel
        </button>

        <button
  onClick={async () => {
    if (!rejectReason.trim()) {
      alert("Reason cannot be empty.");
      return;
    }

    try {
      await rejectAgentApplication(
        selectedVerification!._id,
        rejectReason
      );

      setShowRejectModal(false);
      setRejectReason("");
      setSelectedVerification(null);

      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Failed to reject application.");
    }
  }}
  className="rounded-[20px] bg-red-600 px-12 py-4 text-white"
>
  Reject
</button>

      </div>

    </div>
  </div>
)}
        </section>   {/* closes white card */}

      </section>     {/* closes outer section */}

{selectedUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <div className="relative w-full max-w-xl rounded-[32px] bg-white p-10 shadow-2xl">

      <button
        onClick={() => setSelectedUser(null)}
        className="absolute right-8 top-8 text-3xl text-slate-400"
      >
        <FiX />
      </button>

      <h2 className="text-center text-5xl font-bold text-[#24364B]">
        Agent Info
      </h2>

      <div className="mt-8 flex justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-200 text-5xl font-bold">
          {selectedUser.userId.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
      </div>

      <h3 className="mt-6 text-center text-4xl font-bold text-[#24364B]">
        {selectedUser.userId.name}
      </h3>

      <div className="mt-8 space-y-5 text-center">

        <div>
          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Email
          </p>

          <p className="mt-2 text-xl text-slate-700">
            {selectedUser.userId.email}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Phone
          </p>

          <p className="mt-2 text-xl text-slate-700">
            {selectedUser.userId.phone}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Location
          </p>

          <p className="mt-2 text-xl">
            {selectedUser.city}, {selectedUser.state}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Experience
          </p>

          <p className="mt-2 text-xl text-slate-700">
            {selectedUser.experience}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Why do you want to be an Agent?
          </p>

          <p className="mt-2 text-xl text-slate-700">
            {selectedUser.whyYouWantToBeAgent}
          </p>
        </div>

      </div>

    </div>

  </div>
)}
    </>
  );
}

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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] =
    useState<AgentApplication | null>(null);

  const [selectedVerification, setSelectedVerification] =
    useState<AgentApplication | null>(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await getAgentApplications();

      console.log("APPLICATIONS:", response);

      setApplications(response.data.applications);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((application) => {
    const term = search.toLowerCase();

    return (
      application.userId.name?.toLowerCase().includes(term) ||
      application.userId.email?.toLowerCase().includes(term) ||
      application.city?.toLowerCase().includes(term) ||
      application.state?.toLowerCase().includes(term)
    );
  });

  const handleApprove = async (id: string) => {
    try {
      await approveAgentApplication(id);
      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Failed to approve application.");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Reason cannot be empty.");
      return;
    }

    if (!selectedVerification) return;

    try {
      await rejectAgentApplication(
        selectedVerification._id,
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
  };

  if (loading) {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#17324D] border-t-transparent"></div>

          <p className="mt-5 text-lg text-slate-500">
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-w-0 space-y-6">
        {/* Page Heading */}
        <div>
          <h1 className="text-3xl font-bold text-[#24364B] sm:text-[48px]">
            Agent Applications
          </h1>

          <p className="mt-2 text-base text-slate-500 sm:text-lg">
            Review agent applications
          </p>
        </div>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[36px]">

          {/* Search */}
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <input
              type="text"
              placeholder="Search applicant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-full border border-slate-300 px-5 text-sm text-[#24364B] outline-none placeholder:text-slate-400 focus:border-slate-400 sm:h-14 sm:px-6 sm:text-base"
            />
          </div>

          {/* Mobile Application Cards */}
          <div className="space-y-4 p-4 md:hidden">
            {filteredApplications.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                {/* Applicant */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                    {item.userId.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-words font-semibold text-slate-800">
                      {item.userId.name}
                    </p>

                    <p className="break-all text-sm text-slate-500">
                      {item.userId.email}
                    </p>

                    <p className="mt-1 break-words text-xs text-slate-400">
                      {item.userId.phone}
                    </p>
                  </div>
                </div>

                {/* Application Details */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Application
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      Agent Application
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      • {item.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Submitted
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => setSelectedUser(item)}
                    className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => handleApprove(item._id)}
                        className="rounded-full bg-[#0F4C75] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c3e61]"
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {filteredApplications.length === 0 && (
              <p className="py-10 text-center text-slate-500">
                No applications found.
              </p>
            )}
          </div>

          {/* Desktop Applications Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px]">
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
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                          {item.userId.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>

                        <span className="break-words font-medium text-slate-800">
                          {item.userId.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-7">
                      Agent Application
                    </td>

                    <td className="whitespace-nowrap px-6 py-7">
                      {new Date(item.createdAt).toLocaleDateString()}
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
                              onClick={() => handleApprove(item._id)}
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
        </section>
      </section>

      {/* Reject Application Modal */}
      {showRejectModal && selectedVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6 backdrop-blur-sm">
          <div className="my-auto w-full max-w-[790px] rounded-2xl bg-white p-5 shadow-2xl sm:rounded-[32px] sm:p-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-black sm:text-[52px]">
                Reject Application
              </h2>

              <p className="break-words text-base text-slate-600 sm:text-[24px]">
                {selectedVerification.userId.name}'s application will be
                rejected
              </p>
            </div>

            <textarea
              value={rejectReason}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setRejectReason(e.target.value)
              }
              placeholder="Reason for rejection..."
              className="mt-8 h-36 w-full resize-none rounded-2xl bg-slate-50 p-4 text-base outline-none sm:mt-10 sm:h-[180px] sm:rounded-[24px] sm:p-8 sm:text-[24px]"
            />

            <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:mt-10 sm:flex-row sm:gap-6">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedVerification(null);
                }}
                className="rounded-xl border border-slate-300 px-8 py-3 text-sm sm:rounded-[20px] sm:px-12 sm:py-4 sm:text-base"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="rounded-xl bg-red-600 px-8 py-3 text-sm text-white hover:bg-red-700 sm:rounded-[20px] sm:px-12 sm:py-4 sm:text-base"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Info Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6 backdrop-blur-sm">
          <div className="relative my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:rounded-[32px] sm:p-10">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-5 top-5 text-2xl text-slate-400 hover:text-slate-700 sm:right-8 sm:top-8 sm:text-3xl"
            >
              <FiX />
            </button>

            <h2 className="text-center text-3xl font-bold text-[#24364B] sm:text-5xl">
              Agent Info
            </h2>

            <div className="mt-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold sm:h-32 sm:w-32 sm:text-5xl">
                {selectedUser.userId.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            </div>

            <h3 className="mt-6 break-words text-center text-2xl font-bold text-[#24364B] sm:text-4xl">
              {selectedUser.userId.name}
            </h3>

            <div className="mt-8 space-y-5 text-center">
              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Email
                </p>

                <p className="mt-2 break-all text-base text-slate-700 sm:text-xl">
                  {selectedUser.userId.email}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Phone
                </p>

                <p className="mt-2 break-words text-base text-slate-700 sm:text-xl">
                  {selectedUser.userId.phone}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Location
                </p>

                <p className="mt-2 text-base text-slate-700 sm:text-xl">
                  {selectedUser.city}, {selectedUser.state}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Experience
                </p>

                <p className="mt-2 text-base text-slate-700 sm:text-xl">
                  {selectedUser.experience}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Why do you want to be an Agent?
                </p>

                <p className="mt-2 break-words text-base text-slate-700 sm:text-xl">
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

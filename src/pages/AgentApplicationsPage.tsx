import { useState } from "react";
import type { ChangeEvent } from "react";
import { FiEye, FiX } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

interface Verification {
  id: string; // Added ID to guarantee unique keys
  initials: string;
  name: string;
  idType: string;
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
  email: string;
  location: string;
  category: string;
  workTime: string;
  workDays: string;
}

const initialVerifications: Verification[] = [
  {
    id: "V-1",
    initials: "AO",
    name: "Adaeze Okafor",
    idType: "NIN",
    submitted: "2026-05-18",
    status: "Pending",
    email: "adaeze@gmail.com",
    location: "Lagos, Nigeria",
    category: "Plumber",
    workTime: "07:00AM - 05:00PM",
    workDays: "Mon - Fri",
  },
  {
    id: "V-2",
    initials: "KN",
    name: "Kelechi Nwosu",
    idType: "Passport",
    submitted: "2026-05-22",
    status: "Pending",
    email: "kelechi@gmail.com",
    location: "Abuja, Nigeria",
    category: "Electrician",
    workTime: "08:00AM - 04:00PM",
    workDays: "Mon - Sat",
  },
  {
    id: "V-3",
    initials: "AH",
    name: "Ahmad Hamza",
    idType: "NIN",
    submitted: "2026-05-23",
    status: "Pending",
    email: "ahmad@gmail.com",
    location: "Kaduna, Nigeria",
    category: "Carpenter",
    workTime: "09:00AM - 06:00PM",
    workDays: "Mon - Fri",
  },
  {
    id: "V-4",
    initials: "AH",
    name: "Ahmad Hamza",
    idType: "NIN",
    submitted: "2026-05-23",
    status: "Pending",
    email: "ahmad@gmail.com",
    location: "Kaduna, Nigeria",
    category: "Carpenter",
    workTime: "09:00AM - 06:00PM",
    workDays: "Mon - Fri",
  },
  {
    id: "V-5",
    initials: "AH",
    name: "Ahmad Hamza",
    idType: "NIN",
    submitted: "2026-05-23",
    status: "Pending",
    email: "ahmad@gmail.com",
    location: "Kaduna, Nigeria",
    category: "Carpenter",
    workTime: "09:00AM - 06:00PM",
    workDays: "Mon - Fri",
  },
];

export default function VerificationPage() {
  const [verificationsList, setVerificationsList] = useState<Verification[]>(initialVerifications);
  const [selectedUser, setSelectedUser] = useState<Verification | null>(null);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");

  // Action: Approve
  const handleApprove = (id: string, name: string) => {
    setVerificationsList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Approved" } : v))
    );
    toast.success(`Application approved for ${name}!`, {
      style: {
        borderRadius: "16px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // Action: Reject Submission
  const handleRejectSubmit = () => {
    if (!selectedVerification) return;

    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    setVerificationsList((prev) =>
      prev.map((v) =>
        v.id === selectedVerification.id ? { ...v, status: "Rejected" } : v
      )
    );

    toast.error(`Application rejected for ${selectedVerification.name}.`, {
      style: {
        borderRadius: "16px",
        background: "#333",
        color: "#fff",
      },
    });

    setShowRejectModal(false);
    setRejectReason("");
  };

  return (
    <>
      {/* Toast notifications container */}
      <Toaster position="top-right" reverseOrder={false} />

      <section className="space-y-6">
        <div>
          <h1 className="text-[48px] font-bold text-[#24364B]">
            Identification
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            Review and submit user Identity
          </p>
        </div>

        <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-6">User</th>
                  <th className="px-6 py-6">ID Type</th>
                  <th className="px-6 py-6">Submitted</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-6 py-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {verificationsList.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-none"
                  >
                    <td className="px-6 py-7">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                          {item.initials}
                        </div>
                        <span className="font-medium text-slate-800">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-7 text-slate-700">
                      {item.idType}
                    </td>

                    <td className="px-6 py-7 text-slate-600">
                      {item.submitted}
                    </td>

                    <td className="px-6 py-7">
                      {item.status === "Pending" ? (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
                          • Pending
                        </span>
                      ) : item.status === "Approved" ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                          • Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700">
                          • Rejected
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-7">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setSelectedUser(item)}
                          className="flex items-center gap-2 text-slate-500 hover:text-slate-700"
                        >
                          <FiEye />
                          View
                        </button>

                        <button
                          onClick={() => {
                            setSelectedVerification(item);
                            setShowRejectModal(true);
                          }}
                          disabled={item.status !== "Pending"}
                          className="rounded-full border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => handleApprove(item.id, item.name)}
                          disabled={item.status !== "Pending"}
                          className="rounded-full bg-[#0F4C75] px-6 py-2 font-medium text-white hover:bg-[#0c3e61] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reject Application Modal */}
          {showRejectModal && selectedVerification && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="w-full max-w-[790px] rounded-[32px] bg-white p-12 shadow-2xl">
                <div className="space-y-3">
                  <h2 className="text-[52px] font-bold text-black">
                    Reject Application
                  </h2>
                  <p className="text-[24px] text-slate-600">
                    {selectedVerification.name}'s application will be rejected
                  </p>
                </div>

                <textarea
                  value={rejectReason}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setRejectReason(e.target.value)
                  }
                  placeholder="e.g. Insufficient Experience for Selected category"
                  className="mt-10 h-[180px] w-full resize-none rounded-[24px] bg-slate-50 p-8 text-[24px] text-slate-700 outline-none placeholder:text-slate-400"
                />

                <div className="mt-10 flex justify-end gap-6">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectReason("");
                    }}
                    className="rounded-[20px] border border-slate-300 px-12 py-4 text-[20px] font-medium text-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleRejectSubmit}
                    className="rounded-[20px] bg-red-600 px-12 py-4 text-[20px] font-medium text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>

      {/* Agent Info Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-[32px] bg-white p-10 shadow-2xl">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-8 top-8 text-3xl text-slate-400 hover:text-slate-600"
            >
              <FiX />
            </button>

            <h2 className="text-center text-5xl font-bold text-[#24364B]">
              Agent Info
            </h2>

            <div className="mt-8 flex justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-200 text-5xl font-bold text-slate-700">
                {selectedUser.initials}
              </div>
            </div>

            <h3 className="mt-6 text-center text-4xl font-bold text-[#24364B]">
              {selectedUser.name}
            </h3>

            <div className="mt-8 space-y-5 text-center">
              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Email Address
                </p>
                <p className="mt-2 text-xl text-slate-700">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Location
                </p>
                <p className="mt-2 text-xl text-slate-700">
                  {selectedUser.location}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  Category
                </p>
                <p className="mt-2 text-xl text-slate-700">
                  {selectedUser.category}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">
                  ID Card
                </p>
                <button 
                  onClick={() => toast.success("Viewing digital identity card...")}
                  className="mt-3 rounded-full border border-slate-300 px-8 py-2 font-medium text-slate-700 hover:bg-slate-50"
                >
                  View Document
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-xs uppercase tracking-[3px] text-slate-400">
                    Work Time
                  </p>
                  <p className="mt-2 text-xl text-slate-700">
                    {selectedUser.workTime}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[3px] text-slate-400">
                    Work Days
                  </p>
                  <p className="mt-2 text-xl text-slate-700">
                    {selectedUser.workDays}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
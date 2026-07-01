import { useState, useEffect } from 'react'
import { FiEye, FiX } from 'react-icons/fi'
import { 
  getAgentApplications, 
  approveAgentApplication, 
  rejectAgentApplication 
} from '../services/agents'

const fallbackVerifications = [
  {
    id: 'mock-1',
    initials: 'AO',
    name: 'Adaeze Okafor',
    idType: 'NIN',
    submitted: '2026-05-18',
    status: 'Pending',
    email: 'adaeze@gmail.com',
    location: 'Lagos, Nigeria',
    category: 'Plumber',
    workTime: '07:00AM - 05:00PM',
    workDays: 'Mon - Fri',
  },
  {
    id: 'mock-2',
    initials: 'KN',
    name: 'Kelechi Nwosu',
    idType: 'Passport',
    submitted: '2026-05-22',
    status: 'Pending',
    email: 'kelechi@gmail.com',
    location: 'Abuja, Nigeria',
    category: 'Electrician',
    workTime: '08:00AM - 04:00PM',
    workDays: 'Mon - Sat',
  },
  {
    id: 'mock-3',
    initials: 'AH',
    name: 'Ahmad Hamza',
    idType: 'NIN',
    submitted: '2026-05-23',
    status: 'Pending',
    email: 'ahmad@gmail.com',
    location: 'Kaduna, Nigeria',
    category: 'Carpenter',
    workTime: '09:00AM - 06:00PM',
    workDays: 'Mon - Fri',
  },
  {
    id: 'mock-4',
    initials: 'MM',
    name: 'Marvel Mark',
    idType: 'Passport',
    submitted: '2026-07-01',
    status: 'Pending',
    email: 'marvelmark009@gmail.com',
    location: 'Kaduna, Nigeria',
    category: 'plubmer',
    workTime: 'always open',
    workDays: 'Mon - Sun',
  }
]

export default function AgentApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedVerification, setSelectedVerification] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => {
    const fetchLiveApplications = async () => {
      try {
        const res = await getAgentApplications();
        console.log("👉 RAW BACKEND RESPONSE:", res);

        // Standardize whatever structure the backend sends back
        let liveList = [];
        if (Array.isArray(res)) {
          liveList = res;
        } else if (res && Array.isArray(res.applications)) {
          liveList = res.applications;
        } else if (res && Array.isArray(res.data)) {
          liveList = res.data;
        }

        if (liveList && liveList.length > 0) {
          // Normalize backend structure fields to match UI keys if necessary
          const normalized = liveList.map(item => ({
            id: item._id || item.id,
            name: item.name || (item.user ? `${item.user.firstName} ${item.user.lastName}` : 'Unknown User'),
            idType: item.idType || 'NIN',
            submitted: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : '2026-07-01',
            status: item.status || 'Pending',
            email: item.email || item.user?.email || 'N/A',
            location: item.location || 'N/A',
            category: item.category || 'Agent',
            workTime: item.workTime || 'N/A',
            workDays: item.workDays || 'N/A'
          }));
          setApplications(normalized);
        } else {
          console.log("⚠️ Backend returned an empty array or format mismatched. Using Mock Data fallback.");
          setApplications(fallbackVerifications);
        }
      } catch (error) {
        console.error("❌ Network Fetch Error:", error);
        setApplications(fallbackVerifications);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveApplications();
  }, []);

  const handleApprove = async (id) => {
    if (String(id).startsWith('mock')) {
      alert("[Mock Mode] Application approved successfully!");
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'Approved' } : app));
      return;
    }

    try {
      await approveAgentApplication(id);
      alert("Application approved successfully on Server!");
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'Approved' } : app));
    } catch (error) {
      alert("Failed to approve application on the live backend.");
    }
  };

  const handleConfirmReject = async () => {
    const targetId = selectedVerification.id;

    if (String(targetId).startsWith('mock')) {
      alert(`[Mock Mode] Application rejected. Reason: ${rejectReason}`);
      setApplications(prev => prev.map(app => app.id === targetId ? { ...app, status: 'Rejected' } : app));
      setShowRejectModal(false);
      setRejectReason('');
      return;
    }

    try {
      await rejectAgentApplication(targetId, rejectReason);
      alert("Application has been rejected on Server.");
      setApplications(prev => prev.map(app => app.id === targetId ? { ...app, status: 'Rejected' } : app));
      setShowRejectModal(false);
      setRejectReason('');
    } catch (error) {
      alert("Failed to reject application on the live backend.");
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xl font-medium text-slate-500">Loading agent applications...</div>;
  }

  return (
    <>
      <section className="space-y-6">
        <div>
          <h1 className="text-[48px] font-bold text-[#24364B]">Agent Applications</h1>
          <p className="mt-2 text-lg text-slate-500">Review and submit user Identity</p>
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
                {applications.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="px-6 py-7">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                          {item.initials || item.name.substring(0,2).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-7 text-slate-700">{item.idType}</td>
                    <td className="px-6 py-7 text-slate-600">{item.submitted}</td>
                    <td className="px-6 py-7">
                      <span className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-medium ${
                        item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        • {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-7">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => setSelectedUser(item)} className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
                          <FiEye /> View
                        </button>
                        <button onClick={() => { setSelectedVerification(item); setShowRejectModal(true); }} className="rounded-full border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-50">
                          Reject
                        </button>
                        <button onClick={() => handleApprove(item.id)} className="rounded-full bg-[#0F4C75] px-6 py-2 font-medium text-white hover:bg-[#0c3e61]">
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reject Modal */}
          {showRejectModal && selectedVerification && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="w-full max-w-[790px] rounded-[32px] bg-white p-12 shadow-2xl">
                <div className="space-y-3">
                  <h2 className="text-[52px] font-bold text-black">Reject Application</h2>
                  <p className="text-[24px] text-slate-600">{selectedVerification.name}'s application will be rejected</p>
                </div>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g Insufficient Experience for Selected category"
                  className="mt-10 h-[180px] w-full resize-none rounded-[24px] bg-slate-50 p-8 text-[24px] text-slate-700 outline-none placeholder:text-slate-400"
                />
                <div className="mt-10 flex justify-end gap-6">
                  <button onClick={() => { setShowRejectModal(false); setRejectReason(''); }} className="rounded-[20px] border border-slate-300 px-12 py-4 text-[20px] font-medium text-slate-700">Cancel</button>
                  <button onClick={handleConfirmReject} className="rounded-[20px] bg-red-600 px-12 py-4 text-[20px] font-medium text-white hover:bg-red-700">Reject</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>

      {/* View Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-[32px] bg-white p-10 shadow-2xl">
            <button onClick={() => setSelectedUser(null)} className="absolute right-8 top-8 text-3xl text-slate-400 hover:text-slate-600">
              <FiX />
            </button>
            <h2 className="text-center text-5xl font-bold text-[#24364B]">Agent Info</h2>
            <div className="mt-8 flex justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-200 text-5xl font-bold text-slate-700">
                {selectedUser.initials || selectedUser.name.substring(0,2).toUpperCase()}
              </div>
            </div>
            <h3 className="mt-6 text-center text-4xl font-bold text-[#24364B]">{selectedUser.name}</h3>
            <div className="mt-8 space-y-5 text-center">
              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">Email Address</p>
                <p className="mt-2 text-xl text-slate-700">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">Location</p>
                <p className="mt-2 text-xl text-slate-700">{selectedUser.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[3px] text-slate-400">Category</p>
                <p className="mt-2 text-xl text-slate-700">{selectedUser.category}</p>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-xs uppercase tracking-[3px] text-slate-400">Work Time</p>
                  <p className="mt-2 text-xl text-slate-700">{selectedUser.workTime}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[3px] text-slate-400">Work Days</p>
                  <p className="mt-2 text-xl text-slate-700">{selectedUser.workDays}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
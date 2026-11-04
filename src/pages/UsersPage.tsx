
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getUsers, banUser, unbanUser } from "../services/users";
import toast from "react-hot-toast";
import type { User } from "../types/users";

const avatarColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();

    return (
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term)
    );
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBanUser = async () => {
    if (!selectedUser) return;

    try {
      await banUser(selectedUser._id);
      toast.success("User banned successfully!");
      setShowBanModal(false);
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to ban user."
      );
    }
  };

  const handleUnbanUser = async (user: User) => {
    try {
      await unbanUser(user._id);
      toast.success("User unbanned successfully!");
      fetchUsers();
    } catch (error: any) {
      console.error(error.response?.data);
      toast.error(
        error?.response?.data?.message || "Failed to unban user."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#17324D] border-t-transparent"></div>
          <p className="mt-5 text-lg text-slate-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-w-0 space-y-6">
      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[36px]">

        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full min-w-0 flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-full border border-slate-300 bg-white pl-12 pr-4 text-sm text-[#24364B] outline-none transition placeholder:text-slate-400 focus:border-slate-400 sm:h-14 sm:pl-14 sm:text-base"
            />
          </div>

          <div className="flex w-full gap-2 sm:gap-3 lg:w-auto">
            <select className="h-11 min-w-0 flex-1 rounded-full border border-slate-300 px-3 text-sm text-slate-700 sm:h-12 sm:px-4 lg:flex-none">
              <option>All roles</option>
              <option>User</option>
              <option>Agent</option>
            </select>

            <select className="h-11 min-w-0 flex-1 rounded-full border border-slate-300 px-3 text-sm text-slate-700 sm:h-12 sm:px-4 lg:flex-none">
              <option>All status</option>
              <option>Active</option>
              <option>Banned</option>
            </select>
          </div>
        </div>
        {/* Mobile User Cards */}
        <div className="space-y-4 p-4 md:hidden">
          {filteredUsers.map((user, index) => (
            <div
              key={user._id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {/* User information */}
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    avatarColors[index % avatarColors.length]
                  }`}
                >
                  {`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="break-words font-semibold text-slate-800">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="break-all text-sm text-slate-500">
                    {user.email}
                  </p>
                  <p className="mt-1 break-words text-xs text-slate-400">
                    {user.phone}
                  </p>
                </div>
              </div>

              {/* Role and Status */}
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Role
                  </p>
                  <p className="mt-1 break-words font-medium text-slate-700">
                    {user.roleName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Status
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      !user.banned
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    • {user.banned ? "Banned" : "Active"}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Joined
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowUserModal(true);
                  }}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  View
                </button>

                {!user.banned ? (
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowBanModal(true);
                    }}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Ban
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnbanUser(user)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Unban
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="py-10 text-center text-slate-500">
              No users found.
            </p>
          )}
        </div>

        {/* Desktop Users Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] table-fixed">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="w-[21%] px-6 py-6">User</th>
                <th className="w-[25%] px-6 py-6">Contact</th>
                <th className="w-[12%] px-6 py-6">Role</th>
                <th className="w-[15%] px-6 py-6">Status</th>
                <th className="w-[12%] px-6 py-6">Joined</th>
                <th className="w-[15%] px-6 py-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b border-slate-100">
                  <td className="px-6 py-7">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                          avatarColors[index % avatarColors.length]
                        }`}
                      >
                        {`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`}
                      </div>

                      <span className="break-words font-medium text-slate-800">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-7">
                    <p className="break-all text-slate-700">{user.email}</p>
                    <p className="mt-1 text-sm text-slate-400">{user.phone}</p>
                  </td>

                  <td className="px-6 py-7 text-slate-700">
                    {user.roleName}
                  </td>

                  <td className="px-6 py-7">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-medium ${
                        !user.banned
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      • {user.banned ? "Banned" : "Active"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-7 text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-7">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="font-medium text-slate-700 hover:text-slate-900"
                      >
                        View
                      </button>

                      {!user.banned ? (
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowBanModal(true);
                          }}
                          className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Ban
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnbanUser(user)}
                          className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Unban
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>


      {/* Ban User Modal */}
      {showBanModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[750px] rounded-2xl bg-white p-5 shadow-xl sm:rounded-[32px] sm:p-10">
            <h2 className="text-3xl font-bold text-black sm:text-[48px]">
              Ban User
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-[20px]">
              {selectedUser.firstName} {selectedUser.lastName} will lose
              access immediately. This action can be reversed.
            </p>

            <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:mt-10 sm:flex-row sm:gap-5">
              <button
                onClick={() => setShowBanModal(false)}
                className="h-12 rounded-2xl border border-slate-300 px-8 text-sm font-medium text-slate-700 sm:h-[64px] sm:px-10 sm:text-[18px]"
              >
                Cancel
              </button>

              <button
                onClick={handleBanUser}
                className="h-12 rounded-2xl bg-[#0D4A73] px-8 text-sm font-medium text-white hover:bg-[#083A5A] sm:h-[64px] sm:px-10 sm:text-[18px]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Info Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]">
          <div className="relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white px-5 py-8 shadow-xl sm:rounded-[32px] sm:px-10">
            <button
              onClick={() => setShowUserModal(false)}
              className="absolute right-5 top-5 text-4xl leading-none text-slate-400 hover:text-slate-700 sm:right-8 sm:top-8 sm:text-5xl"
            >
              ×
            </button>

            <h2 className="text-center text-2xl font-bold text-[#24364B] sm:text-[28px]">
              User Info
            </h2>

            <div className="mt-8 flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold text-slate-700 sm:h-32 sm:w-32">
                {`${selectedUser.firstName?.[0] ?? ""}${selectedUser.lastName?.[0] ?? ""}`}
              </div>

              <h3 className="mt-6 break-words text-center text-2xl font-bold text-[#24364B] sm:text-[36px]">
                {selectedUser.firstName} {selectedUser.lastName}
              </h3>

              <div className="mt-8 max-w-full text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Email Address
                </p>

                <p className="mt-2 break-all text-base text-slate-700 sm:text-lg">
                  {selectedUser.email}
                </p>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Phone Number
                </p>

                <p className="mt-2 text-base text-slate-700 sm:text-lg">
                  {selectedUser.phone}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="grid grid-cols-2 text-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Role
                  </p>

                  <p className="mt-2 break-words text-xl font-semibold text-[#24364B] sm:text-2xl">
                    {selectedUser.roleName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Status
                  </p>

                  <p className="mt-2 text-xl font-semibold text-[#24364B] sm:text-2xl">
                    {selectedUser.banned ? "Banned" : "Active"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  BriefcaseBusiness,
  MessageCircle,
  WalletCards,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

const API_BASE_URL = "https://backend-talentloop.onrender.com/api/v1";

type NotificationType = "job" | "message" | "commission";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

type ApiNotification = {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

type NotificationsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    notifications: ApiNotification[];
    total: number;
    unreadCount: number;
    page: number;
    totalPages: number;
  };
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatTime = (dateString: string) => {
    const createdAt = new Date(dateString);
    const now = new Date();

    const difference = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000
    );

    if (difference < 60) {
      return "Just now";
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const normalizeType = (type: string): NotificationType => {
    if (type === "message") {
      return "message";
    }

    if (type === "commission") {
      return "commission";
    }

    return "job";
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("You are not authenticated.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/notifications?page=1&limit=20&unreadOnly=false`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch notifications (${response.status})`);
      }

      const result: NotificationsResponse = await response.json();

      const mappedNotifications: Notification[] =
        result.data.notifications.map((notification) => ({
          id: notification._id,
          type: normalizeType(notification.type),
          title: notification.title,
          description: notification.message,
          time: formatTime(notification.createdAt),
          unread: !notification.isRead,
        }));

      setNotifications(mappedNotifications);
      setUnreadCount(result.data.unreadCount);
    } catch (err) {
      console.error("NOTIFICATIONS ERROR:", err);
      setError("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/notifications/read-all`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to mark all notifications as read (${response.status})`
        );
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          unread: false,
        }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error("MARK ALL AS READ ERROR:", err);
    }
  };

  const markAsRead = async (id: string) => {
    const notification = notifications.find(
      (item) => item.id === id
    );

    if (!notification || !notification.unread) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to mark notification as read (${response.status})`
        );
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, unread: false }
            : notification
        )
      );

      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (err) {
      console.error("MARK AS READ ERROR:", err);
    }
  };

  const getIcon = (type: Notification["type"]) => {
    if (type === "message") {
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F6D5] text-[#72A928]">
          <MessageCircle size={18} strokeWidth={2} />
        </div>
      );
    }

    if (type === "commission") {
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F8D8] text-[#8AAE24]">
          <WalletCards size={18} strokeWidth={2} />
        </div>
      );
    }

    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5F5D8] text-[#69A62B]">
        <BriefcaseBusiness size={18} strokeWidth={2} />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      <ArtisanSidebar />

      <div className="min-w-0 flex-1">
        <ArtisanHeader />

        <main className="px-8 pb-12 pt-5">
          <div className="max-w-[900px]">

            {/* Page heading */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-[21px] font-semibold text-[#263842]">
                  Notifications
                </h1>

                <p className="mt-1 text-[11px] text-[#89969C]">
                  Stay updated with your latest activities.
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 text-[11px] font-medium text-[#10344A] transition hover:text-[#0B293A]"
                >
                  <CheckCheck size={16} strokeWidth={1.8} />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notification card */}
            <section className="overflow-hidden rounded-[9px] border border-[#E2E8E7] bg-white shadow-[0_1px_2px_rgba(16,52,74,0.02)]">

              {/* Card header */}
              <div className="flex items-center justify-between border-b border-[#EEF1F0] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F6D5] text-[#72A928]">
                    <Bell size={17} strokeWidth={1.9} />
                  </div>

                  <div>
                    <h2 className="text-[13px] font-semibold text-[#34454E]">
                      Recent Notifications
                    </h2>

                    <p className="mt-0.5 text-[9px] text-[#98A3A8]">
                      {unreadCount} unread notification
                      {unreadCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification list */}
              <div>
                {loading ? (
                  <div className="px-6 py-10 text-center text-[11px] text-[#89969C]">
                    Loading notifications...
                  </div>
                ) : error ? (
                  <div className="px-6 py-10 text-center text-[11px] text-[#D9534F]">
                    {error}
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-6 py-10 text-center text-[11px] text-[#89969C]">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                      className={`flex w-full items-start gap-4 border-b border-[#EEF1F0] px-6 py-5 text-left transition last:border-b-0 hover:bg-[#FAFCFB] ${
                        notification.unread
                          ? "bg-[#FBFDFC]"
                          : "bg-white"
                      }`}
                    >
                      {/* Notification icon */}
                      <div className="relative shrink-0">
                        {getIcon(notification.type)}

                        {notification.unread && (
                          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#FF4B4B]" />
                        )}
                      </div>

                      {/* Notification content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3
                            className={`text-[12px] ${
                              notification.unread
                                ? "font-semibold text-[#263842]"
                                : "font-medium text-[#52616A]"
                            }`}
                          >
                            {notification.title}
                          </h3>

                          <span className="shrink-0 text-[9px] text-[#9AA5A9]">
                            {notification.time}
                          </span>
                        </div>

                        <p className="mt-1.5 max-w-[650px] text-[10px] leading-[1.7] text-[#89969C]">
                          {notification.description}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </section>

            {/* Back button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex h-[38px] min-w-[72px] items-center justify-center rounded-[6px] bg-[#10344A] px-4 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#0B293A]"
              >
                Back
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
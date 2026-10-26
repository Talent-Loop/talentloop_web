
import { useCallback, useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clientApi from "../../services/clientApi";

type NotificationType = "bid" | "completed" | "profile" | "other";

interface NotificationItem {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsResponse {
  success: boolean;
  data: {
    notifications: NotificationItem[];
    total: number;
    unreadCount: number;
    page: number;
    totalPages: number;
  };
}

interface NotificationIconProps {
  type: NotificationType;
}

function getNotificationType(type: string): NotificationType {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("bid")) return "bid";

  if (
    normalizedType.includes("completed") ||
    normalizedType.includes("payment")
  ) {
    return "completed";
  }

  if (normalizedType.includes("profile")) return "profile";

  return "other";
}

function NotificationIcon({ type }: NotificationIconProps) {
  if (type === "completed") {
    return (
      <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
        <FiCheckCircle size={23} />
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#EF4444]">
        <FiUser size={22} />
      </div>
    );
  }

  return (
    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
      <FiMessageSquare size={22} />
    </div>
  );
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  const difference = Date.now() - date.getTime();

  if (difference < 0) {
    return date.toLocaleDateString();
  }

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(difference / 3600000);
  const days = Math.floor(difference / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function UserNotificationsPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingReadId, setMarkingReadId] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response =
        await clientApi.get<NotificationsResponse>("/notifications");

      const result = response.data.data;

      setNotifications(result.notifications ?? []);
      setUnreadCount(result.unreadCount ?? 0);
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && "response" in err
          ? (
              err as {
                response?: {
                  data?: { message?: string | string[] };
                };
              }
            ).response?.data?.message
          : undefined;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : typeof message === "string"
            ? message
            : "Unable to load notifications. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchNotifications();
  }, [fetchNotifications]);

  const navigateToNotification = (link?: string) => {
    if (!link) return;

    // Backend links can be relative paths such as /jobs/:jobId/bids.
    const normalizedLink = link.startsWith("/")
      ? link
      : `/${link}`;

    const bidsMatch = normalizedLink.match(
      /^\/jobs\/([^/]+)\/bids\/?$/,
    );

    if (bidsMatch) {
      navigate("/dashboard/jobs/bids", {
        state: { jobId: bidsMatch[1] },
      });
      return;
    }

    if (normalizedLink.startsWith("/jobs/")) {
      navigate(normalizedLink.replace(/^\/jobs\//, "/dashboard/jobs/"));
      return;
    }

    navigate(normalizedLink);
  };

  const handleNotificationClick = async (
    notification: NotificationItem,
  ) => {
    if (markingReadId) return;

    if (notification.isRead) {
      navigateToNotification(notification.link);
      return;
    }

    setMarkingReadId(notification._id);

    try {
      await clientApi.patch(
        `/notifications/${notification._id}/read`,
      );

      setNotifications((current) =>
        current.map((item) =>
          item._id === notification._id
            ? { ...item, isRead: true }
            : item,
        ),
      );

      setUnreadCount((current) => Math.max(0, current - 1));

      navigateToNotification(notification.link);
    } catch {
      toast.error("Unable to mark notification as read.");
    } finally {
      setMarkingReadId(null);
    }
  };

  return (
    <section className="px-0 pb-12 pt-[22px]">
      <div className="mb-[35px] flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          aria-label="Back to dashboard"
          className="flex h-8 w-8 items-center justify-center text-[#0F172A]"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Notifications
        </h1>

        {unreadCount > 0 && (
          <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#2563EB]">
            {unreadCount} unread
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex h-[180px] items-center justify-center rounded-[16px] bg-white text-sm text-[#64748B]">
          Loading notifications...
        </div>
      ) : error ? (
        <div className="rounded-[16px] bg-white px-5 py-8 text-center">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => void fetchNotifications()}
            className="mt-4 rounded-lg bg-[#0D2E43] px-5 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex h-[180px] items-center justify-center rounded-[16px] bg-white text-sm text-[#94A3B8]">
          No notifications available.
        </div>
      ) : (
        <div className="w-full space-y-[12px]">
          {notifications.map((notification) => (
            <button
              key={notification._id}
              type="button"
              onClick={() => void handleNotificationClick(notification)}
              disabled={markingReadId !== null}
              className={`flex min-h-[82px] w-full items-center gap-4 rounded-[16px] border-b border-[#F1F5F9] px-4 py-[10px] pb-4 text-left shadow-[0px_4px_12px_0px_#0000000F] transition-colors disabled:cursor-wait ${
                notification.isRead ? "bg-white" : "bg-[#F8FBFF]"
              }`}
            >
              <NotificationIcon
                type={getNotificationType(notification.type)}
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-['Montserrat'] text-[14px] font-semibold text-[#0F172A]">
                  {notification.title}
                </h3>

                <p className="mt-1 max-w-[520px] font-['Montserrat'] text-[13px] leading-[140%] text-[#64748B]">
                  {notification.message}
                </p>
              </div>

              <div className="flex h-full shrink-0 flex-col items-end justify-between gap-3">
                <span className="font-['Montserrat'] text-[12px] text-[#64748B]">
                  {formatTime(notification.createdAt)}
                </span>

                {!notification.isRead && (
                  <span
                    aria-label="Unread"
                    className="h-[8px] w-[8px] rounded-full bg-[#3B82F6]"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mt-[281px] flex h-[48px] w-[90px] items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-semibold text-white"
      >
        Back
      </button>
    </section>
  );
}

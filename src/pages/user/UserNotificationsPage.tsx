
import { AnimatePresence, motion } from "framer-motion";
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

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const notificationVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: { duration: 0.2 },
  },
};

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
      <motion.div
        whileHover={{ scale: 1.12, rotate: -8 }}
        transition={{ duration: 0.25 }}
        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]"
      >
        <FiCheckCircle size={23} />
      </motion.div>
    );
  }

  if (type === "profile") {
    return (
      <motion.div
        whileHover={{ scale: 1.12, rotate: 8 }}
        transition={{ duration: 0.25 }}
        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#EF4444]"
      >
        <FiUser size={22} />
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -3 }}
      transition={{ duration: 0.25 }}
      className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]"
    >
      <FiMessageSquare size={22} />
    </motion.div>
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
      navigate(
        normalizedLink.replace(/^\/jobs\//, "/dashboard/jobs/"),
      );
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

      {/* Page heading */}
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mb-[35px] flex items-center gap-3"
      >
        <motion.button
          type="button"
          onClick={() => navigate("/dashboard")}
          aria-label="Back to dashboard"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="flex h-8 w-8 items-center justify-center text-[#0F172A] transition-colors hover:text-[#23658B]"
        >
          <FiArrowLeft size={20} />
        </motion.button>

        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Notifications
        </h1>

        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key="unread-count"
              initial={{ opacity: 0, scale: 0.7, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#2563EB]"
            >
              {unreadCount} unread
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Loading, error, empty and notification states */}
      <AnimatePresence mode="wait">

        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-[180px] items-center justify-center rounded-[16px] bg-white text-sm text-[#64748B]"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              Loading notifications...
            </motion.span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-[16px] bg-white px-5 py-8 text-center"
          >
            <p className="text-sm text-red-600">{error}</p>

            <motion.button
              type="button"
              onClick={() => void fetchNotifications()}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="mt-4 rounded-lg bg-[#0D2E43] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#185779]"
            >
              Try again
            </motion.button>
          </motion.div>
        ) : notifications.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex h-[180px] items-center justify-center rounded-[16px] bg-white text-sm text-[#94A3B8]"
          >
            No notifications available.
          </motion.div>
        ) : (
          <motion.div
            key="notifications"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="w-full space-y-[12px]"
          >
            <AnimatePresence mode="popLayout">
              {notifications.map((notification) => (
                <motion.button
                  key={notification._id}
                  layout
                  variants={notificationVariants}
                  exit="exit"
                  type="button"
                  onClick={() =>
                    void handleNotificationClick(notification)
                  }
                  disabled={markingReadId !== null}
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0px 9px 22px rgba(13, 46, 67, 0.10)",
                    borderColor: "#CBDDE5",
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex min-h-[82px] w-full items-center gap-4 rounded-[16px] border border-b border-[#F1F5F9] px-4 py-[10px] pb-4 text-left shadow-[0px_4px_12px_0px_#0000000F] transition-colors duration-300 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#185779] ${
                    notification.isRead
                      ? "bg-white"
                      : "bg-[#F8FBFF]"
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

                    <AnimatePresence>
                      {!notification.isRead && (
                        <motion.span
                          key="unread-dot"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          aria-label="Unread"
                          className="h-[8px] w-[8px] rounded-full bg-[#3B82F6]"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <motion.button
        type="button"
        onClick={() => navigate(-1)}
        whileHover={{
          y: -3,
          boxShadow: "0px 7px 16px rgba(13, 46, 67, 0.16)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="mt-[281px] flex h-[48px] w-[90px] items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-semibold text-white transition-colors hover:bg-[#185779]"
      >
        Back
      </motion.button>
    </section>
  );
}

import {
  FiArrowLeft,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type NotificationType = "bid" | "completed" | "profile";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationIconProps {
  type: NotificationType;
}

function NotificationIcon({ type }: NotificationIconProps) {
  if (type === "completed") {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] sm:h-12 sm:w-12">
        <FiCheckCircle size={22} />
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#EF4444] sm:h-12 sm:w-12">
        <FiUser size={21} />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] sm:h-12 sm:w-12">
      <FiMessageSquare size={21} />
    </div>
  );
}

export default function UserNotificationsPage() {
  const navigate = useNavigate();

  const notifications: NotificationItem[] = [
    {
      id: "1",
      type: "bid",
      title: "New bid received",
      message: "You received a new bid for your Fix kitchen sink job.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: "2",
      type: "completed",
      title: "Job completed",
      message: "Your AC repair job has been marked as completed.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: "3",
      type: "bid",
      title: "New bid received",
      message:
        "A professional has submitted a bid for your Plumbing job.",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: "4",
      type: "profile",
      title: "Complete your profile",
      message:
        "Add more information to your profile to help professionals know you better.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "5",
      type: "completed",
      title: "Payment confirmed",
      message:
        "Your payment for the completed job has been confirmed.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "6",
      type: "bid",
      title: "New bid received",
      message:
        "You received a new bid for your Home cleaning job.",
      time: "2 days ago",
      unread: false,
    },
  ];

  return (
    <section className="w-full pb-12 pt-5 sm:pt-7">
      {/* Header */}
      <div className="mb-7 flex items-center gap-3 sm:mb-9">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#0F172A] transition hover:bg-white"
          aria-label="Go back to dashboard"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[22px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
          Notifications
        </h1>
      </div>

      {/* Notifications */}
      {notifications.length > 0 ? (
        <div className="w-full space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex w-full items-start gap-3 rounded-[16px] border-b border-[#F1F5F9] bg-white px-4 py-4 shadow-[0px_4px_12px_0px_#0000000F] sm:min-h-[82px] sm:items-center sm:gap-4 sm:px-5 sm:py-3"
            >
              <NotificationIcon type={notification.type} />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3 sm:hidden">
                  <h3 className="font-['Montserrat'] text-[14px] font-semibold leading-5 text-[#0F172A]">
                    {notification.title}
                  </h3>

                  {notification.unread && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#3B82F6]" />
                  )}
                </div>

                <h3 className="hidden font-['Montserrat'] text-[14px] font-semibold text-[#0F172A] sm:block">
                  {notification.title}
                </h3>

                <p className="mt-1 max-w-[620px] font-['Montserrat'] text-[12px] leading-[140%] text-[#64748B] sm:text-[13px]">
                  {notification.message}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3 sm:h-full sm:justify-between">
                <span className="whitespace-nowrap font-['Montserrat'] text-[11px] text-[#64748B] sm:text-[12px]">
                  {notification.time}
                </span>

                {notification.unread && (
                  <span className="hidden h-2 w-2 rounded-full bg-[#3B82F6] sm:block" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[180px] w-full items-center justify-center rounded-[16px] bg-white px-4 text-center text-sm text-[#94A3B8]">
          No notifications available.
        </div>
      )}

      {/* Back */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-[48px] w-[90px] items-center justify-center rounded-[8px] border border-[#0D2E431F] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-semibold text-white transition hover:bg-[#164D6F]"
        >
          Back
        </button>
      </div>
    </section>
  );
}
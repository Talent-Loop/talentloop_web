import {
  FiArrowLeft,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type NotificationType =
  | "bid"
  | "completed"
  | "profile";

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

function NotificationIcon({
  type,
}: NotificationIconProps) {
  if (type === "completed") {
    return (
      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
        <FiCheckCircle size={23} />
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#FEE2E2] text-[#EF4444]">
        <FiUser size={22} />
      </div>
    );
  }

  return (
    <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
      <FiMessageSquare size={22} />
    </div>
  );
}

export default function UserNotificationsPage() {
  const navigate = useNavigate();

  /*
   * Replace this with the response from the real
   * notifications endpoint once the service method
   * is connected.
   *
   * Do not keep this as frontend mock data in production.
   */
  const notifications: NotificationItem[] = [];

  return (
    <section className="px-0 pb-12 pt-[22px]">
      <div className="mb-[35px] flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex h-8 w-8 items-center justify-center text-[#0F172A]"
        >
          <FiArrowLeft size={20} />
        </button>

        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Notifications
        </h1>
      </div>

      <div className="w-full space-y-[12px]">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex min-h-[82px] w-full items-center gap-4 rounded-[16px] border-b border-[#F1F5F9] bg-white px-4 py-[10px] pb-4 shadow-[0px_4px_12px_0px_#0000000F]"
          >
            <NotificationIcon type={notification.type} />

            <div className="min-w-0 flex-1">
              <h3 className="font-['Montserrat'] text-[14px] font-semibold text-[#0F172A]">
                {notification.title}
              </h3>

              <p className="mt-1 max-w-[520px] font-['Montserrat'] text-[13px] leading-[140%] text-[#64748B]">
                {notification.message}
              </p>
            </div>

            <div className="flex h-full flex-col items-end justify-between">
              <span className="font-['Montserrat'] text-[12px] text-[#64748B]">
                {notification.time}
              </span>

              {notification.unread && (
                <span className="h-[8px] w-[8px] rounded-full bg-[#3B82F6]" />
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="flex h-[180px] items-center justify-center rounded-[16px] bg-white text-sm text-[#94A3B8]">
          No notifications available.
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
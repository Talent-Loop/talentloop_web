import { useState } from "react";
import {
  Bell,
  CheckCheck,
  BriefcaseBusiness,
  MessageCircle,
  WalletCards,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

type Notification = {
  id: number;
  type: "job" | "message" | "commission";
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "job",
      title: "New job assigned",
      description:
        "You have been assigned a new plumbing job in Lekki Phase 1.",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      title: "New message",
      description:
        "Ayo Adebayo sent you a message about the kitchen sink repair.",
      time: "15 minutes ago",
      unread: true,
    },
    {
      id: 3,
      type: "job",
      title: "Job completed",
      description:
        "Your job for Fix Leaking Pipe has been marked as completed.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 4,
      type: "commission",
      title: "Commission reminder",
      description:
        "You have ₦1,450.00 in outstanding commission to pay.",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 5,
      type: "message",
      title: "New message",
      description:
        "Chinelo Okoro replied to your conversation.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 6,
      type: "job",
      title: "Job request accepted",
      description:
        "Your bid for Kitchen Sink Repair has been accepted.",
      time: "Yesterday",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
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
                {notifications.map((notification) => (
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
                ))}
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
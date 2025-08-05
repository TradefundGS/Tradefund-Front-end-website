import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNotification, useReadNotification } from "@/reactQuery/mutation/home";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReadNotificationsPopover = ({ notifications }) => {
  const { data: notificationData, isLoading, isError } = useReadNotification();

  // Sort notifications by date in descending order (most recent at the top)
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 bg-gray-100 rounded-t-xl">
        <h3 className="text-sm font-medium leading-none">User Notifications</h3>
      </div>

      {/* Scrollable Notifications Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-80 p-4">
          <ul role="list" className="divide-y divide-gray-200">
            {sortedNotifications.length > 0 ? (
              sortedNotifications.map((notification) => (
                <li key={notification.id} className="py-2">
                  <Link
                    href={`/project/${notification.project_id}`}
                    className={`group flex items-start justify-start px-2 py-2 rounded-lg ${
                      notification.status === "Unread"
                        ? "bg-white font-bold"
                        : "bg-white"
                    } hover:bg-gray-50`}
                  >
                    <div
                      className="w-full max-w-xs text-gray-900"
                      role="alert"
                    >
                      <div className="flex items-start justify-start text-left gap-5">
                        <div className="text-sm font-normal">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {notification.type || "Notification"}
                          </div>
                          <div className="text-sm font-normal mb-2">
                            {notification.message || "New activity on your project"}
                          </div>
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">No notifications</p>
            )}
          </ul>
        </ScrollArea>
      </div>
    </>
  );
};

export default ReadNotificationsPopover;

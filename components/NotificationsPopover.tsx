import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
	useNotification,
	useReadNotification,
} from "@/reactQuery/mutation/home";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReadNotificationsPopover from "@/components/NotificationPanel";

const NotificationsPopover = () => {
	const { data: notificationData, isLoading, isError, refetch } = useNotification();
	const notifications = notificationData?.success?.notifications || [];
	const unreadCount = notifications.filter(
		(notification) => notification.status === "Unread"
	).length;

	const handleClick = () => {
		refetch();
	  };


	return (
		<Popover className="relative">
			<PopoverButton className="relative inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"  onClick={handleClick}>
				<span className="sr-only">Notification</span>
				<BellIcon
					aria-hidden="true"
					className="h-6 w-6"
				/>
				<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600"></span>
					{unreadCount > 0 && (
						<span className="relative inline-flex text-xs bg-red-500 text-white rounded-full py-0.5 px-1.5">
							{/* {unreadCount > 9 ? "9+" : unreadCount} */}
							{unreadCount}
						</span>
					)}
				</span>
			</PopoverButton>

			<PopoverPanel
				transition
				className="absolute right-0 z-10 mt-2 w-80 flex flex-col shadow-lg rounded-xl ring-1 ring-gray-900/5 bg-white"
			>
				<ReadNotificationsPopover notifications={notifications} />
			</PopoverPanel>
		</Popover>
	);
};

export default NotificationsPopover;

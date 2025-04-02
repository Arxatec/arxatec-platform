import {
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import type {
  NotificationGroup,
  NotificationItem,
  NotificationType,
} from "../../../types";
import { CustomAvatar } from "~/components/atoms";

interface Props {
  groups: NotificationGroup[];
  onNotificationClick?: (notification: NotificationItem) => void;
  className?: string;
}

const NotificationIcon: React.FC<{
  type: NotificationType;
  avatar?: string;
}> = ({ type, avatar }) => {
  const iconClasses = "size-8 rounded-full flex items-center justify-center";

  switch (type) {
    case "document":
      return (
        <div className={`${iconClasses} bg-sky-100`}>
          <DocumentTextIcon className="size-4 text-sky-500" />
        </div>
      );
    case "user":
      return (
        <CustomAvatar
          avatar={avatar || "/placeholder.svg"}
          username={avatar}
          size="2rem"
        />
      );
    case "meeting":
      return (
        <div className={`${iconClasses} bg-cyan-100`}>
          <CalendarIcon className="size-4 text-cyan-500" />
        </div>
      );
    case "timeoff":
      return (
        <div className={`${iconClasses} bg-indigo-100`}>
          <ClockIcon className="size-4 text-indigo-600" />
        </div>
      );
    case "performance":
      return (
        <div className={`${iconClasses} bg-green-100`}>
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
        </div>
      );
    default:
      return (
        <div className={`${iconClasses} bg-gray-100`}>
          <DocumentTextIcon className="h-5 w-5 text-gray-600" />
        </div>
      );
  }
};

export const NotificationFeed: React.FC<Props> = ({
  groups,
  onNotificationClick,
  className = "",
}) => {
  return (
    <div className={`notification-feed ${className}`}>
      {groups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="notification-group mb-4 overflow-auto "
        >
          <h2 className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-widest px-6">
            {group.title}
          </h2>
          <div>
            {group.items.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 py-3 px-6 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                onClick={() => onNotificationClick?.(notification)}
              >
                <NotificationIcon
                  type={notification.type}
                  avatar={notification.avatar}
                />

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">
                    {notification.title}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {notification.description}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {notification.timeAgo}
                  </span>
                  {notification.isNew && (
                    <span className="h-2 w-2 bg-rose-400 rounded-full mt-1"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

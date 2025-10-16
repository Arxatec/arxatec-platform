import { formatDate } from "date-fns";
import type React from "react";

interface Props {
  isConsecutiveMessage: boolean;
  sent_name: string;
  created_at: Date;
  content: string;
}

export const Message: React.FC<Props> = ({
  isConsecutiveMessage,
  sent_name,
  created_at,
  content,
}) => {
  return (
    <div
      className={`flex space-x-3 items-start ${
        isConsecutiveMessage ? "mt-1" : "mt-4"
      }`}
    >
      <div className="flex-col flex-1">
        {!isConsecutiveMessage && (
          <div className="flex items-center justify-start gap-2 mb-1">
            <h1 className="text-sm font-medium text-primary">{sent_name}</h1>
            <p className="text-xs text-muted-foreground">
              {formatDate(created_at, "HH:mm")}
            </p>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className=" rounded relative group">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {content}
            </p>
            {isConsecutiveMessage && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                  {formatDate(created_at, "HH:mm")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

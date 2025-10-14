import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Message, SendMessage } from "..";
import { getHistoryMessages } from "../../services";
import { useEffect, useRef } from "react";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { socket } from "@/services/socket";
import { useUserStore } from "@/store";
import type { Message as MessageType } from "@/types";
import { Card, CardContent, Skeleton, StatusMessage } from "@/components/ui";

interface Props {
  id: string;
}

export const Messages: React.FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data, isPending, isError } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getHistoryMessages(id),
    enabled: !!id,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!user?.id || !id) return;

    const joinCaseChannel = () => {
      socket.emit("join_case_channel", id);
    };

    const joinUserChannel = () => {
      socket.emit("join_user_channel", user.id);
    };

    if (socket.connected) {
      joinCaseChannel();
      joinUserChannel();
    }

    socket.on("connect", () => {
      joinCaseChannel();
      joinUserChannel();
    });

    socket.on("CASE_NEW_MESSAGE", (message) => {
      queryClient.setQueryData<{ [key: string]: MessageType[] }>(
        ["messages"],
        (oldData) => {
          if (!oldData) return oldData;

          const dateKey = formatDate(message.created_at, "yyyy-MM-dd");
          const updatedData = { ...oldData };

          if (updatedData[dateKey]) {
            const messageExists = updatedData[dateKey].some(
              (existingMessage) => existingMessage.id === message.id
            );

            if (!messageExists) {
              updatedData[dateKey] = [...updatedData[dateKey], message];
            }
          } else {
            updatedData[dateKey] = [message];
          }

          return updatedData;
        }
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("joined_channel");
      socket.off("joined_case_channel");
      socket.off("CASE_NEW_MESSAGE");
    };
  }, [queryClient, user?.id, id]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      scrollToBottom();
    }
  }, [data]);

  if (isPending) {
    return <Skeleton className="w-full h-[500px]" />;
  }

  if (isError) {
    return (
      <StatusMessage
        title="Error al cargar los mensajes"
        description="Error al cargar los mensajes, intenta nuevamente, si el problema persiste, contacta al soporte."
        color="rose"
      />
    );
  }

  return (
    <Card>
      <CardContent>
        <div className="my-4 space-y-4">
          {Object.entries(data || {}).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="flex items-center gap-4 py-8">
                <span className="w-full h-[1px] bg-muted-foreground/10 flex-1"></span>
                <p className="text-sm text-muted-foreground text-center">
                  {formatDate(date, "dd 'de' MMMM 'del' yyyy", {
                    locale: es,
                  })}
                </p>
                <span className="w-full h-[1px] bg-muted-foreground/10 flex-1"></span>
              </div>

              <div className="mb-4">
                {dateMessages.map((message, index) => {
                  const previousMessage =
                    index > 0 ? dateMessages[index - 1] : null;
                  const isConsecutiveMessage =
                    previousMessage &&
                    previousMessage.sent_by === message.sent_by;

                  return (
                    <Message
                      key={message.id}
                      isConsecutiveMessage={isConsecutiveMessage || false}
                      sent_name={message.sent_name}
                      created_at={message.created_at}
                      content={message.content}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {Object.keys(data || {}).length === 0 && (
          <div className="w-full">
            <StatusMessage
              title="No hay mensajes"
              description="No hay mensajes, podrías agregar uno en el botón que se encuentra en la parte superior derecha."
              color="white"
            />
          </div>
        )}
        <SendMessage id={id} />
      </CardContent>
    </Card>
  );
};

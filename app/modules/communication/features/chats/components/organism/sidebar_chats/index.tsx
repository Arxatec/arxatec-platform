import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { User } from "../../../types";
import { CustomAvatar, CustomInput } from "~/components/atoms";
import Scrollbars from "react-custom-scrollbars-2";

interface SidebarProps {
  users: User[];
  selectedChat: User | null;
  onSelectChat: (user: User) => void;
  messages: any;
}

export const SidebarChats = ({
  users,
  selectedChat,
  onSelectChat,
  messages,
}: SidebarProps) => {
  console.log(messages);
  return (
    <div className="w-80 shadow-sm hover:shadow-md transition-all  bg-white rounded-lg mr-2 overflow-hidden">
      <Scrollbars autoHide>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Mensajes</h1>
          <CustomInput
            type="text"
            placeholder="Buscar..."
            startAdornment={
              <MagnifyingGlassIcon className="size-4 text-gray-500" />
            }
          />
        </div>

        <div className="px-2 overflow-auto h-full">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectChat(user)}
              className={`w-full p-3 grid grid-cols-[auto_1fr] items-center space-x-3 rounded-lg transition-all  ${
                selectedChat?.id === user.id
                  ? "bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <CustomAvatar
                avatar={user.avatar || "/placeholder.svg"}
                username={user.name}
                size="3rem"
              />
              <div className="text-left flex flex-col w-full overflow-hidden pr-8">
                <div className="font-semibold text-sm truncate">
                  {user.name}
                </div>

                {user.isGroup ? (
                  <p className="text-gray-600 text-xs">{`${user.members} members, ${user.online} online`}</p>
                ) : (
                  <>
                    <p className="text-gray-600 w-full text-xs truncate">
                      {messages.find((chat: any) => chat.userId === user?.id)
                        ?.messages[
                        messages.find((chat: any) => chat.userId === user?.id)
                          ?.messages.length - 1
                      ].content || ""}
                    </p>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

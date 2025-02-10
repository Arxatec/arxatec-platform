import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { User } from "../../../types";
import { CustomInput } from "~/components/atoms";

interface SidebarProps {
  users: User[];
  selectedChat: User | null;
  onSelectChat: (user: User) => void;
}

export const SidebarChats = ({
  users,
  selectedChat,
  onSelectChat,
}: SidebarProps) => {
  return (
    <div className="w-80 shadow-sm  bg-white rounded-lg mr-2 overflow-hidden">
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
            className={`w-full p-3 flex items-center space-x-3 rounded-lg transition-all ${
              selectedChat?.id === user.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">{user.name}</div>
              <div className="text-xs text-gray-600">
                {user.isGroup
                  ? `${user.members} members, ${user.online} online`
                  : "Typing..."}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

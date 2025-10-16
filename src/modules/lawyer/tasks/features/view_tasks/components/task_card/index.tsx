import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit2Icon, GripVertical, SquarePen, X } from "lucide-react";
import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  onDeleteTask?: (taskId: string) => void;
}

export function TaskCard({
  task,
  isOverlay = false,
  onDeleteTask,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group bg-accent rounded p-2 shadow-sm hover:shadow-md transition-shadow ${
        isOverlay ? "rotate-5 cursor-grabbing" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-0.5 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <p className="flex-1 text-sm">{task.content}</p>
      </div>

      {onDeleteTask && !isOverlay && (
        <button
          onClick={() => onDeleteTask(task.id)}
          className="absolute top-0 bottom-0 my-auto h-fit right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card text-white rounded p-1"
        >
          <SquarePen className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

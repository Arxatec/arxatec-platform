import { useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Input } from "@/components/ui";
import { EllipsisVertical, Plus } from "lucide-react";
import { TaskCard } from "../task_card";
import type { Column } from "../types";

interface ColumnProps {
  column: Column;
  onDeleteColumn: (columnId: string) => void;
  onAddTask: (columnId: string, content: string) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onUpdateTitle?: (columnId: string, title: string) => void;
}

export function ColumnComponent({
  column,
  onDeleteColumn,
  onAddTask,
  onDeleteTask,
  onUpdateTitle,
}: ColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      onAddTask(column.id, newTaskContent.trim());
      setNewTaskContent("");
      setIsAddingTask(false);
    }
  };

  const handleUpdateTitle = () => {
    if (editedTitle.trim() && editedTitle !== column.title) {
      onUpdateTitle?.(column.id, editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-card rounded overflow-hidden min-w-[320px] h-fit max-w-[320px] flex flex-col ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <button
        className="bg-accent h-[16px] cursor-grab"
        {...attributes}
        {...listeners}
      ></button>

      <div className="px-3 pb-3 h-full flex flex-col mt-1">
        {/* Header de la columna */}
        <div className="flex items-center gap-2 mb-2">
          {isEditingTitle ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleUpdateTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdateTitle();
                if (e.key === "Escape") setIsEditingTitle(false);
              }}
              className="h-7 text-sm font-semibold"
              autoFocus
            />
          ) : (
            <h3
              className="flex-1 font-bold font-serif text-base cursor-pointer"
              onClick={() => setIsEditingTitle(true)}
            >
              {column.title}
            </h3>
          )}

          <Button variant="ghost">
            <EllipsisVertical />
          </Button>
        </div>

        {/* Lista de tareas */}
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex-1 flex flex-col gap-2">
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDeleteTask={(taskId) => onDeleteTask(column.id, taskId)}
              />
            ))}
          </div>
        </SortableContext>

        {/* Agregar nueva tarea */}
        <div className="mt-8">
          {isAddingTask ? (
            <div className="space-y-2">
              <Input
                placeholder="Escribe el contenido de la tarea..."
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTask();
                  if (e.key === "Escape") setIsAddingTask(false);
                }}
                autoFocus
                className="h-8 text-sm"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddTask}>
                  Agregar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskContent("");
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="default"
              className="w-full"
              onClick={() => setIsAddingTask(true)}
            >
              <Plus className="w-4 h-4" />
              Agregar tarea
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CustomHeader, ScrollArea, ScrollBar } from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { ROUTES } from "@/routes/routes";
import {
  TaskCard,
  ColumnComponent,
  AddColumn,
  type Task,
  type Column,
} from "../components";
import { useTitle } from "@/hooks";

// Componente Principal
export default function ViewTasksPage() {
  const { changeTitle } = useTitle();
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "col-1",
      title: "Por hacer",
      tasks: [
        {
          id: "task-1",
          content: "Revisar documentos del caso #123",
          columnId: "col-1",
        },
        {
          id: "task-2",
          content: "Preparar audiencia del lunes",
          columnId: "col-1",
        },
      ],
    },
    {
      id: "col-2",
      title: "En progreso",
      tasks: [
        {
          id: "task-3",
          content: "Redactar demanda de divorcio",
          columnId: "col-2",
        },
      ],
    },
    {
      id: "col-3",
      title: "Completado",
      tasks: [
        {
          id: "task-4",
          content: "Reunión con cliente García",
          columnId: "col-3",
        },
      ],
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Manejar inicio de drag
  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  // Manejar drag sobre columna
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";

    if (!isActiveATask) return;

    // Mover tarea a otra columna
    if (isActiveATask && isOverATask) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex((col) =>
          col.tasks.some((t) => t.id === activeId)
        );
        const overIndex = columns.findIndex((col) =>
          col.tasks.some((t) => t.id === overId)
        );

        if (activeIndex === -1 || overIndex === -1) return columns;

        const activeColumn = columns[activeIndex];
        const overColumn = columns[overIndex];

        const activeTaskIndex = activeColumn.tasks.findIndex(
          (t) => t.id === activeId
        );
        const overTaskIndex = overColumn.tasks.findIndex(
          (t) => t.id === overId
        );

        if (activeIndex === overIndex) {
          // Misma columna
          const newTasks = arrayMove(
            activeColumn.tasks,
            activeTaskIndex,
            overTaskIndex
          );
          const newColumns = [...columns];
          newColumns[activeIndex] = { ...activeColumn, tasks: newTasks };
          return newColumns;
        } else {
          // Diferente columna
          const newActiveColumnTasks = activeColumn.tasks.filter(
            (t) => t.id !== activeId
          );
          const [movedTask] = activeColumn.tasks.filter(
            (t) => t.id === activeId
          );
          const updatedTask = { ...movedTask, columnId: overColumn.id };

          const newOverColumnTasks = [...overColumn.tasks];
          newOverColumnTasks.splice(overTaskIndex, 0, updatedTask);

          const newColumns = [...columns];
          newColumns[activeIndex] = {
            ...activeColumn,
            tasks: newActiveColumnTasks,
          };
          newColumns[overIndex] = {
            ...overColumn,
            tasks: newOverColumnTasks,
          };
          return newColumns;
        }
      });
    }
  };

  // Manejar fin de drag
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
  };

  // Agregar nueva columna
  const handleAddColumn = (title: string) => {
    const newColumn: Column = {
      id: `col-${Date.now()}`,
      title,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  // Eliminar columna
  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  // Agregar tarea
  const handleAddTask = (columnId: string, content: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      content,
      columnId,
    };

    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, tasks: [...col.tasks, newTask] };
        }
        return col;
      })
    );
  };

  // Eliminar tarea
  const handleDeleteTask = (columnId: string, taskId: string) => {
    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskId),
          };
        }
        return col;
      })
    );
  };

  // Actualizar título de columna
  const handleUpdateColumnTitle = (columnId: string, title: string) => {
    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, title };
        }
        return col;
      })
    );
  };

  useEffect(() => {
    changeTitle("Mis tareas - Arxatec");
  }, []);

  useEffect(() => {
    const sidebarInset = document.getElementById("sidebar-inset");
    if (sidebarInset) {
      sidebarInset.style.overflowX = "hidden";
    }
    return () => {
      if (sidebarInset) {
        sidebarInset.removeAttribute("style");
      }
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="px-8 mt-8">
        <CustomHeader
          title="Gestión de tareas"
          description="Organiza tus tareas arrastrándolas entre columnas, puedes agregar nuevas columnas y tareas. Estas tareas pueden ser relacionadas a un caso específico."
          button={{
            label: "Agregar tarea",
            url: ROUTES.Lawyer.CreateCase,
            icon: PlusIcon,
          }}
        />
      </div>

      <div>
        <ScrollArea>
          <ScrollBar orientation="horizontal" />
          {/* Board */}
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div
              className="flex gap-4 px-8"
              style={{ height: `calc(100vh - 7.5rem)` }}
            >
              <SortableContext
                items={columns.map((col) => col.id)}
                strategy={horizontalListSortingStrategy}
              >
                {columns.map((column) => (
                  <ColumnComponent
                    key={column.id}
                    column={column}
                    onDeleteColumn={handleDeleteColumn}
                    onAddTask={handleAddTask}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTitle={handleUpdateColumnTitle}
                  />
                ))}
              </SortableContext>

              {/* Agregar nueva columna */}
              <AddColumn onAddColumn={handleAddColumn} />
            </div>

            {/* Overlay para drag */}
            <DragOverlay>
              {activeTask && <TaskCard task={activeTask} isOverlay />}
            </DragOverlay>
          </DndContext>
        </ScrollArea>
      </div>
    </div>
  );
}

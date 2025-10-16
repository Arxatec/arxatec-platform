import { useState } from "react";
import { Button, Card, Input } from "@/components/ui";
import { Plus } from "lucide-react";

interface AddColumnProps {
  onAddColumn: (title: string) => void;
}

export function AddColumn({ onAddColumn }: AddColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      onAddColumn(title.trim());
      setTitle("");
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div className="min-w-[320px] h-fit">
        <Card className="p-4">
          <Input
            placeholder="Nombre de la columna..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") {
                setIsAdding(false);
                setTitle("");
              }
            }}
            autoFocus
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}>
              Agregar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setTitle("");
              }}
            >
              Cancelar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-w-[320px]">
      <Button
        variant="ghost"
        className="w-full h-fit bg-accent"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="w-5 h-5 mr-2" />
        Agregar columna
      </Button>
    </div>
  );
}

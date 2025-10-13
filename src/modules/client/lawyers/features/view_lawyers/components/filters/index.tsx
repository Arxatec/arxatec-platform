import { Button, ButtonGroup, Input, Label } from "@/components/ui";
import { Grid, List } from "lucide-react";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  setView: (view: "grid" | "list") => void;
  view: "grid" | "list";
}

export const Filters: React.FC<Props> = ({
  search,
  setSearch,
  setView,
  view,
}) => {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-full">
        <Label className="mb-2 block">Buscar abogado</Label>
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ButtonGroup>
        <Button
          variant={view === "grid" ? "default" : "outline"}
          onClick={() => setView("grid")}
        >
          <Grid />
        </Button>
        <Button
          variant={view === "list" ? "default" : "outline"}
          onClick={() => setView("list")}
        >
          <List />
        </Button>
      </ButtonGroup>
    </div>
  );
};

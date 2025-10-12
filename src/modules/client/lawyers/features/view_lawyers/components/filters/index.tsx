import { Input, Label } from "@/components/ui";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

export const Filters: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-full">
        <Label className="mb-2 block">Buscar abogado</Label>
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

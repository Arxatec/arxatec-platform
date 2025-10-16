import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  CaseCategory,
  CaseStatus,
  CaseStatusLabel,
  CaseUrgency,
  CaseUrgencyLabel,
} from "@/types";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  category: string | undefined;
  setCategory: (category: string | undefined) => void;
  status: string | undefined;
  setStatus: (status: string | undefined) => void;
  urgency: string | undefined;
  setUrgency: (urgency: string | undefined) => void;
}

export const Filters: React.FC<Props> = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  urgency,
  setUrgency,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <div className="grid gap-2 w-full">
        <Label htmlFor="search">Buscar caso</Label>
        <Input
          placeholder="Buscar..."
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid gap-2 w-[200px]">
        <Label htmlFor="category">Categoría</Label>
        <Select
          value={category === undefined ? "all" : category}
          onValueChange={(value) =>
            setCategory(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent className="w-[200px]">
            {Object.values(CaseCategory).map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
            <SelectItem value="all">Todas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 w-[200px]">
        <Label htmlFor="status">Estado</Label>
        <Select
          value={status === undefined ? "all" : status}
          onValueChange={(val) => setStatus(val === "all" ? undefined : val)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent className="w-[200px]">
            {Object.values(CaseStatus).map((statusProp) => (
              <SelectItem key={statusProp} value={statusProp}>
                {CaseStatusLabel[statusProp]}
              </SelectItem>
            ))}
            <SelectItem value="all">Todas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 w-[200px]">
        <Label htmlFor="urgency">Urgencia</Label>
        <Select
          value={urgency === undefined ? "all" : urgency}
          onValueChange={(val) => setUrgency(val === "all" ? undefined : val)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar urgencia" />
          </SelectTrigger>
          <SelectContent className="w-[200px]">
            {Object.values(CaseUrgency).map((urgencyProp) => (
              <SelectItem key={urgencyProp} value={urgencyProp}>
                {CaseUrgencyLabel[urgencyProp]}
              </SelectItem>
            ))}
            <SelectItem value="all">Todas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

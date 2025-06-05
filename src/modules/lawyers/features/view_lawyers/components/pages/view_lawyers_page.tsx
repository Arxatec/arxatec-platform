import { useEffect, useState, useMemo } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import { getLawyers } from "../../services";
import { LawyersFilters } from "../molecules";
import { LawyersGrid } from "../organisms";
import type { Lawyer } from "../../types";

export default function ViewLawyersPage() {
  const { changeTitle } = useTitle();
  const token = window.sessionStorage.getItem("TOKEN_AUTH");
  const { data: lawyers, isPending } = useQuery<Lawyer[]>({
    queryKey: ["lawyers"],
    queryFn: () => getLawyers(token),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState({ id: 1, name: "Todos" });
  const [experience, setExperience] = useState({ id: 1, name: "+2 años" });
  const [sortBy, setSortBy] = useState({ id: 1, name: "Más reciente" });

  const filteredLawyers = useMemo(() => {
    if (!lawyers) return [];

    let filtered = [...lawyers];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (lawyer) =>
          `${lawyer.firstName} ${lawyer.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          lawyer.biography.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por especialidad
    if (specialty.id !== 1) {
      filtered = filtered.filter(
        (lawyer) =>
          lawyer.specialty.toLowerCase() === specialty.name.toLowerCase()
      );
    }

    // Filtrar por experiencia
    if (experience.id !== 1) {
      filtered = filtered.filter((lawyer) => {
        const yearsExp = lawyer.experience;
        const requiredYears = parseInt(experience.name);
        return yearsExp >= requiredYears;
      });
    }

    // Ordenar
    switch (sortBy.id) {
      case 1: // Nuevos
        filtered.sort((a, b) => b.userId - a.userId);
        break;
      case 2: // Populares
        filtered.sort(
          (a, b) => b.workSchedules.length - a.workSchedules.length
        );
        break;
      case 3: // Expertos
        filtered.sort((a, b) => b.experience - a.experience);
        break;
      default:
        break;
    }

    return filtered;
  }, [lawyers, searchTerm, specialty, experience, sortBy]);

  useEffect(() => {
    changeTitle("Abogados - Arxatec");
  }, [changeTitle]);

  useEffect(() => {
    console.log(lawyers);
  }, [lawyers]);

  return (
    <div className="mx-auto max-w-7xl w-full min-h-screen">
      <LawyersFilters
        onSearch={setSearchTerm}
        onSpecialtyChange={setSpecialty}
        onExperienceChange={setExperience}
        onSortChange={setSortBy}
      />
      <LawyersGrid isLoading={isPending} lawyers={filteredLawyers} />
    </div>
  );
}

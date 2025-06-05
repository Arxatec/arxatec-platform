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
          lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lawyer.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        const yearsExp = parseInt(lawyer.experience);
        const requiredYears = parseInt(experience.name);
        return yearsExp >= requiredYears;
      });
    }

    // Ordenar
    switch (sortBy.id) {
      case 1: // Nuevos
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 2: // Populares
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 3: // Expertos
        filtered.sort((a, b) => {
          const yearsA = parseInt(a.experience);
          const yearsB = parseInt(b.experience);
          return yearsB - yearsA;
        });
        break;
      case 4: // Casos ganados
        filtered.sort((a, b) => b.casesResolved - a.casesResolved);
        break;
      default:
        break;
    }

    return filtered;
  }, [lawyers, searchTerm, specialty, experience, sortBy]);

  useEffect(() => {
    changeTitle("Abogados - Arxatec");
  }, [changeTitle]);

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

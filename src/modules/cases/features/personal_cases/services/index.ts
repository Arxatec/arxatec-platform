import type { Case } from "../../../store/cases.store";

export const getPersonalCasesFromStorage = (): Case[] => {
  try {
    const casesData = localStorage.getItem("cases-storage");
    if (!casesData) return [];

    const parsedData = JSON.parse(casesData);
    return parsedData.state.cases || [];
  } catch (error) {
    console.error("Error al obtener casos del localStorage:", error);
    return [];
  }
};


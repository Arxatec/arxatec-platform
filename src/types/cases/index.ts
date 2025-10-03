export const CaseStatus = {
  OPEN: "abierto",
  IN_PENDING: "en_progreso",
  CLOSE: "cerrado",
  ARCHIVED: "archivado",
};

export const CaseCategory = {
  CIVIL: "civil",
  FAMILY: "familiar",
  LABOR: "laboral",
  PENAL: "penal",
};

export const CaseStatusLabel = {
  [CaseStatus.OPEN]: "Abierto",
  [CaseStatus.IN_PENDING]: "En progreso",
  [CaseStatus.CLOSE]: "Cerrado",
  [CaseStatus.ARCHIVED]: "Archivado",
};

export interface Case {
  id: string;
  title: string;
  description: string;
  status: keyof typeof CaseStatus;
  category: keyof typeof CaseCategory;
  is_public: boolean;
  created_at: Date;
}

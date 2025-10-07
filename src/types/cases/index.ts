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

export const CaseUrgency = {
  HIGH: "alta",
  MEDIUM: "media",
  LOW: "baja",
};

export const CaseAttachmentCategory = {
  CONTRACT: "contrato",
  EVIDENCE: "evidencia",
  NOTES: "notas",
  OTHER: "otros",
};

export const CaseCategoryLabel = {
  [CaseCategory.CIVIL]: "Civil",
  [CaseCategory.FAMILY]: "Familiar",
  [CaseCategory.LABOR]: "Laboral",
  [CaseCategory.PENAL]: "Penal",
};

export const CaseUrgencyLabel = {
  [CaseUrgency.HIGH]: "Alta",
  [CaseUrgency.MEDIUM]: "Media",
  [CaseUrgency.LOW]: "Baja",
};

export const CaseStatusLabel = {
  [CaseStatus.OPEN]: "Abierto",
  [CaseStatus.IN_PENDING]: "En progreso",
  [CaseStatus.CLOSE]: "Cerrado",
  [CaseStatus.ARCHIVED]: "Archivado",
};

export const CaseAttachmentCategoryLabel = {
  [CaseAttachmentCategory.CONTRACT]: "Contrato",
  [CaseAttachmentCategory.EVIDENCE]: "Evidencia",
  [CaseAttachmentCategory.NOTES]: "Notas",
  [CaseAttachmentCategory.OTHER]: "Otros",
};

export interface Case {
  id: string;
  title: string;
  description: string;
  status: keyof typeof CaseStatus;
  category: keyof typeof CaseCategory;
  urgency: keyof typeof CaseUrgency;
  is_public: boolean;
  created_at: Date;
  client_id?: string | null;
  external_client_id?: string | null;
}

export interface CaseAttachment {
  id: string;
  label: string;
  description: string | null;
  category: keyof typeof CaseAttachmentCategory;
  uploaded_by: string;
  created_at: Date;
  url: string;
}

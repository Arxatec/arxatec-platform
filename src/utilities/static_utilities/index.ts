export const getCategoryAttachmentName = (categoryId: string): string => {
  const category = {
    1: "Evidencia",
    2: "Documento legal",
    3: "Contrato",
    4: "Identificación",
    5: "Correspondencia",
  };
  return category[categoryId] || "Sin categoría";
};

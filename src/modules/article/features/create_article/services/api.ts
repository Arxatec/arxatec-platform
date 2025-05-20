export const createArticle = async (formData: FormData): Promise<any> => {
  const response = await fetch("http://localhost:3000/api/v1/articles", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message || "Error al crear el artículo");
  }

  return response.json();
};

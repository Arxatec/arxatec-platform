export const ArticleError = ({ error }: { error: boolean }) => {
  return (
    error && (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
        <p className="text-red-600 font-medium">
          Error al cargar los artículos
        </p>
        <p className="text-red-500 text-sm mt-1">
          Por favor, intenta nuevamente más tarde
        </p>
      </div>
    )
  );
};

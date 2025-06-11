interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="bg-white px-4 py-2 w-full rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
      <h2 className="text-base font-bold">{title}</h2>
    </div>
  );
};

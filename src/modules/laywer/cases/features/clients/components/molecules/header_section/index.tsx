import { BackButton, SectionTitle } from "../../atoms";

interface HeaderSectionProps {
  title: string;
  onBack: () => void;
}

export const HeaderSection = ({ title, onBack }: HeaderSectionProps) => {
  return (
    <div className="grid grid-cols-[40px_auto] mb-2 gap-2">
      <BackButton onClick={onBack} />
      <SectionTitle title={title} />
    </div>
  );
};

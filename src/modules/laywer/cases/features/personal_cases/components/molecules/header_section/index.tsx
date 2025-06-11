import {
  BackButton,
  PageTitle,
} from "~/modules/laywer/cases/components/molecules";

interface HeaderSectionProps {
  title: string;
  onBack: () => void;
}

export const HeaderSection = ({ title, onBack }: HeaderSectionProps) => {
  return (
    <div className="grid grid-cols-[40px_auto] mb-2 gap-2">
      <BackButton onClick={onBack} />
      <PageTitle title={title} />
    </div>
  );
};

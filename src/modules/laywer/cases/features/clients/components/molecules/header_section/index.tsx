import { useState } from "react";
import { PrimaryButton } from "~/components/atoms";
import { BackButton, SectionTitle } from "../../atoms";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { CreateClientModal } from "../create_client_modal";

interface HeaderSectionProps {
  title: string;
  onBack: () => void;
}

export const HeaderSection = ({ title, onBack }: HeaderSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-[40px_auto_165px] mb-2 gap-2">
        <BackButton onClick={onBack} />
        <SectionTitle title={title} />
        <PrimaryButton
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlusIcon className="size-5 text-white" />
          Agregar cliente
        </PrimaryButton>
      </div>

      <CreateClientModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
};

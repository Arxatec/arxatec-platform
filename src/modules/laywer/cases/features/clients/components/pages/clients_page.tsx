import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTitle } from "~/hooks/useTitle";
import { CreateClientModal } from "../molecules";
import { ClientsGrid } from "../organism";
import { ROUTES } from "~/routes/routes";
import { CustomHeader } from "~/components/molecules";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { PrimaryButton } from "~/components/atoms";

export default function ClientsPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onBack = () => navigate(ROUTES.Lawyer.Cases);
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis clientes - Arxatec");
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <CustomHeader
        onBack={onBack}
        title="Mis clientes"
        action={
          <PrimaryButton
            className="flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <UserPlusIcon className="size-5 text-white" />
            Agregar cliente
          </PrimaryButton>
        }
      />
      <ClientsGrid />
      <CreateClientModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}

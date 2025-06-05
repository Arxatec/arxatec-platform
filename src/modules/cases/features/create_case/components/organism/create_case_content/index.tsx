import { useState } from "react";
import {
  HeaderSection,
  CaseForm,
  FileUploadSection,
  SelectUser,
} from "../../molecules";

interface User {
  id: number;
  name: string;
  avatar?: string;
}

interface CreateCaseContentProps {
  onBack: () => void;
}

export const CreateCaseContent = ({ onBack }: CreateCaseContentProps) => {
  const [isUserSelectorOpen, setIsUserSelectorOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsUserSelectorOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <SelectUser
        open={isUserSelectorOpen}
        setOpen={setIsUserSelectorOpen}
        onSelect={handleUserSelect}
      />
      <HeaderSection onBack={onBack} />
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <CaseForm
          onOpenUserSelector={() => setIsUserSelectorOpen(true)}
          selectedUser={selectedUser}
        />
        <FileUploadSection />
      </div>
    </div>
  );
};

import { useState } from "react";
import type { User } from "../../../interface";
import type { LegalCategoryModel } from "../../../models";
import {
  HeaderSection,
  CaseForm,
  FileUploadSection,
  SelectUser,
} from "../../molecules";

interface Props {
  categories: LegalCategoryModel[];
}

export const CreateCaseContent = ({ categories }: Props) => {
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
      <HeaderSection />
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <CaseForm
          onOpenUserSelector={() => setIsUserSelectorOpen(true)}
          selectedUser={selectedUser}
          categories={categories}
        />
        <FileUploadSection />
      </div>
    </div>
  );
};

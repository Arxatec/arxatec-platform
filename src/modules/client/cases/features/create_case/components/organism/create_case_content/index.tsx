import { useState } from "react";
import type { FormValues, User } from "../../../interface";
import type { LawyerModel, LegalCategoryModel } from "../../../models";
import {
  HeaderSection,
  CaseForm,
  FileUploadSection,
  SelectUser,
} from "../../molecules";
import { Controller, useForm } from "react-hook-form";
import { TextRich } from "~/components/organisms";
import { urgencyLevels } from "../../../constants";

interface Props {
  categories: LegalCategoryModel[];
  lawyers: LawyerModel[];
}

export const CreateCaseContent = ({ categories, lawyers }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: categories[0],
      urgency: urgencyLevels[0],
      isPrivate: false,
    },
    mode: "onTouched",
  });

  const [isUserSelectorOpen, setIsUserSelectorOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LawyerModel | undefined>();

  const handleUserSelect = (user: LawyerModel) => {
    setSelectedUser(user);
    setValue("lawyer", user);
    setIsUserSelectorOpen(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen">
      <SelectUser
        open={isUserSelectorOpen}
        setOpen={setIsUserSelectorOpen}
        onSelect={handleUserSelect}
        lawyers={lawyers}
      />
      <HeaderSection />
      <div className="grid grid-cols-2 gap-2">
        <CaseForm
          control={control}
          errors={errors}
          onOpenUserSelector={() => setIsUserSelectorOpen(true)}
          selectedUser={selectedUser}
          categories={categories}
          watch={watch}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <FileUploadSection />
      </div>
      <div className="mt-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
        <label className="text-sm font-medium text-gray-900">
          Descripción del caso
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "La descripción es requerida" }}
          render={({ field }) => (
            <>
              <TextRich
                value={field.value}
                onChange={field.onChange}
                minHeight="250px"
                maxHeight="600px"
                className="mt-2"
                showImageMenu={false}
                showTableMenu={false}
                showYoutubeMenu={false}
                showFontSelector={false}
              />
              {errors.description && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};

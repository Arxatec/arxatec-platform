import { BuildingLibraryIcon, UserIcon } from "@heroicons/react/16/solid";
import { ROLE, type Form } from "../../../types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

const roles = [
  {
    title:
      LocaleKeys.pages_onboarding_general_choice_role_questions_question_1_answer_1_label,
    description:
      LocaleKeys.pages_onboarding_general_choice_role_questions_question_1_answer_1_value,
    icon: UserIcon,
    role: ROLE.CUSTOMER,
  },
  {
    title:
      LocaleKeys.pages_onboarding_general_choice_role_questions_question_1_answer_2_label,
    description:
      LocaleKeys.pages_onboarding_general_choice_role_questions_question_1_answer_2_value,
    icon: BuildingLibraryIcon,
    role: ROLE.LAWYER,
  },
];

interface Props {
  form: Form;
  setForm: (form: Form) => void;
}

export const SelectRoleStep: React.FC<Props> = ({ form, setForm }) => {
  const [role, setRole] = useState<ROLE | null>(null);
  const { t } = useTranslation();

  const selectRole = (newRole: ROLE) => {
    setRole(newRole);
    setForm({ ...form, role: newRole });
  };
  return (
    <>
      {roles.map((item) => (
        <button
          className={`w-full border rounded-md p-4 shadow-sm grid grid-cols-[auto_1fr] gap-4 ${
            item.role === role ? "border-blue-600 border-2 bg-blue-50" : ""
          }`}
          onClick={() => selectRole(item.role)}
        >
          <item.icon
            className={`size-7  ${
              item.role === role ? "text-blue-600" : "text-gray-900"
            }`}
          />
          <div>
            <h2
              className={`text-base font-bold ${
                item.role === role ? "text-blue-600" : "text-gray-900"
              } text-left`}
            >
              {t(item.title)}
            </h2>
            <p
              className={`text-sm ${
                item.role === role ? "text-blue-600" : "text-gray-500"
              } text-left`}
            >
              {t(item.description)}
            </p>
          </div>
        </button>
      ))}
    </>
  );
};

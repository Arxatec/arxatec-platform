import { useFormContext } from "react-hook-form";
import type { CustomerOnboardingFormData } from "../../../types";
import { BudgetRangeSelector } from "../../../components/molecules/budget_range_selector";
import { UrgencySelector } from "../../../components/molecules/urgency_selector";
import { CommunicationPreferenceSelector } from "../../../components/molecules/communication_preference_selector";

export const LegalPreferencesStep = () => {
  const { control } = useFormContext<CustomerOnboardingFormData>();

  return (
    <>
      <BudgetRangeSelector control={control} />
      <div className="grid grid-cols-2 gap-4">
        <UrgencySelector control={control} />
        <CommunicationPreferenceSelector control={control} />
      </div>
    </>
  );
};

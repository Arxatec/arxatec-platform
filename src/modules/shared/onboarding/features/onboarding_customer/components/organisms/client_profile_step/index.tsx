import { useFormContext } from "react-hook-form";
import { type CustomerOnboardingFormData } from "../../../types";
import { ProfilePictureUpload, OccupationInput } from "../../molecules";
import { LocationSelector } from "../../../../../components/molecules/location_selector";
import { GenderSelector } from "../../../../../components/molecules/gender_selector";
import { BirthDateSelector } from "../../../../../components/molecules/birth_date_selector";

export const ClientProfileStep: React.FC = () => {
  const { control, setValue } = useFormContext<CustomerOnboardingFormData>();

  return (
    <>
      <ProfilePictureUpload control={control} />
      <LocationSelector
        control={control}
        name="clientProfile.location"
        onCoordinatesChange={(coordinates) => {
          setValue("clientProfile.coordinates", coordinates);
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <BirthDateSelector control={control} name="clientProfile.birthDate" />
        <OccupationInput control={control} />
      </div>
      <GenderSelector control={control} name="clientProfile.gender" />
    </>
  );
};

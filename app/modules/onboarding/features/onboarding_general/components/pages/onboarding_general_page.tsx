import { useTranslation } from "react-i18next";
import { bannerOnboardingGeneral, logo } from "~/utilities/assets_utilities";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { useEffect, useRef, useState } from "react";
import { ROLE, type Form } from "../../types";
import { Header, HeroImage } from "~/modules/onboarding/components/molecules";
import { useNavigate } from "react-router";
import { APP_PATHS } from "~/routes/routes";
import { useTitle } from "~/hooks";
import { Title } from "~/modules/onboarding/components/atoms";
import { SelectRoleStep } from "../organisms/select_role_step";

const initForm: Form = {
  role: null,
};

export default function OnboardingGeneral() {
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(initForm);
  const [hasMounted, setHasMounted] = useState(false);
  const navigate = useNavigate();
  const { changeTitle } = useTitle();
  const { t } = useTranslation();

  const navigateToNextPage = () => {
    if (form.role === null) {
      const errorRole =
        LocaleKeys.pages_onboarding_general_choice_role_errors_error_not_selected_role;
      setError(t(errorRole));
      return;
    }
    const nextRoute =
      form.role === ROLE.LAWYER
        ? APP_PATHS.ONBOARDING_LAWYER
        : APP_PATHS.ONBOARDING_CUSTOMER;
    navigate(nextRoute);
  };

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }
    if (form.role === null) {
      const errorRole =
        LocaleKeys.pages_onboarding_general_choice_role_errors_error_not_selected_role;
      setError(t(errorRole));
      return;
    }
    setError(null);
  }, [form.role]);

  useEffect(() => {
    changeTitle("Introducción - Arxatec");
  }, []);
  return (
    <div className="grid grid-cols-1 h-screen p-2 rounded-md lg:grid-cols-2">
      <div className="h-full items-center flex flex-col justify-between px-4 py-0 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-2 lg:order-1 w-full max-w-[720px] mx-auto gap-10">
        {/* Header Form */}
        <Header maxValue={0} value={0} />

        {/* Content Form */}
        <div className="mx-auto w-full ">
          <Title
            title={t(LocaleKeys.pages_onboarding_general_choice_role_title)}
            description={t(
              LocaleKeys.pages_onboarding_general_choice_role_description
            )}
          />
          <div className="w-full mt-8 gap-4 grid">
            <SelectRoleStep form={form} setForm={setForm} />
          </div>
        </div>

        {/* Actions Form */}
        <div className="w-full py-10">
          {error && (
            <p className="text-sm text-red-500 text-left mb-4">{error}</p>
          )}
          <PrimaryButton onClick={navigateToNextPage} className="w-full">
            {t(LocaleKeys.shared_next)}
          </PrimaryButton>
        </div>
      </div>

      {/* Image Form */}
      <HeroImage image={bannerOnboardingGeneral} />
    </div>
  );
}

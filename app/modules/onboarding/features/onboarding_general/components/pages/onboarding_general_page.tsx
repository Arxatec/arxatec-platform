import { useTranslation } from "react-i18next";
import { bannerOnboardingGeneral, logo } from "~/utilities/assets_utilities";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { BuildingLibraryIcon, UserIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { ROLE } from "../../types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { HeroImage } from "~/modules/onboarding/components/molecules";
import { useNavigate } from "react-router";
import { ROUTES } from "~/routes/routes";

const roles = [
  {
    title: LocaleKeys.pages_onboarding_general_question_1_answer_1_label,
    description: LocaleKeys.pages_onboarding_general_question_1_answer_1_value,
    icon: UserIcon,
    role: ROLE.CUSTOMER,
  },
  {
    title: LocaleKeys.pages_onboarding_general_question_1_answer_2_label,
    description: LocaleKeys.pages_onboarding_general_question_1_answer_2_value,
    icon: BuildingLibraryIcon,
    role: ROLE.LAWYER,
  },
];

export default function OnboardingGeneral() {
  const [role, setRole] = useState<ROLE | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToNextPage = () => {
    if (role === null) {
      setError(
        t(LocaleKeys.pages_onboarding_general_question_1_errors_error_1)
      );
      return;
    }
    const nextRoute =
      role === ROLE.LAWYER
        ? ROUTES.ONBOARDING_LAWYER
        : ROUTES.ONBOARDING_CUSTOMER;
    navigate(`/${nextRoute}`);
  };

  const selectRole = (newRole: ROLE) => {
    setRole(newRole);
    setError(null);
  };

  return (
    <div className="grid grid-cols-1 h-screen p-2 rounded-md lg:grid-cols-2">
      <div className="h-full items-center flex flex-col justify-between px-4 py-0 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-2 lg:order-1 w-full max-w-[720px] mx-auto gap-10">
        <div className="w-full flex items-center justify-between py-4">
          <img alt="Arxatec" src={logo} className="h-10 w-auto" />

          <div style={{ width: 30, height: 30 }}>
            <CircularProgressbar
              value={20}
              strokeWidth={15}
              styles={buildStyles({
                pathColor: `#2563eb`,
                trailColor: "#dbeafe",
              })}
            />
          </div>
        </div>
        <div className="mx-auto w-full ">
          <h1 className="text-2xl font-bold text-gray-900">
            {t(LocaleKeys.pages_onboarding_general_question_1_question)}
          </h1>
          <p className="text-gray-500 text-base mt-2">
            {t(LocaleKeys.pages_onboarding_general_question_1_description)}
          </p>
          <div className="w-full mt-8 gap-4 grid">
            {roles.map((item) => (
              <button
                className={`w-full border rounded-md p-4 shadow-sm grid grid-cols-[auto_1fr] gap-4 ${
                  item.role === role
                    ? "border-blue-600 border-2 bg-blue-50"
                    : ""
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
          </div>
        </div>
        <div className="w-full py-10">
          {error && (
            <p className="text-sm text-red-500 text-left mb-4">{error}</p>
          )}
          <PrimaryButton onClick={navigateToNextPage} className="w-full">
            {t(LocaleKeys.pages_onboarding_general_question_1_button_next)}
          </PrimaryButton>
        </div>
      </div>
      <HeroImage
        image={bannerOnboardingGeneral}
        title={t(LocaleKeys.pages_auth_register_testimonial_title)}
        text={t(LocaleKeys.pages_auth_register_testimonial_text)}
        author={t(LocaleKeys.pages_auth_register_testimonial_author)}
      />
    </div>
  );
}

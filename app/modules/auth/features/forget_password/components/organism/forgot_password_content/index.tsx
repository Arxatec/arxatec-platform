import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AllDone,
  EnterCodeStep,
  EnterEmailStep,
  EnterResetPasswordStep,
} from "../../molecules";

const steps = [EnterEmailStep, EnterCodeStep, EnterResetPasswordStep, AllDone];

export const ForgotPasswordContent: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const StepComponent = steps[step];

  return (
    <>
      <StepComponent />

      <div className="flex space-x-2 w-full px-4">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setStep(index)}
            className={`${
              step !== index ? "bg-slate-200 " : "bg-blue-600"
            } flex w-full h-1.5 rounded-sm`}
          ></button>
        ))}
      </div>
    </>
  );
};

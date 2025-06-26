import { useState } from "react";
import {
  AllDone,
  EnterCodeStep,
  EnterEmailStep,
  EnterResetPasswordStep,
} from "../../molecules";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";

const steps = [EnterEmailStep, EnterCodeStep, EnterResetPasswordStep, AllDone];

export const ForgotPasswordContent: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const CurrentComponent = steps[step];

  const handleNextStep = () => {
    setStep(step + 1);
    if (step === steps.length - 1) {
      navigate(ROUTES.Auth.Login);
    }
  };

  return (
    <>
      <CurrentComponent handleNextStep={handleNextStep} />

      <div className="flex space-x-2 w-full px-4">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`${
              step !== index ? "bg-slate-200 " : "bg-blue-600"
            } flex w-full h-1.5 rounded-sm`}
            aria-label={`Ir al paso ${index + 1}`}
          ></button>
        ))}
      </div>
    </>
  );
};

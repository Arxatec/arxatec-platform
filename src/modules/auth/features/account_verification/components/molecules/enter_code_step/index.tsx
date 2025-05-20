import { ResendCodeAction } from "../resend_code_action";
import { VerificationHeader } from "../verification_header";
import { VerificationCodeForm } from "../verification_code_form";

export const EnterCodeStep = () => {
  return (
    <div className="flex items-center justify-center h-full p-4 w-full">
      <div className="w-full max-w-[300px] space-y-6">
        <VerificationHeader />
        <div className="space-y-6">
          <VerificationCodeForm />
          <ResendCodeAction />
        </div>
      </div>
    </div>
  );
};

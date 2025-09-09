import { Header } from "../../../components";
import { Form } from "../components";

export default function VerifyPasswordResetPage() {
  return (
    <>
      <Header
        title="Verificar cuenta"
        description="Enviamos un código de verificación a tu correo electrónico."
      />
      <Form />
    </>
  );
}

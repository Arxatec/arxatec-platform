import { Form } from "../components";
import { Header } from "../../../components";

export default function RecoverPasswordPage() {
  return (
    <>
      <Header
        title="Recuperar contraseña"
        description="Ingresa tu correo electrónico para recuperar tu contraseña"
      />
      <Form />
    </>
  );
}

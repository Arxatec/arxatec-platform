import { Form } from "../components";
import { Header } from "../../../components";

export default function ChangePasswordPage() {
  return (
    <>
      <Header
        title="Cambiar contraseña"
        description="Ingresa tu nueva contraseña y confírmala para continuar"
      />
      <Form />
    </>
  );
}

import { useEffect } from "react";
import { Header } from "../../../components";
import { Form } from "../components";
import { useTitle } from "@/hooks";

export default function VerifyPasswordResetPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Verificar cambio de contraseña - Arxatec");
  }, []);
  return (
    <>
      <Header
        title="Verificar cambio de contraseña"
        description="Enviamos un código de verificación a tu correo electrónico."
      />
      <Form />
    </>
  );
}

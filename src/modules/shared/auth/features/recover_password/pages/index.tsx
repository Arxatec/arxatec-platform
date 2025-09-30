import { Form } from "../components";
import { Header } from "../../../components";
import { useEffect } from "react";
import { useTitle } from "@/hooks";

export default function RecoverPasswordPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Recuperar contraseña - Arxatec");
  }, []);
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

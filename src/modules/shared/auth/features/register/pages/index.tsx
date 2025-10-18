import { useTitle } from "@/hooks";
import { Header } from "../../../components";
import { Form } from "../components";
import { useEffect } from "react";

export default function RegisterPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Registrarse - Arxatec");
  }, [changeTitle]);
  return (
    <>
      <Header
        title="Crear cuenta"
        description="Ingresa tus datos para crear una cuenta en la plataforma, si ya tienes una cuenta, puedes ingresar."
      />
      <Form />
    </>
  );
}

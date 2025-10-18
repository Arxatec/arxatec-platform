import { Form } from "../components";
import { Header } from "../../../components";
import { useTitle } from "@/hooks";
import { useEffect } from "react";

export default function LoginPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Ingresar - Arxatec");
  }, []);

  return (
    <>
      <Header
        title="Ingresar a mi cuenta"
        description="Ingresa tus credenciales para ingresar a tu cuenta, si no tienes una cuenta, puedes registrarte."
      />
      <Form />
    </>
  );
}

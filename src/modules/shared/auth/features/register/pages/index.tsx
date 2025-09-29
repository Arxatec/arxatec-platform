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
        title="Registrarse"
        description="Ingresa tus datos para registrarte en la plataforma"
      />
      <Form />
    </>
  );
}

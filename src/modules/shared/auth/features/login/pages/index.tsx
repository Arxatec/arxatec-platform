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
        title="Ingresar "
        description="Ingresa tus credenciales para ingresar a tu cuenta"
      />
      <Form />
    </>
  );
}

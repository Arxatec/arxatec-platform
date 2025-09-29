import { useEffect } from "react";
import { Header } from "../../../components";
import { Form } from "../components";
import { useTitle } from "@/hooks";

export default function VerifyAccountPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Verificar cuenta - Arxatec");
  }, []);
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

import { Card, CardContent, CardHeader } from "@/components/ui";
import { Form } from "../components";
import { Header } from "../../../components";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <Header
          title="Ingresar con tu cuenta"
          description="Ingresa tus credenciales para ingresar a tu cuenta"
        />
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  );
}

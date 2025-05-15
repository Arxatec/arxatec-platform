import { useTitle } from "~/hooks/useTitle";
import { useEffect } from "react";

export default function ViewProfilePage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Perfil - Arxatec");
  }, []);
  return <div>ViewProfilePage</div>;
}

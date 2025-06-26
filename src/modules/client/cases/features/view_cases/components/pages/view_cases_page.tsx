import { useEffect } from "react";
import { useTitle } from "~/hooks";

export default function ViewCases() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis casos - Arxatec");
  }, []);
  return <div className="min-h-screen h-full max-w-6xl mx-auto px-6"></div>;
}

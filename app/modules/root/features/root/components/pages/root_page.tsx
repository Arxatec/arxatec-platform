import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "~/routes/routes";

export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${ROUTES.LOGIN}`);
  }, []);
  return <div></div>;
}

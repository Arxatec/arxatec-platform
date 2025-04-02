import { useEffect } from "react";
import { useNavigate } from "react-router";
import { APP_PATHS} from "~/routes/routes";

export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(APP_PATHS.LOGIN);
  }, []);
  return <div></div>;
}

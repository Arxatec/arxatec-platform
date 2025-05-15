import { AuthGuard } from "~/components/guards";

export default function Protected() {
  return <AuthGuard />;
}

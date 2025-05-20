import { AuthGuard } from "~/components/guards";

export default function Protected({ children }: { children: React.ReactNode }) {
  console.log("Protected");
  return <AuthGuard>{children}</AuthGuard>;
}

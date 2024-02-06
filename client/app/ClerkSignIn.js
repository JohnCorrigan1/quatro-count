import { SignIn as BaseSignIn } from "@clerk/clerk-react";

export default function SignIn() {
  return <BaseSignIn afterSignInUrl={"/"} />;
}

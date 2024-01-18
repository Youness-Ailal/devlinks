import AuthContainer from "@/features/auth/AuthContainer";
import SignInForm from "@/features/auth/SignInForm";

function SignIn() {
  return (
    <AuthContainer formFor="signin">
      <SignInForm />
    </AuthContainer>
  );
}

export default SignIn;

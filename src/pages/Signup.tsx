import AuthContainer from "@/features/auth/AuthContainer";
import SignUpForm from "@/features/auth/SignupForm";

function Signup() {
  return (
    <AuthContainer formFor="signup">
      <SignUpForm />
    </AuthContainer>
  );
}

export default Signup;

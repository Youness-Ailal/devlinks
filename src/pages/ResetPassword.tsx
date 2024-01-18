import AuthContainer from "@/features/auth/AuthContainer";
import PasswordRecoverForm from "@/features/auth/PasswordRecoveryForm";

function ResetPassword() {
  return (
    <AuthContainer formFor="resetPassword">
      <PasswordRecoverForm />
    </AuthContainer>
  );
}

export default ResetPassword;

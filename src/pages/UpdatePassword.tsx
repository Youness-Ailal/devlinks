import AuthContainer from "@/features/auth/AuthContainer";
import UpdatePasswordForm from "@/features/auth/UpdatePasswordForm";

function UpdatePassword() {
  return (
    <AuthContainer formFor="updatePassword">
      <UpdatePasswordForm />
    </AuthContainer>
  );
}

export default UpdatePassword;

import styled from "styled-components";
import ProfileImage from "./ProfileImage";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function ProfileForm() {
  return (
    <StyledForm>
      <ProfileImage />
    </StyledForm>
  );
}

export default ProfileForm;

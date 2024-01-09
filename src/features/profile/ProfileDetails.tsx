import Container from "@/components/Container";
import Header from "@/components/Header";
import Text from "@/components/Text";
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";
import Button from "@/components/Button";

function ProfileDetails() {
  return (
    <Container className="flex flex-col px-10 py-10 gap-6">
      <div className="flex flex-col gap-1">
        <Header>Profile Details</Header>
        <Text>
          Add your details to create a personal touch to your profile.
        </Text>
      </div>
      <ProfileForm />
      <ProfileInfo />
      <div className="border-t border-gray-300 flex justify-end px-4 py-6 mt-auto">
        <div>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </Container>
  );
}

export default ProfileDetails;

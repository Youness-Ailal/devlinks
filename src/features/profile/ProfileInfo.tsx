import Input from "@/components/Input";

function ProfileInfo() {
  return (
    <div className="flex flex-col gap-8 p-4 bg-gray-50">
      <Input type="texts" id="firstName" label="First Name" />
      <Input type="texts" id="lastName" label="Last Name" />
      <Input type="email" disabled id="email" label="Email" />
    </div>
  );
}

export default ProfileInfo;

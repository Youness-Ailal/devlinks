import Container from "@/components/Container";
import Header from "@/components/Header";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import Input from "@/components/Input";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import toast from "react-hot-toast";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
type FormValues = {
  firstName: string;
  lastName: string;
  avatar: File[];
};

function ProfileDetails() {
  const {
    user: {
      email,
      user_metadata: {
        firstName,
        lastName,
        data: { avatar },
      },
    },
  } = useUser();
  const { update, status } = useUpdateUser();
  const isLoading = status === "pending";

  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      firstName,
      lastName,
    },
  });
  const { errors } = formState;

  const hasMadeChanges =
    firstName !== watch("firstName") ||
    lastName !== watch("lastName") ||
    watch("avatar")?.length;

  function onSubmit({ ...data }: FormValues) {
    update({ ...data });
  }

  return (
    <Container className="flex flex-col gap-6 p-10 max-[600px]:p-4">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <Header>Profile Details</Header>
          <Text>
            Add your details to create a personal touch to your profile.
          </Text>
        </div>
        <ProfileImage
          isLoading={isLoading}
          avatar={avatar}
          watch={watch}
          register={register}
        />
        <div className="flex flex-col gap-10 p-4 pt-8 bg-gray-50 border rounded-md border-violet-50">
          <Input
            disabled={isLoading}
            error={errors?.firstName?.message.toString()}
            type="texts"
            // defaultValue={firstName}
            id="firstName"
            label="First Name"
            {...register("firstName", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "please enter at least 3 characters",
              },
            })}
          />
          <Input
            disabled={isLoading}
            error={errors?.lastName?.message.toString()}
            type="texts"
            id="lastName"
            // defaultValue={lastName}
            label="Last Name"
            {...register("lastName", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "please enter at least 3 characters",
              },
            })}
          />
          <Input
            type="email"
            disabled={true}
            defaultValue={email}
            id="email"
            label="Email"
          />
        </div>
        <div className="border-t border-gray-300 flex justify-end px-4 py-6 mt-auto max-[1000px]:block">
          <div>
            <Button disabled={isLoading || !hasMadeChanges} variant="primary">
              Update Profile
            </Button>
          </div>
        </div>
      </StyledForm>
    </Container>
  );
}

export default ProfileDetails;

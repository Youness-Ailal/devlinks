import Container from "@/components/ui/Container";
import Header from "@/components/Header";
import Text from "@/components/ui/Text";
// @ts-ignore
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import Input from "@/components/ui/Input";
import { useUser } from "../auth/useUser";
import { useUpdateUser } from "../auth/useUpdateUser";
import { IoIosLogOut } from "react-icons/io";
import { useSignOut } from "../auth/useSignOut";
import { useLinks } from "../links/useLinks";
import Spinner from "@/components/ui/Spinner";
import { IoCopyOutline } from "react-icons/io5";
import { DEV_URL } from "@/utils/constants";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useUserNames } from "../links/useUserNames";
// import BannerImage from "./BannerImage";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
type FormValues = {
  firstName: string;
  lastName: string;
  id: string;
  avatar: File[];
};

function ProfileDetails() {
  const { user } = useUser() || {};
  const { userNames, isLoading: userNamesLoading } = useUserNames();
  const { email, user_metadata } = user || {};
  const { full_name: fullName, avatar_url } = user_metadata || {};
  const { links, isLoading: linksLoading } = useLinks();

  const { id } = links || {};

  const firstName = fullName?.split(" ")[0];
  const lastName = fullName?.split(" ")[1];
  const { update, status } = useUpdateUser();
  const { signOut, status: signOutStatus } = useSignOut();
  const isLoading =
    status === "pending" || signOutStatus === "pending" || linksLoading;

  const { register, handleSubmit, formState, watch, setValue } = useForm({
    mode: "all",
    defaultValues: {
      firstName,
      lastName,
      id,
    },
  });
  useEffect(() => {
    setValue("id", id);
  }, [id]);

  function handleSignOut() {
    signOut();
  }

  const { errors } = formState;

  const hasMadeChanges =
    firstName !== watch("firstName") ||
    lastName !== watch("lastName") ||
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    watch("avatar")?.length ||
    id !== watch("id");
  function onSubmit({ ...data }: FormValues) {
    update({ ...data });
  }

  function handleLinkCopy() {
    navigator.clipboard.writeText(`${DEV_URL}/${id}`);
    toast.success(`Link copied!`);
  }
  if (linksLoading) return <Spinner />;

  return (
    <Container className="flex flex-col gap-6 p-10 max-[600px]:p-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Header>Profile Details</Header>
            <Text>
              Add your details to create a personal touch to your profile.
            </Text>
          </div>
          <ProfileImage
            isLoading={isLoading}
            avatar={avatar_url}
            watch={watch}
            register={register}
          />
          {/* <BannerImage
            isLoading={isLoading}
            avatar={avatar_url}
            watch={watch}
            register={register}
          /> */}
          <div className="flex flex-col gap-10 p-4 pt-8 bg-gray-50 border rounded-md border-violet-50">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 max-[1200px]:grid-cols-1 max-[1200px]:gap-y-6 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
              <Input
                disabled={isLoading}
                error={errors?.firstName?.message.toString()}
                type="texts"
                direction="y"
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
                direction="y"
                type="texts"
                id="lastName"
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
                className="!pl-[8.4rem] !pr-8"
                disabled={isLoading || userNamesLoading}
                extraText="devlinks.ailal.dev/"
                direction="y"
                type="texts"
                extraElement={
                  <button
                    className="p-1 flex items-center justify-center"
                    type="button"
                    disabled={isLoading}
                    onClick={handleLinkCopy}>
                    <IoCopyOutline />
                  </button>
                }
                id="userName"
                label="Username"
                error={errors?.id?.message.toString()}
                {...register("id", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "please enter at least 3 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "username too long!",
                  },
                  validate: value => {
                    const users = userNames?.filter(
                      item => item.id.toLowerCase() !== id.toLowerCase()
                    );
                    const usersHasValue = users?.filter(
                      item => item.id.toLowerCase() === value.toLowerCase()
                    );

                    if (users.length === usersHasValue.length)
                      return "Username already taken";
                  },
                })}
              />
              <Input
                direction="y"
                type="email"
                disabled={true}
                defaultValue={email || ""}
                id="email"
                label="Email"
              />
            </div>
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              type="button"
              className="-mt-4 hover:text-red-400 underline-offset-2 self-end text-base text-gray-600 hover:underline flex items-center gap-1 !active:scale-100">
              <p>Sign out</p>
              <IoIosLogOut className="text-xl" />
            </button>
          </div>
          <div className="border-t border-gray-300 flex flex-col items-end justify-end px-4 py-6 mt-auto max-[1000px]:block">
            <div>
              <Button disabled={isLoading || !hasMadeChanges} variant="primary">
                Update Profile
              </Button>
            </div>
          </div>
        </StyledForm>
      </motion.div>
    </Container>
  );
}

export default ProfileDetails;

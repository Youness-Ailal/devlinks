import supabase from "./supabase";
import { SUPABASE_URL } from "./supabase.ts";

type loginCredentilasType = {
  email: string;
  password: string;
};

// Log in
export async function signInApi({ email, password }: loginCredentilasType) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}
export async function signUpApi({ email, password }: loginCredentilasType) {
  //1. sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  //2. insert new links row
  const id = `${email.split("@")[0]}${new Date()
    .getDay()
    .toString()
    .substring(0, 6)}`;
  const { error: linksError } = await supabase.from("links").insert({
    user_id: data.user.id,
    email: data.user.email,
    id,
    links_list: [],
  });
  if (linksError) {
    throw new Error(linksError.message);
  }

  //3 set hasLinksRow to true
  const { data: updateData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        hasLinks: "true",
      },
    });
  if (updateError) {
    throw new Error(updateError.message);
  }

  return { user: updateData?.user };
}

// Log in with google
export async function signInWithGoogle() {
  //1 signinuser with google
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    throw new Error(error.message);
  }
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  return;
  let firstName: string;
  let lastName: string;
  let avatar: string;
  if (userData.user.user_metadata?.full_name) {
    const FullName = userData.user.user_metadata?.full_name;
    firstName = FullName.toString().split(" ")[0];
    lastName = FullName.toString().split(" ")[1];
  }
  if (userData.user.user_metadata?.avatar_url) {
    avatar = userData.user.user_metadata?.avatar_url;
  }
  // 2. update details
  const { data: updateData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        firstName,
        lastName,
        avatar,
      },
    });
  if (updateError) throw new Error(updateError.message);

  return updateData?.user;
}

// Log out
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// Get user details
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}
export type UserDataType = {
  firstName?: string;
  lastName?: string;
  id?: string;
  bio: string;
  avatar?: File[] | undefined;
};

// update user details
export async function updateUser({
  firstName,
  lastName,
  id,
  avatar,
  bio,
}: UserDataType) {
  //  update first name and/or last name
  let updateData: {
    data: { full_name?: string; bio?: string; avatar_url?: string };
  };

  if (firstName && lastName && bio) {
    updateData = { data: { full_name: `${firstName} ${lastName}`, bio } };
  }
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);
  const userId = userData.user.id;
  console.log("user : ", userId);
  console.log("new id : ", id);

  const { data, error } = await supabase.auth.updateUser(updateData);
  await supabase
    .from("links")
    .update({
      full_name: `${firstName} ${lastName}`,
      email: userData.user.email,
      bio,
      id: id.toLocaleLowerCase(),
    })
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  if (!avatar?.length) return data;

  //  handleFile
  const file = avatar[0];
  const filesizeInMb = file.size / 1024 ** 2;

  if (filesizeInMb > 2)
    throw new Error("Image should be lower than 2MB in size");

  const fileName = `avatar-${firstName}-${lastName}-${Math.random() * 100}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (storageError) throw new Error(storageError.message);
  const avatarUrl = `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedData, error: errorFile } =
    await supabase.auth.updateUser({ data: { avatar_url: avatarUrl } });
  await supabase
    .from("links")
    .update({
      avatar_url: avatarUrl,
    })
    .eq("user_id", userId);
  if (errorFile) throw new Error(errorFile.message);

  return updatedData?.user;
}

// password reset link
export async function getResetPassLink(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://devlinks.ailal.dev/update-password",
  });

  if (error) throw new Error(error.message);

  return data;
}
// update password
export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

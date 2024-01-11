import supabase from "./supabase";
import { SUPABASE_URL } from "./supabase";

type loginCredentilasType = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: loginCredentilasType) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}
type UserData = {
  firstName?: string;
  lastName?: string;
  avatar?: File[] | undefined;
};
export async function updateUser({ firstName, lastName, avatar }: UserData) {
  // 1. update first name and/or last name

  let updateData: { data: UserData };

  if (firstName && lastName) {
    updateData = { data: { firstName, lastName } };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  console.log(data);
  if (!avatar?.length) return data?.user;

  // 2. handleFile

  const file = avatar[0];
  const fileName = `avatar-${firstName}-${lastName}-${Math.random() * 100}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (storageError) throw new Error(storageError.message);
  const avatarLink = `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedData, error: errorFile } =
    await supabase.auth.updateUser({
      data: { data: { avatar: avatarLink } },
    });
  if (errorFile) throw new Error(errorFile.message);

  console.log(updatedData);

  return updatedData?.user;
}

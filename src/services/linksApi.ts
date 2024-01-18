import { UserLinkType } from "@/context/LinksContext";
import supabase from "./supabase";

export type updateLinksType = {
  userId: string;
  newData: UserLinkType[];
};
export async function getUserLinksByUserId(id: string) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", id);

  if (error) throw new Error(error.message);

  return data[0];
}
export async function getUserLinksById(id: string) {
  const { data: linksData, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq("id", id);

  if (linksError) throw new Error(linksError.message);

  return linksData[0];
}
export async function addUserLinks({
  id,
  hasLinks,
}: {
  id: string;
  hasLinks: string;
}) {
  if (hasLinks === "true") return;
  const { data, error } = await supabase
    .from("links")
    .insert({
      user_id: id,
      links: "",
    })
    .select("links")
    .single();
  if (error) throw new Error(error.message);

  const { error: userError } = await supabase.auth.updateUser({
    data: {
      hasLinks: "true",
    },
  });
  if (userError) throw new Error(userError.message);

  return data;
}

export async function updateUserLinks({ userId, newData }: updateLinksType) {
  const { data, error } = await supabase
    .from("links")
    .update({ links_list: newData })
    .eq("user_id", userId)
    .select();

  if (error) throw new Error(error.message);

  return data[0];
}
export async function getUsernames() {
  const { data, error } = await supabase.from("links").select("id");

  if (error) throw new Error(error.message);

  return data;
}

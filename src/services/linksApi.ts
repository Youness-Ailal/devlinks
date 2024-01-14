import { UserLinkType } from "@/context/LinksContext";
import supabase from "./supabase";

export type updateLinksType = {
  userId: string;
  newData: UserLinkType[];
};
export async function getUserLinks() {
  const { data, error } = await supabase.from("links").select("links").single();

  if (error) throw new Error(error.message);

  return data?.links;
}

export async function updateUserLinks({ userId, newData }: updateLinksType) {
  const dataAsSting = JSON.stringify(newData);

  const { data, error } = await supabase
    .from("links")
    .update({ links: newData })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

import supabase from "./supabase";

export async function getUserLinks() {
  const { data, error } = await supabase.from("links").select("links");
  console.log(data);

  if (error) throw new Error(error.message);
  return data;
}

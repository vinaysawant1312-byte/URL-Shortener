import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function deleteUrl(id) {
  let { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete URLs");
  }

  return data;
}

export async function createUrl({
  title,
  longurl,
  customUrl,
  user_id,
  qrcode,
}) {
  const short_url = Math().random().tostring(36).substring(2, 6);
  const fileName = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/sign/profile_pic/${fileName}`;

  let { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longurl,
        custom_url: customUrl || null,
        user_id,
        qrcode,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}

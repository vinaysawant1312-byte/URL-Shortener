import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({ name, email, password, profile_pic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const { data: signedData, error: signedError } = await supabase.storage
    .from("profile_pic")
    .createSignedUrl(fileName, 60 * 60 * 24);

  if (signedError) throw new Error(signedError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: signedData.signedUrl,
        profile_pic_path: fileName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;

  if (error) throw new Error(error.message);

  const user = session.session?.user;
  const fileName = user?.user_metadata?.profile_pic_path;

  if (fileName) {
    const { data: signedData } = await supabase.storage
      .from("profile_pic")
      .createSignedUrl(fileName, 60 * 60 * 24);

    user.user_metadata.profile_pic = signedData?.signedUrl;
  }

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

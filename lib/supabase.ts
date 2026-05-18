import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function deleteImageFromSupabase(category: string, filename: string) {
  if (!supabaseUrl || !filename) return;
  const filePath = `${category}/${filename}`;
  await supabase.storage.from("edutrip-images").remove([filePath]);
}

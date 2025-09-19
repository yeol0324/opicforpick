const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const mode = import.meta.env.MODE;
const baseUrl = import.meta.env.BASE_URL;
console.log("====mode====", mode, "====baseUrl====", baseUrl);

console.log(import.meta.env.VITE_SUPABASE_URL);

if (!url || !anon) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const ENV = {
  SUPABASE_URL: url,
  SUPABASE_ANON_KEY: anon,
};

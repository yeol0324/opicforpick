export const queryKey = {
  user: (id: string) => ["user", id] as const,
  sentences: (page = 1) => ["sentences", { page }] as const,
};

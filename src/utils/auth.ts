// utils/auth.ts
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  if (match) return match[2];
  return null;
};

export const isAuthenticated = (): boolean => !!getToken();

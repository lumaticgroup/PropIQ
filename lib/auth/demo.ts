/** Demo-only credentials — replace with real auth in production. */
export const DEMO_USER = {
  email: "ahmet@propiq.demo",
  password: "PropIQ2026!",
  name: "Ahmet Yılmaz",
  nameDisplayTr: "Ahmet Yılmaz",
  role: "Sales Director",
  roleTr: "Satış Direktörü",
} as const;

export function isDemoLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_USER.email.toLowerCase() && password === DEMO_USER.password
  );
}

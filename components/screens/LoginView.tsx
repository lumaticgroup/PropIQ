"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { DEMO_USER } from "@/lib/auth/demo";

export function LoginView() {
  const { t } = useTranslation();
  const { login, user, ready } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>(DEMO_USER.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace("/dashboard");
  }, [ready, user, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    if (login(email, password)) {
      router.replace("/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-page px-4 py-12">
      <div className="relative w-full max-w-md">
        <LoginThemeButton />
        <Card className="w-full">
        <div className="mb-6 text-center">
          <p className="text-display-md font-bold text-accent-ai">PropIQ</p>
          <h1 className="text-heading-lg text-text-primary mt-2">{t("auth.title")}</h1>
          <p className="text-body-sm text-text-secondary mt-2">{t("auth.subtitle")}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-body-sm">
            <span className="text-text-secondary">{t("auth.email")}</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-default bg-bg-sunken px-3 py-2"
              required
            />
          </label>
          <label className="block text-body-sm">
            <span className="text-text-secondary">{t("auth.password")}</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-default bg-bg-sunken px-3 py-2"
              required
            />
          </label>
          {error && <p className="text-body-sm text-status-danger">{t("auth.error")}</p>}
          <Button type="submit" variant="primary" className="w-full">
            {t("auth.submit")}
          </Button>
        </form>
        <div className="mt-6 rounded-md border border-default bg-bg-sunken p-4 text-body-sm text-text-secondary">
          <p className="text-label-md text-text-muted">{t("auth.demoLabel")}</p>
          <p className="mt-2 text-caption">
            <span className="text-text-muted">{t("auth.demoEmailLabel")}: </span>
            <span className="font-mono text-text-primary">{DEMO_USER.email}</span>
          </p>
          <p className="mt-1 text-caption">
            <span className="text-text-muted">{t("auth.demoPasswordLabel")}: </span>
            <span className="font-mono text-text-primary">{DEMO_USER.password}</span>
          </p>
        </div>
      </Card>
      </div>
    </div>
  );
}

function LoginThemeButton() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="mb-3 flex justify-end">
      <button
        type="button"
        onClick={toggleTheme}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-md border border-default bg-bg-surface text-text-secondary"
        aria-label={t("header.themeToggle")}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
      </button>
    </div>
  );
}

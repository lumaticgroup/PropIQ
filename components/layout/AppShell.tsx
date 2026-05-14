"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ScreenTabs } from "@/components/layout/ScreenTabs";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LanguageContext";

function SidebarFallback() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-14 flex-col bg-bg-sidebar sm:flex lg:w-60" />
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useAuth();
  const { t } = useTranslation();
  const isLogin = pathname === "/login";

  useEffect(() => {
    if (!ready || isLogin) return;
    if (!user) router.replace("/login");
  }, [ready, user, isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-bg-page px-4 text-center text-body-sm text-text-secondary">
        <p>{t("auth.loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-page pb-16 sm:pb-0">
      <Suspense fallback={<SidebarFallback />}>
        <Sidebar />
      </Suspense>
      <div className="sm:pl-14 lg:pl-60">
        <Header />
        <ScreenTabs />
        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}

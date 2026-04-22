import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AccountSidebar } from "@/components/layout/AccountSidebar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="container py-10">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <AccountSidebar />
          <section>{children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
}

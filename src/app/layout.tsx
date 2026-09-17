import type { Metadata } from "next";
import "./globals.css";
import { NexovaProvider } from "@/context/NexovaContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ToastContainer } from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: "NEXOVA | Embroidery Digitizing & Business Operations",
  description:
    "Commercial embroidery digitizing, vector preparation, and production management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070a10] text-slate-100 antialiased flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        <NexovaProvider>
          <div className="flex min-h-screen">
            {/* Desktop Collapsible Sidebar */}
            <Sidebar />

            {/* Mobile Navigation Drawer */}
            <MobileNav />

            {/* Main Application Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
                {children}
              </main>
            </div>
          </div>

          {/* Non-intrusive Toast Notifications */}
          <ToastContainer />
        </NexovaProvider>
      </body>
    </html>
  );
}

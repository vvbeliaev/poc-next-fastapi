import { Header } from "@/widgets/header";
import { QueryProvider, ThemeProvider } from "@/shared/lib";
import type { Metadata } from "next";

import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-mono/400.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Property Listings",
  description: "Browse and favorite properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

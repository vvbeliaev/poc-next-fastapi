import type { Metadata } from "next";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-mono/400.css";
import "./globals.css";
import { QueryProvider } from "@/shared/lib";

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
    <html lang="en">
      <body className="antialiased font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextAuthSessionProvider from "@/lib/NextAuthSessionProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "kamodoc",
  description: "kamodoc dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased dark`}>
        <Toaster position="top-center" richColors />
        <NextAuthSessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

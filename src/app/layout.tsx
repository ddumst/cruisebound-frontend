import type { Metadata } from "next";
import Providers from "@/utils/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Engineer - Cruisebound",
  description: "Frontend Engineer technical assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

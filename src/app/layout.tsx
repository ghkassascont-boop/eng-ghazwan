import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Architecture & Civil Engineering Portfolio",
  description: "Professional portfolio of architecture and civil engineering work.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
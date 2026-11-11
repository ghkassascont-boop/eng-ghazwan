import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Harmony Decor | Architecture & Interior Design", template: "%s | Harmony Decor" },
  description: "Harmony Decor — thoughtful architecture, interior design and refined spaces shaped around people and purpose.",
  applicationName: "Harmony Decor",
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

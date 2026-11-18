import type { Metadata } from "next";
import "./globals.css";

// No web fonts: the page uses the system font stack (set as --font-sans in
// globals.css), so no font file arrives late and swaps in after first paint.

export const metadata: Metadata = {
  title: "Nike Pegasus 43 (Black/White-Volt)",
  description: "Phone-first product page for the Nike Pegasus 43, planned at 375 px wide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gautam Gambhir",
  description:
    "Full-Stack Developer, Designer based in New Delhi, India. Building products, AI systems, and experiences that matter.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Gautam Gambhir",
    "Delhi",
    "AI",
    "Frontend Engineer",
  ],
  authors: [{ name: "Gautam Gambhir" }],
  icons: {
    icon: "/avatar2.png",
    apple: "/avatar2.png",
  },
  openGraph: {
    title: "Gautam Gambhir",
    description:
      "Full-Stack Developer, Designer based in New Delhi, India. Building products, AI systems, and experiences that matter.",
    type: "website",
    images: ["/avatar2.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={syne.variable}>
      <body className={syne.className}>{children}</body>
    </html>
  );
}

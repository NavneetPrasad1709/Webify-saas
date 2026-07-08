import type { Metadata } from "next";
import { Inter, Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tranquil-495tmg.peachworlds.com"),
  title: "Vexel AI - Design Meets Intelligence",
  description:
    "Vexel is a futuristic AI-powered website merging spatial design, interactivity, and intelligent systems. Crafted for forward-thinking brands at the edge of innovation.",
  openGraph: {
    title: "Vexel AI - Design Meets Intelligence",
    description:
      "Vexel is a futuristic AI-powered website merging spatial design, interactivity, and intelligent systems. Crafted for forward-thinking brands at the edge of innovation.",
    images: ["/social.png"],
    url: "https://tranquil-495tmg.peachworlds.com/",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

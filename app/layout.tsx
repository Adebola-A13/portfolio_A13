import type { Metadata } from "next";
import { Geist, Hedvig_Letters_Serif } from "next/font/google";
import favicon from "@/images/favicon.png";
import "./globals.css";

const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
  variable: "--font-hedvig",
});

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Ibrahim Adehan, développeur full-stack",
  description:
    "Ibrahim Adehan conçoit et livre des SaaS en Laravel, Next.js et Vue.js depuis Abomey-Calavi, au Bénin.",
  icons: { icon: favicon.src },
  openGraph: {
    title: "Ibrahim Adehan, développeur full-stack",
    description: "Des SaaS en Laravel, Next.js et Vue.js, livrés en production depuis le Bénin.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${hedvig.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}

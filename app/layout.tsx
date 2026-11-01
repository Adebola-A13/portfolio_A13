import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Mono, Geist, Hedvig_Letters_Serif, Host_Grotesk } from "next/font/google";
import favicon from "@/images/favicon.png";

// Console (/) faces
const host = Host_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-host",
});

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  // Next.js has no metric overrides for this face; skip the fallback it cannot build.
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
  variable: "--font-atkinson",
});

// Studio (/studio) faces
const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-hedvig",
});

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
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
    <html
      lang="fr"
      className={`${host.variable} ${atkinsonMono.variable} ${hedvig.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

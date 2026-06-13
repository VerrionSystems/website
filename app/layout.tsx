import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verrion Systems Ltd | AI compliance-native software for GMP quality teams",
  description:
    "Pharma Compliance Suite brings controlled AI into GMP quality workflows with EU-aware data handling, sanitisation before AI support, prompt and model versioning, AI content flags, human review, SOP Intelligence, Deviation Investigator, and an AI regulations compliance matrix.",
  metadataBase: new URL("https://www.verrionsystems.com"),
  openGraph: {
    title: "AI compliance-native software for GMP quality teams | Verrion Systems Ltd",
    description:
      "Pharma Compliance Suite combines Deviation Investigator, SOP Intelligence, sanitisation-first AI support, prompt/model versioning, AI-assisted content flags, human review controls, and a maintained AI regulations compliance matrix.",
    url: "https://www.verrionsystems.com",
    siteName: "Verrion Systems Ltd",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}

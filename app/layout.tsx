import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verrion Systems | Deviation investigation and SOP intelligence for GMP teams",
  description:
    "Pharma Compliance Suite combines Verrion Deviation Investigator and SOP Intelligence to help approved investigators connect evidence, SOP expectations, RCA/CAPA reasoning, review controls, and exportable outputs with sanitisation-first AI support.",
  metadataBase: new URL("https://www.verrionsystems.com"),
  openGraph: {
    title: "Deviation investigation and SOP intelligence for GMP teams | Verrion Systems",
    description:
      "Structured investigation discipline without another broad eQMS: evidence-linked RCA/CAPA support, SOP Intelligence, sanitisation-first AI, human review, audit history, and controlled export/e-signature posture.",
    url: "https://www.verrionsystems.com",
    siteName: "Verrion Systems",
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

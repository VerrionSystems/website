import type { Metadata } from "next";
import { BulletList, LegalPage, Section } from "../legal-content";

export const metadata: Metadata = {
  title: "Privacy Notice | Verrion Systems",
  description: "Minimal privacy notice for Verrion Systems public website and early private pilot enquiries.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" updated="10 June 2026">
      <Section title="Who we are">
        <p>
          Verrion Systems Ltd provides specialist GMP quality software, including Pharma Compliance Suite, Verrion Deviation Investigator, and SOP Intelligence. This notice explains how we handle personal data from public website visitors, demo enquiries, and early pilot discussions.
        </p>
        <p>Contact: <a href="mailto:hello@verrionsystems.com">hello@verrionsystems.com</a>.</p>
      </Section>

      <Section title="What we collect">
        <BulletList
          items={[
            "Contact details you choose to send to us, such as name, email address, organisation, role, and message content.",
            "Information discussed during demo or pilot enquiries, where you provide it voluntarily.",
            "Basic technical information that may be processed by the hosting provider to serve the website and maintain security, such as IP address, browser information, request time, and pages requested.",
          ]}
        />
      </Section>

      <Section title="What we do not want through this website">
        <p>
          Please do not send patient data, live batch records, confidential SOPs, deviation packs, regulated records, or other sensitive GxP material through the public website or ordinary email enquiry route. If a pilot discussion progresses, data handling must be agreed separately before any customer material is provided.
        </p>
      </Section>

      <Section title="How we use personal data">
        <BulletList
          items={[
            "Respond to enquiries and demo requests.",
            "Arrange meetings and follow-up discussions.",
            "Assess whether Verrion software may be relevant to a prospective customer or partner.",
            "Maintain basic business records and protect the website and company systems.",
          ]}
        />
      </Section>

      <Section title="Legal basis">
        <p>
          For UK GDPR purposes, we normally process enquiry and business-contact data on the basis of legitimate interests: responding to business enquiries, operating the website, and developing Verrion Systems. Where a pilot or contract is being discussed, processing may also be necessary to take steps before entering into a contract.
        </p>
      </Section>

      <Section title="Sharing and suppliers">
        <p>
          We use ordinary business service providers, such as website hosting, email, cloud productivity, and security services. These providers may process limited personal data on our behalf. We do not sell personal data.
        </p>
      </Section>

      <Section title="Retention">
        <p>
          We keep enquiry and business-contact data only for as long as needed for the discussion, business relationship, legal obligations, or reasonable record keeping. If you want us to delete an enquiry record, contact us and we will assess the request.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Depending on the circumstances, you may have rights to access, correct, erase, restrict, or object to processing of your personal data. Contact us at hello@verrionsystems.com. You can also complain to the UK Information Commissioner’s Office if you believe your data protection rights have not been respected.
        </p>
      </Section>

      <Section title="Product and pilot data">
        <p>
          This website notice does not replace a customer-specific data processing agreement, pilot terms, supplier assessment, or validation assessment. Those must be agreed separately before any live or customer-approved regulated data is used in a pilot.
        </p>
      </Section>
    </LegalPage>
  );
}

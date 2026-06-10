import type { Metadata } from "next";
import { BulletList, LegalPage, Section } from "../legal-content";

export const metadata: Metadata = {
  title: "Terms of Use | Verrion Systems",
  description: "Minimal terms for using the Verrion Systems public website and requesting private demos or pilot information.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="10 June 2026">
      <Section title="Scope">
        <p>
          These terms apply to the public Verrion Systems website and to general enquiries made through it. They do not govern a paid pilot, production subscription, software licence, data processing arrangement, validation package, or support commitment. Those require separate written terms.
        </p>
      </Section>

      <Section title="Website information">
        <p>
          The website describes Verrion Systems products and intended pilot posture at a high level. It is provided for general business information only. Product features, controls, hosting arrangements, pilot scope, pricing, and availability may change as the product develops and as customer requirements are assessed.
        </p>
      </Section>

      <Section title="No regulated-use advice">
        <p>
          Verrion Systems does not provide medical, legal, regulatory, quality, validation, or compliance advice through this website. Any regulated use of Verrion software remains subject to the customer’s own governance, supplier qualification, risk assessment, intended-use assessment, validation, data protection review, and procedural controls.
        </p>
      </Section>

      <Section title="No automatic compliance claim">
        <p>
          References to audit trail, e-signature posture, sanitisation-first workflow, review controls, validation-readiness, or data integrity expectations describe product design intent and pilot discussion areas. They are not a claim that a customer’s use is validated, Part 11 compliant, Annex 11 compliant, inspection-approved, or suitable for production GxP use by default.
        </p>
      </Section>

      <Section title="Enquiries and demo requests">
        <p>
          If you request a demo or pilot information, Verrion Systems may respond by email and may ask for further context to assess fit. A demo request does not create a contract, support obligation, exclusivity arrangement, or commitment to provide software access.
        </p>
      </Section>

      <Section title="Do not send sensitive material by public enquiry">
        <BulletList
          items={[
            "Do not send patient data, confidential SOPs, live deviation records, batch records, customer proprietary records, or other sensitive GxP material through public website enquiries.",
            "Use synthetic examples for initial discussions unless a separate written data handling route has been agreed.",
            "Customer-approved regulated material must only be used under agreed pilot, confidentiality, security, and data processing arrangements.",
          ]}
        />
      </Section>

      <Section title="Intellectual property">
        <p>
          The website, product names, text, design, and product concepts are owned by or licensed to Verrion Systems Ltd unless otherwise stated. You may view the website for normal business evaluation. You may not copy, reverse engineer, republish, or present Verrion materials as your own.
        </p>
      </Section>

      <Section title="Availability and liability">
        <p>
          The website is provided on an as-is basis and may be changed, withdrawn, or unavailable without notice. To the fullest extent permitted by law, Verrion Systems is not liable for decisions made solely on the basis of public website content.
        </p>
      </Section>

      <Section title="Contact">
        <p>Questions about these terms can be sent to <a href="mailto:hello@verrionsystems.com">hello@verrionsystems.com</a>.</p>
      </Section>
    </LegalPage>
  );
}

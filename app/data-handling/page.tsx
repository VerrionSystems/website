import type { Metadata } from "next";
import { contactHref } from "../contact-links";
import { BulletList, LegalPage, Section } from "../legal-content";

export const metadata: Metadata = {
  title: "Data Handling | Verrion Systems Ltd",
  description: "Data handling summary for Verrion Systems Ltd private demos and early hosted pilot discussions.",
};

export default function DataHandlingPage() {
  return (
    <LegalPage title="Data Handling Summary" updated="10 June 2026">
      <Section title="Purpose of this summary">
        <p>
          This page gives a plain-English summary of the intended data handling posture for Verrion Systems Ltd demos and early hosted pilot discussions. It is not a substitute for a customer-specific data processing agreement, security review, supplier qualification, or validation assessment.
        </p>
      </Section>

      <Section title="Private demos">
        <BulletList
          items={[
            "Initial demos should use synthetic or non-confidential example material.",
            "Prospective customers should not send live deviation packs, patient data, confidential SOPs, batch records, or proprietary regulated records through ordinary email or public website enquiries.",
            "If a deeper evaluation requires customer-approved material, the scope and data route should be agreed first.",
          ]}
        />
      </Section>

      <Section title="Hosted pilot posture">
        <p>
          Hosted pilots are intended to be fixed-scope, controlled evaluations. The expected posture is sanitisation-first AI support, limited users, defined cases, guided onboarding, export/deletion options at pilot end, and customer review before any output is relied on.
        </p>
      </Section>

      <Section title="AI support and sanitisation">
        <BulletList
          items={[
            "AI support is used as decision support, not as automatic root-cause determination or CAPA approval.",
            "Customer users remain responsible for reviewing, accepting, editing, or rejecting AI-supported suggestions.",
            "Hosted pilots are designed around sanitisation before AI support so direct identifiers and sensitive operational references can be reduced before model processing.",
            "The exact pilot configuration, permitted data, and residual risk must be agreed with the customer before live or customer-approved material is used.",
          ]}
        />
      </Section>

      <Section title="Hosting and suppliers">
        <p>
          The intended hosted pilot architecture uses cloud hosting and AWS Bedrock in eu-west-2 for AI analysis. Any customer pilot should confirm the applicable hosting region, subprocessors, access controls, data retention, backup, support, export, deletion, and incident-handling expectations before use.
        </p>
      </Section>

      <Section title="Access control and review">
        <BulletList
          items={[
            "Access should be limited to agreed pilot users.",
            "Outputs should remain reviewable, editable, and rejectable by authorised customer users.",
            "Audit trail and e-signature posture support review and validation assessment but do not replace customer validation responsibilities.",
          ]}
        />
      </Section>

      <Section title="Customer validation responsibility">
        <p>
          Verrion Systems software can support structured investigation, SOP alignment, review, and evidence handling. The customer remains responsible for determining intended use and completing any required GxP validation, supplier qualification, procedural controls, data protection review, training, and release governance before production use.
        </p>
      </Section>

      <Section title="Pilot end">
        <p>
          Pilot exit should include a clear decision on export, deletion, retention, or transition to another agreed arrangement. The specific timing and evidence needed should be agreed in the pilot terms.
        </p>
      </Section>

      <Section title="Contact">
        <p>Data handling questions can be sent to <a href={contactHref("Data handling question")}>hello@verrionsystems.com</a>.</p>
      </Section>
    </LegalPage>
  );
}

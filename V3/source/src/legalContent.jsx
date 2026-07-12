const safeEmailBody =
  "Please%20do%20not%20include%20patient%20data%2C%20live%20batch%20records%2C%20confidential%20SOPs%2C%20deviation%20packs%2C%20or%20other%20regulated%20GxP%20material%20in%20this%20email.";

const contactHref = (subject) =>
  `mailto:hello@verrionsystems.com?subject=${encodeURIComponent(subject)}&body=${safeEmailBody}`;

const contactLink = (subject) => (
  <a href={contactHref(subject)}>hello@verrionsystems.com</a>
);

export const legalPages = {
  privacy: {
    id: "privacy",
    label: "Public information",
    title: "Privacy Notice",
    updated: "12 July 2026",
    intro:
      "How Verrion Systems Ltd handles personal data from public website visitors, business enquiries and early pilot discussions.",
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        content: (
          <>
            <p>Verrion Systems Ltd develops software for pharmaceutical quality, validation and accountable AI use. Our portfolio includes Pharma Compliance Suite, with Verrion Systems Validate and Verrion Systems AI Control Room in development.</p>
            <p>Questions about this notice can be sent to {contactLink("Privacy question")}.</p>
          </>
        ),
      },
      {
        id: "what-we-collect",
        title: "What we collect",
        content: (
          <ul>
            <li>Contact details you choose to send, such as your name, email address, organisation, role and message.</li>
            <li>Information you provide voluntarily during a walkthrough, demo or pilot enquiry.</li>
            <li>Basic technical information processed by the hosting provider to serve and protect the website, such as IP address, browser information, request time and pages requested.</li>
          </ul>
        ),
      },
      {
        id: "cookies-and-analytics",
        title: "Cookies and analytics",
        content: (
          <p>The current public website does not intentionally use analytics, advertising or marketing cookies. The hosting provider may still process ordinary request and security logs needed to deliver and protect the website.</p>
        ),
      },
      {
        id: "sensitive-material",
        title: "What we do not want through this website",
        content: (
          <p>Please do not send patient data, live batch records, confidential SOPs, deviation packs, regulated records or other sensitive GxP material through the public website or ordinary email enquiry route. Data handling must be agreed separately before customer-approved material is provided for a pilot.</p>
        ),
      },
      {
        id: "how-we-use-data",
        title: "How we use personal data",
        content: (
          <ul>
            <li>Respond to enquiries and arrange follow-up discussions.</li>
            <li>Assess whether Verrion Systems software may be relevant to a prospective customer or partner.</li>
            <li>Maintain necessary business records and protect the website and company systems.</li>
          </ul>
        ),
      },
      {
        id: "legal-basis",
        title: "Legal basis",
        content: (
          <p>For UK GDPR purposes, we normally process enquiry and business-contact data on the basis of legitimate interests: responding to business enquiries, operating the website and developing Verrion Systems Ltd. Where a pilot or contract is being discussed, processing may also be necessary to take steps before entering into a contract.</p>
        ),
      },
      {
        id: "sharing-and-suppliers",
        title: "Sharing and suppliers",
        content: (
          <p>We use ordinary business service providers for website hosting, email, cloud productivity and security. These providers may process limited personal data on our behalf. We do not sell personal data.</p>
        ),
      },
      {
        id: "retention",
        title: "Retention",
        content: (
          <p>We keep enquiry and business-contact data only for as long as needed for the discussion, business relationship, legal obligations or reasonable record keeping. Contact us if you want us to assess a deletion request.</p>
        ),
      },
      {
        id: "your-rights",
        title: "Your rights",
        content: (
          <p>Depending on the circumstances, you may have rights to access, correct, erase, restrict or object to processing of your personal data. Contact {contactLink("Privacy rights request")}. You can also complain to the UK Information Commissioner's Office if you believe your data protection rights have not been respected.</p>
        ),
      },
      {
        id: "product-and-pilot-data",
        title: "Product and pilot data",
        content: (
          <p>This website notice does not replace a customer-specific data processing agreement, pilot terms, supplier assessment or validation assessment. Those arrangements must be agreed separately before live or customer-approved regulated data is used.</p>
        ),
      },
    ],
  },
  terms: {
    id: "terms",
    label: "Public information",
    title: "Terms of Use",
    updated: "12 July 2026",
    intro:
      "Terms applying to the public Verrion Systems website and general business enquiries made through it.",
    sections: [
      {
        id: "scope",
        title: "Scope",
        content: (
          <p>These terms apply to the public Verrion Systems Ltd website and general enquiries made through it. They do not govern a paid pilot, production subscription, software licence, data processing arrangement, validation package or support commitment. Those require separate written terms.</p>
        ),
      },
      {
        id: "website-information",
        title: "Website information",
        content: (
          <p>The website describes Verrion Systems products, planned product families and intended pilot posture at a high level. It is provided for general business information only. Features, controls, hosting arrangements, scope, pricing and availability may change as products develop and customer requirements are assessed.</p>
        ),
      },
      {
        id: "no-regulated-advice",
        title: "No regulated-use advice",
        content: (
          <p>Verrion Systems Ltd does not provide medical, legal, regulatory, quality, validation or compliance advice through this website. Any regulated use remains subject to the customer's own governance, supplier qualification, risk assessment, intended-use assessment, validation, data protection review and procedural controls.</p>
        ),
      },
      {
        id: "no-automatic-compliance",
        title: "No automatic compliance claim",
        content: (
          <p>References to audit trails, e-signature posture, sanitisation-first workflows, review controls, validation readiness or data integrity expectations describe product design intent and pilot discussion areas. They are not a claim that a customer's use is validated, Part 11 compliant, Annex 11 compliant, inspection approved or suitable for production GxP use by default.</p>
        ),
      },
      {
        id: "enquiries",
        title: "Enquiries and walkthrough requests",
        content: (
          <p>If you request a walkthrough or pilot information, Verrion Systems Ltd may respond by email and ask for further context to assess fit. An enquiry does not create a contract, support obligation, exclusivity arrangement or commitment to provide software access.</p>
        ),
      },
      {
        id: "sensitive-material",
        title: "Do not send sensitive material by public enquiry",
        content: (
          <ul>
            <li>Do not send patient data, confidential SOPs, live deviation records, batch records, proprietary customer records or other sensitive GxP material.</li>
            <li>Use synthetic examples for initial discussions unless a separate written data handling route has been agreed.</li>
            <li>Customer-approved regulated material must only be used under agreed pilot, confidentiality, security and data processing arrangements.</li>
          </ul>
        ),
      },
      {
        id: "intellectual-property",
        title: "Intellectual property",
        content: (
          <p>The website, product names, text, design and product concepts are owned by or licensed to Verrion Systems Ltd unless otherwise stated. You may view the website for normal business evaluation. You may not copy, reverse engineer, republish or present Verrion Systems materials as your own.</p>
        ),
      },
      {
        id: "availability-and-liability",
        title: "Availability and liability",
        content: (
          <p>The website is provided on an as-is basis and may be changed, withdrawn or unavailable without notice. To the fullest extent permitted by law, Verrion Systems Ltd is not liable for decisions made solely on the basis of public website content.</p>
        ),
      },
      {
        id: "contact",
        title: "Contact",
        content: <p>Questions about these terms can be sent to {contactLink("Terms question")}.</p>,
      },
    ],
  },
  "data-handling": {
    id: "data-handling",
    label: "Public information",
    title: "Data Handling Summary",
    updated: "12 July 2026",
    intro:
      "A plain-English summary of the intended data handling posture for Verrion Systems walkthroughs and controlled pilot discussions.",
    sections: [
      {
        id: "purpose",
        title: "Purpose of this summary",
        content: (
          <p>This summary describes the intended data handling posture for Verrion Systems Ltd walkthroughs and early hosted pilots. It is not a substitute for a customer-specific data processing agreement, security review, supplier qualification or validation assessment.</p>
        ),
      },
      {
        id: "private-walkthroughs",
        title: "Private walkthroughs",
        content: (
          <ul>
            <li>Initial walkthroughs should use synthetic or non-confidential example material.</li>
            <li>Do not send live deviation packs, patient data, confidential SOPs, batch records or proprietary regulated records through ordinary email or public website enquiries.</li>
            <li>If a deeper evaluation requires customer-approved material, agree the scope and data route first.</li>
          </ul>
        ),
      },
      {
        id: "hosted-pilot-posture",
        title: "Hosted pilot posture",
        content: (
          <p>Hosted pilots are intended to be fixed-scope, controlled evaluations with limited users, defined scenarios, guided onboarding, agreed review responsibilities and an explicit export, deletion or retention path at pilot end.</p>
        ),
      },
      {
        id: "ai-support-and-sanitisation",
        title: "AI support and sanitisation",
        content: (
          <ul>
            <li>AI support is decision support, not automatic root-cause determination, CAPA approval or quality disposition.</li>
            <li>Customer users remain responsible for reviewing, accepting, editing or rejecting AI-supported suggestions.</li>
            <li>Hosted pilot design uses sanitisation before AI support so direct identifiers and sensitive operational references can be reduced before model processing.</li>
            <li>The exact configuration, permitted data and residual risk must be agreed before customer-approved material is used.</li>
          </ul>
        ),
      },
      {
        id: "hosting-and-suppliers",
        title: "Hosting and suppliers",
        content: (
          <p>The configured and intended Pharma Compliance Suite AI route uses AWS Bedrock in <code>eu-west-2</code>. Each customer pilot must separately confirm its applicable hosting region, model route, subprocessors, access controls, retention, backup, support, export, deletion and incident-handling expectations. This public summary is not deployment evidence for a particular environment.</p>
        ),
      },
      {
        id: "access-control-and-review",
        title: "Access control and review",
        content: (
          <ul>
            <li>Access should be limited to agreed pilot users.</li>
            <li>Outputs should remain reviewable, editable and rejectable by authorised customer users.</li>
            <li>Audit trail and e-signature posture support review and validation assessment but do not replace customer validation responsibilities.</li>
          </ul>
        ),
      },
      {
        id: "customer-responsibility",
        title: "Customer validation responsibility",
        content: (
          <p>Verrion Systems software can support structured quality work and evidence handling. The customer remains responsible for intended use, required GxP validation, supplier qualification, procedural controls, data protection review, training and release governance before production use.</p>
        ),
      },
      {
        id: "pilot-end",
        title: "Pilot end",
        content: (
          <p>Pilot exit should include a clear decision on export, deletion, retention or transition to another agreed arrangement. Timing and required evidence should be recorded in the pilot terms.</p>
        ),
      },
      {
        id: "contact",
        title: "Contact",
        content: <p>Data handling questions can be sent to {contactLink("Data handling question")}.</p>,
      },
    ],
  },
};

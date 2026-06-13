const safeEmailBody =
  "Please do not include patient data, live batch records, confidential SOPs, deviation packs, or other regulated GxP material in this email.";

export function contactHref(subject = "Website enquiry - Verrion Systems") {
  const params = new URLSearchParams({
    subject,
    body: safeEmailBody,
  });

  return `mailto:hello@verrionsystems.com?${params.toString()}`;
}

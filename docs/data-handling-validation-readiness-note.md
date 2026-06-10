# Data Handling and Validation-Readiness Note

## Scope

This note describes the intended posture for Verrion Deviation Investigator in private pilots. It is written for buyer discussions and should not be treated as a final validation package, contractual commitment, or regulatory claim.

## Data handling posture for hosted pilots

- Hosted pilots use a sanitisation-first workflow before AI support.
- Detected people, batches, suppliers, sites, and internal references are reviewed before investigation context is used for AI support.
- AI analysis is routed through AWS Bedrock in eu-west-2 for hosted pilots.
- Customers can use synthetic or customer-approved deviation packs.
- End-of-pilot export or deletion path is defined during pilot setup.

## AI posture

- AI is used as decision support, not as the QA decision-maker.
- Suggestions remain human-reviewed, editable, and rejectable.
- Accept/edit/reject decisions are intended to be visible in the investigation record.
- AI output should not be treated as approved quality judgement until reviewed by accountable customer personnel.

## Validation-readiness posture

Verrion is designed with awareness of:

- GMP quality workflows;
- data integrity expectations;
- audit trails;
- electronic record/e-signature posture;
- controlled review and approval expectations;
- intended-use validation needs.

This is not a claim that the customer’s use is validated by default.

## Customer responsibility

Customers remain responsible for assessing, qualifying, and validating any system for their own intended GxP use before production deployment.

For pilot use, the recommended scope is evaluation of workflow fit, investigation quality, user acceptance, data handling, and validation-readiness questions before any production decision.

## Deliberate non-claims

Verrion should not claim in external copy that it is fully validated, Part 11 compliant, Annex 11 compliant, or suitable as the customer’s production system of record unless and until that has been formally established for the intended use and deployment model.

export const productFamilies = [
  {
    id: "pharma-compliance-suite",
    name: "Pharma Compliance Suite",
    shortName: "PCS",
    status: "Private pilots",
    statusTone: "pilot",
    icon: "shieldCheck",
    summary:
      "Investigation, SOP and AI decision-support tools built on controlled evidence and human approval.",
    detail:
      "Pharma Compliance Suite brings quality context, AI-supported analysis and human review into one inspectable record. Each module has a clear role and can be introduced in a focused private pilot.",
    available: true,
    modules: [
      {
        id: "deviation-companion",
        name: "Deviation Companion",
        pagePath: "./deviation-companion.html",
        icon: "clipboardPen",
        audience: "For QA intake teams, Investigators and process owners",
        headline: "Cleaner deviation intake before formal investigation.",
        summary: "Guided intake, approved Q&A and evidence capture.",
        outcome: "Faster, cleaner intake",
        status: "Private pilots",
        detail:
          "A guided front door for capturing the event, approved responses and supporting evidence before formal investigation begins.",
        supports: [
          "Approved question-set Q&A and structured event intake",
          "Evidence capture with revision and audit history",
          "Sanitised completeness, gap and challenge review",
          "Optional draft-only narrative for investigator handoff",
        ],
        boundary:
          "Deviation Companion prepares a draft package for Deviation Investigator. Formal RCA/CAPA, QA submission, qualified review, final approval and report generation remain in Deviation Investigator.",
        pageValue:
          "Give Investigators a cleaner starting point without turning early intake into an unreviewed conclusion.",
        record: {
          code: "DIC-0118",
          label: "Guided intake record",
          title: "Fill-weight excursion intake",
          state: "Ready for handoff",
          prompt: "Three required context fields were completed before investigator handoff.",
          checks: [
            "Approved question set complete",
            "Evidence pack linked",
            "Equipment log added after review",
            "Draft package ready for handoff",
          ],
        },
        journey: [
          ["Capture", "Record the event with approved questions."],
          ["Complete", "Add evidence and resolve missing context."],
          ["Hand off", "Prepare a controlled draft for investigation."],
        ],
      },
      {
        id: "deviation-investigator",
        name: "Deviation Investigator",
        pagePath: "./deviation.html",
        icon: "fileSearch",
        audience: "For QA Leaders, QPs and Deviation Investigators",
        headline: "Deviation investigations that can withstand review.",
        summary: "Controlled analysis, RCA/CAPA review and approval.",
        outcome: "Higher quality decisions",
        status: "Private pilots",
        detail:
          "A structured investigation workspace that keeps event facts, evidence, SOP expectations, impact, RCA/CAPA reasoning and reviewer decisions together.",
        supports: [
          "Evidence-led investigation framing",
          "SOP and regulatory context alongside the event",
          "AI-supported gap and reasoning challenge",
          "Human correction, review, approval and report record",
        ],
        boundary:
          "AI is used for decision support. Quality judgement, approval and disposition remain with authorised human reviewers.",
        pageValue:
          "Keep the evidence, challenge and final quality judgement connected from event framing through disposition.",
        record: {
          code: "DEV-0247",
          label: "Investigation readiness record",
          title: "Fill-weight alert limit breach",
          state: "Under human review",
          prompt: "Is the proposed CAPA linked to the failure mode supported by the evidence?",
          checks: [
            "Event facts separated from conclusions",
            "SOP context linked to the record",
            "Impact and RCA gaps flagged",
            "Reviewer decision remains required",
          ],
        },
        journey: [
          ["Frame", "Separate facts, evidence and draft conclusions."],
          ["Challenge", "Surface gaps in impact and RCA/CAPA reasoning."],
          ["Review", "Correct, approve and retain the decision record."],
        ],
      },
      {
        id: "sop-intelligence",
        name: "SOP Intelligence",
        pagePath: "./sop-intelligence.html",
        icon: "bookOpenCheck",
        audience: "For QPs, SOP Owners and quality systems leaders",
        headline: "Make SOP expectations visible before quality reasoning drifts.",
        summary: "Clause-linked expectations and gap analysis.",
        outcome: "Clearer requirements",
        status: "Private pilots",
        detail:
          "A review workspace for turning procedures into visible, clause-linked expectations that can be compared, challenged and used during quality work.",
        supports: [
          "STPA and compliance checks",
          "Document comparison and policy compliance review",
          "Audit gap analysis",
          "SOP simplification with source-linked review",
        ],
        boundary:
          "Analyses support interpretation and review. SOP ownership, change control and approval remain with the customer's authorised process.",
        pageValue:
          "Turn procedures into reviewable expectations while keeping interpretation, change control and approval with authorised owners.",
        record: {
          code: "SOP-QA-014",
          label: "Procedure expectation review",
          title: "Line clearance and trend review",
          state: "Owner review",
          prompt: "Which controls, evidence expectations and escalation gaps need owner review?",
          checks: [
            "Critical controls linked to clauses",
            "Expected evidence made visible",
            "Ambiguities and gaps surfaced",
            "Owner corrections retained",
          ],
        },
        journey: [
          ["Select", "Choose the source and analysis purpose."],
          ["Inspect", "Review clause-linked findings and gaps."],
          ["Decide", "Correct, comment and record owner disposition."],
        ],
      },
    ],
  },
  {
    id: "verrion-systems-validate",
    name: "Verrion Systems Validate",
    shortName: "Validate",
    status: "In development",
    statusTone: "development",
    icon: "badgeCheck",
    summary: "Validation portfolio and evidence workflows.",
    detail:
      "A planned product family for organising validation scope, evidence and review across a controlled portfolio. Product boundaries and availability will be published as development progresses.",
    available: false,
    modules: [],
  },
  {
    id: "verrion-systems-ai-control-room",
    name: "Verrion Systems AI Control Room",
    shortName: "AI Control Room",
    status: "In development",
    statusTone: "development",
    icon: "scanSearch",
    summary: "Evidence layer for controlled AI use.",
    detail:
      "A planned product family for making AI use, context, controls and human decisions easier to inspect across regulated work. Product boundaries and availability will be published as development progresses.",
    available: false,
    modules: [],
  },
];

export const liveModules = productFamilies[0].modules;

export function findCatalogueItem(id) {
  for (const family of productFamilies) {
    if (family.id === id) {
      return { kind: "family", family, item: family };
    }

    const module = family.modules.find((candidate) => candidate.id === id);
    if (module) {
      return { kind: "module", family, item: module };
    }
  }

  return null;
}

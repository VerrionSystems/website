export const productFamilies = [
  {
    id: "pharma-compliance-suite",
    name: "Pharma Compliance Suite",
    shortName: "PCS",
    status: "Private pilots",
    statusTone: "pilot",
    icon: "shieldCheck",
    summary:
      "Investigation, CAPA, SOP and AI decision-support tools built on controlled evidence and human approval.",
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
          "Deviation Companion prepares a draft package for Deviation Investigator. Formal RCA, QA submission, qualified review, final approval and report remain in Deviation Investigator. Corrective and preventive action lifecycle belongs in CAPA.",
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
        summary: "Controlled analysis, RCA and human approval.",
        outcome: "Higher quality decisions",
        status: "Private pilots",
        detail:
          "A structured investigation workspace that keeps event facts, evidence, SOP expectations, impact, RCA reasoning and reviewer decisions together.",
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
          prompt: "Is the proposed root cause supported by the evidence?",
          checks: [
            "Event facts separated from conclusions",
            "SOP context linked to the record",
            "Impact and RCA gaps flagged",
            "Reviewer decision remains required",
          ],
        },
        journey: [
          ["Frame", "Separate facts, evidence and draft conclusions."],
          ["Challenge", "Surface gaps in impact and RCA reasoning."],
          ["Review", "Correct, approve and retain the decision record."],
        ],
      },
      {
        id: "capa",
        name: "CAPA",
        pagePath: "./capa.html",
        icon: "listChecks",
        audience: "For QA Leaders, QPs, CAPA owners and action owners",
        headline: "Corrective and preventive actions that can be closed.",
        summary: "Source-linked CA/PA lifecycle, not a second investigation.",
        outcome: "Actions that finish",
        status: "Private pilots",
        detail:
          "A controlled register for corrective and preventive actions. Each case starts from a traceable source, holds separately classified CA/PA statements, and follows assignment, implementation evidence, effectiveness review and closure.",
        supports: [
          "Standalone intake or a signed handoff from Deviation Investigator",
          "Source-linked corrective and preventive actions with owners and due dates",
          "Implementation evidence, effectiveness checks and independent approval",
          "Optional wording support that remains advisory",
        ],
        boundary:
          "CAPA manages the action lifecycle. Investigation, RCA and event disposition remain in Deviation Investigator or the customer's authorised process. AI wording support does not create, approve or close a CAPA.",
        pageValue:
          "Keep the source, the actions and the evidence of effectiveness in one inspectable case.",
        record: {
          code: "CAPA-2026-0142",
          label: "Action lifecycle record",
          title: "Fill-weight control CAPA",
          state: "Effectiveness review",
          prompt: "Is the implementation evidence sufficient to close the preventive action?",
          checks: [
            "Source linked to the investigation record",
            "Corrective action verified",
            "Preventive action owner assigned",
            "Effectiveness check still open",
          ],
        },
        journey: [
          ["Source", "Bind the case to a traceable origin."],
          ["Act", "Assign CA/PA, collect implementation evidence."],
          ["Close", "Review effectiveness and retain the decision."],
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
  }
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

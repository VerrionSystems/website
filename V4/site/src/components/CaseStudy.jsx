import { useRef, useState } from 'react';
import { ArrowUpRight, Minus, Plus } from '@phosphor-icons/react';
import { workflowModules, exampleRecords } from '../content.js';

export function CaseStudy() {
  const [selected, setSelected] = useState('companion');
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const tabRefs = useRef({});
  const record = exampleRecords[selected];

  function selectRecord(id, focusTab = false) {
    if (!workflowModules.some(module => module.id === id)) return;
    // Move focus before replacing any controls in the current record.
    if (focusTab) tabRefs.current[id]?.focus();
    setSelected(id);
    setEvidenceOpen(false);
  }

  function handleTabKey(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % workflowModules.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + workflowModules.length) % workflowModules.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = workflowModules.length - 1;
    else return;

    event.preventDefault();
    selectRecord(workflowModules[next].id, true);
  }

  return (
    <section id="case-study" className="hp-case shell" aria-labelledby="hp-case-title">
      <div className="hp-case-intro">
        <p className="hp-eyebrow">An illustrative example</p>
        <h2 id="hp-case-title">A fill-weight variation under review.</h2>
        <p>Explore the records used to establish the facts, investigate the cause and decide what happens next.</p>
      </div>

      <div className="hp-case-tabs" role="tablist" aria-label="Explore the illustrative records" aria-orientation="horizontal">
        {workflowModules.map((module, index) => (
          <button
            key={module.id}
            ref={element => { tabRefs.current[module.id] = element; }}
            id={`hp-case-tab-${module.id}`}
            className="hp-case-tab"
            type="button"
            role="tab"
            aria-selected={selected === module.id}
            aria-controls="hp-case-panel"
            tabIndex={selected === module.id ? 0 : -1}
            onKeyDown={event => handleTabKey(event, index)}
            onClick={() => selectRecord(module.id, true)}
          >
            <span className="hp-case-number" aria-hidden="true">{module.number}</span>
            <span>{exampleRecords[module.id].label}</span>
          </button>
        ))}
      </div>

      <div id="hp-case-panel" className="hp-case-panel" role="tabpanel" aria-labelledby={`hp-case-tab-${selected}`} tabIndex={0}>
        <div className="hp-case-content" key={selected}>
          <div className="hp-case-main">
            <p className="hp-eyebrow">{record.reference}</p>
            <h3>{record.title}</h3>
            <p>{record.summary}</p>
            <div className="hp-case-question">
              <p className="hp-eyebrow">The question to resolve</p>
              <p>{record.question}</p>
            </div>
          </div>

          <aside className="hp-case-decision" aria-label="Decision and evidence">
            <p className="hp-eyebrow">Who makes the decision</p>
            <p>{record.decision}</p>
            <button
              className="hp-case-evidence-toggle"
              type="button"
              aria-expanded={evidenceOpen}
              aria-controls="hp-case-evidence"
              onClick={() => setEvidenceOpen(open => !open)}
            >
              Evidence to review
              {evidenceOpen ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
            </button>
            <ul id="hp-case-evidence" className="hp-case-evidence" hidden={!evidenceOpen}>
              {record.evidence.map(item => <li key={item}>{item}</li>)}
            </ul>
          </aside>
        </div>

        <div className="hp-case-related">
          <span className="hp-eyebrow">Related records</span>
          {record.related.map(id => (
            <button key={id} type="button" onClick={() => selectRecord(id, true)}>
              {exampleRecords[id].label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <p className="hp-case-note hp-note">A synthetic scenario, shown to explain the work. Records have distinct responsibilities and approvals; they are not a compulsory sequence.</p>
    </section>
  );
}

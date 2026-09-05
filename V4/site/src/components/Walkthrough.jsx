import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, X } from '@phosphor-icons/react';
import { walkthroughInterests } from '../content.js';

const email = 'hello@verrionsystems.com';

export function Walkthrough({ dialogRef, interest, onInterestChange, onRestoreFocus }) {
  const [copyStatus, setCopyStatus] = useState('idle');
  const copyAttempt = useRef(0);
  const selectedInterest = walkthroughInterests.includes(interest) ? interest : walkthroughInterests[0];
  const subject = `PCS walkthrough — ${selectedInterest}`;
  const body = `Hello Verrion Systems,\n\nI would like to arrange a walkthrough focused on ${selectedInterest}.\n\nPlease do not include regulated or confidential material in this email.`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  async function copyEmail() {
    const attempt = ++copyAttempt.current;
    setCopyStatus('idle');
    try {
      await navigator.clipboard.writeText(email);
      if (attempt === copyAttempt.current && dialogRef.current?.open) setCopyStatus('copied');
    } catch {
      if (attempt === copyAttempt.current && dialogRef.current?.open) setCopyStatus('error');
    }
  }

  function handleClose() {
    copyAttempt.current += 1;
    setCopyStatus('idle');
    onRestoreFocus?.();
  }

  return (
    <dialog ref={dialogRef} className="hp-dialog" aria-labelledby="hp-walkthrough-title" aria-describedby="hp-walkthrough-intro" onClose={handleClose}>
      <button className="hp-dialog-close" type="button" aria-label="Close walkthrough request" onClick={() => dialogRef.current?.close()} autoFocus>
        <X size={25} aria-hidden="true" />
      </button>

      <p className="hp-eyebrow">Let’s look at your work</p>
      <h2 id="hp-walkthrough-title">A conversation about your quality workflow.</h2>
      <p id="hp-walkthrough-intro">Choose the workflow you would like to explore. We’ll talk through the work, responsibilities and records with you.</p>

      <div className="hp-field">
        <label htmlFor="hp-walkthrough-interest">I’m interested in</label>
        <select id="hp-walkthrough-interest" value={selectedInterest} onChange={event => onInterestChange(event.target.value)}>
          {walkthroughInterests.map(workflow => <option key={workflow} value={workflow}>{workflow}</option>)}
        </select>
      </div>

      <a className="hp-button" href={mailto}>
        Open email draft <ArrowUpRight size={21} aria-hidden="true" />
      </a>
      <p className="hp-note">This opens your email app. Nothing is sent from this website. Please leave regulated or confidential material out of your first message.</p>

      <div className="hp-email">
        <a href={`mailto:${email}`}>{email}</a>
        <button className="hp-copy" type="button" aria-label="Copy email address" onClick={copyEmail}>
          {copyStatus === 'copied' ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
          <span>{copyStatus === 'copied' ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <p className="hp-copy-status hp-note" role="status">
        {copyStatus === 'copied' ? 'Email address copied.' : copyStatus === 'error' ? 'Copying is unavailable. Select and copy the email address above.' : ''}
      </p>
    </dialog>
  );
}

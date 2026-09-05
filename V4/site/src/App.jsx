import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ArrowUp, Plus, Minus, List, X } from '@phosphor-icons/react';
import { workflowModules, procedureModule, walkthroughInterests, questions } from './content.js';
import { CaseStudy } from './components/CaseStudy.jsx';
import { Walkthrough } from './components/Walkthrough.jsx';
import { resolveLegacyLocation, canonicalLegacyUrl, moduleAtLocation } from './legacyLinks.js';

const Arrow = () => <ArrowUpRight size={21} weight="regular" aria-hidden="true"/>;

function ModuleFacts({module}) {
  return <dl className="hp-module-facts">
    <div><dt>Starts with</dt><dd>{module.input}</dd></div>
    <div><dt>Owned by</dt><dd>{module.owner}</dd></div>
    <div><dt>Produces</dt><dd>{module.output}</dd></div>
  </dl>;
}

function DeviationWorkflow({onContact,moduleRequest}) {
  const [open,setOpen]=useState(()=>moduleAtLocation(window.location)||'companion');
  useEffect(()=>{if(moduleRequest?.id)setOpen(moduleRequest.id);},[moduleRequest]);
  return <section className="hp-workflow" id="deviation-workflow" aria-labelledby="hp-workflow-title"><div className="shell hp-workflow-layout">
    <div className="hp-workflow-intro">
      <p className="hp-eyebrow">Deviation/CAPA workflow</p>
      <h2 id="hp-workflow-title">For the work <br/>that follows <br/>a deviation.</h2>
      <p>From the first facts to the decisions and actions that follow. Each workspace has a clear role, with the evidence and responsible people in view.</p>
      <a className="hp-link hp-link-light" href="#case-study">Follow an illustrative case <Arrow/></a>
    </div>
    <div className="hp-modules">{workflowModules.map(module=><article id={`hp-stage-${module.id}`} className={`hp-module ${open===module.id?'is-open':''}`} key={module.id}>
      <h3><button className="hp-module-trigger" aria-expanded={open===module.id} aria-controls={`hp-module-${module.id}`} onClick={()=>setOpen(open===module.id?null:module.id)}>
        <span className="hp-module-number" aria-hidden="true">{module.number}</span>
        <span className="hp-module-label"><span>{module.job}</span><small>{module.name}</small></span>
        {open===module.id?<Minus size={23} weight="light" aria-hidden="true"/>:<Plus size={23} weight="light" aria-hidden="true"/>}
      </button></h3>
      <div className="hp-module-detail" id={`hp-module-${module.id}`} hidden={open!==module.id}>
        <p className="hp-module-description">{module.description}</p>
        <ModuleFacts module={module}/>
        <p className="hp-module-boundary">{module.boundary}</p>
      </div>
    </article>)}<div className="hp-workflow-footer"><p>Scope and availability are agreed for each pilot.</p><button className="hp-link hp-link-light" onClick={event=>onContact(event,walkthroughInterests[0])}>Discuss this workflow <Arrow/></button></div></div>
  </div></section>;
}

function SopWorkflow({onContact}) {
  const [open,setOpen]=useState(false);
  return <section className="hp-sop" id="sop-workflow" aria-labelledby="hp-sop-title"><div className="shell hp-sop-layout">
    <div className="hp-sop-intro"><p className="hp-eyebrow">SOP workflow</p><h2 id="hp-sop-title">A closer look<br/>at the procedure.</h2><p>Its own work. <br/>Its own workspace.</p></div>
    <div className="hp-sop-content"><p className="hp-product-name">SOP Intelligence</p><h3>{procedureModule.title}</h3><p>{procedureModule.description}</p>
      <button className="hp-sop-trigger" aria-expanded={open} aria-controls="hp-sop-detail" onClick={()=>setOpen(!open)}>Explore the SOP workflow {open?<Minus size={22} aria-hidden="true"/>:<Plus size={22} aria-hidden="true"/>}</button>
      <div id="hp-sop-detail" className="hp-sop-detail" hidden={!open}><ModuleFacts module={procedureModule}/><p className="hp-note">{procedureModule.boundary}</p></div>
      <button className="hp-link" onClick={event=>onContact(event,walkthroughInterests[1])}>Discuss SOP workflow <Arrow/></button>
    </div>
  </div></section>;
}

export function App() {
  const heroPhoto={src:'/assets/hero-qa-operator.png',alt:'A QA representative and a line operator investigating together with a laptop beside guarded packaging equipment. Illustrative scene.',position:'43% center'};
  const dialogRef=useRef(null);
  const menuRef=useRef(null);
  const openerRef=useRef(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [interest,setInterest]=useState(walkthroughInterests[0]);
  const [active,setActive]=useState('top');
  const [moduleRequest,setModuleRequest]=useState(()=>({id:moduleAtLocation(window.location)}));
  useEffect(()=>{
    let frame;
    function followLink(){
      const target=resolveLegacyLocation(window.location);
      const module=moduleAtLocation(window.location);
      if(module)setModuleRequest({id:module});
      if(target)history.replaceState(history.state,'',canonicalLegacyUrl(window.location,target));
      const id=module?`hp-stage-${module}`:target?.section;
      if(id){cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start',behavior:'instant'}));}
    }
    followLink();
    window.addEventListener('popstate',followLink);
    window.addEventListener('hashchange',followLink);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('popstate',followLink);window.removeEventListener('hashchange',followLink);};
  },[]);
  function openContact(event,preferred=walkthroughInterests[0]) {
    openerRef.current=event.currentTarget;
    setInterest(preferred);
    setMenuOpen(false);
    dialogRef.current.showModal();
  }
  function restoreFocus() {
    requestAnimationFrame(()=>{
      const opener=openerRef.current;
      (opener?.getClientRects().length?opener:menuRef.current)?.focus();
    });
  }
  useEffect(()=>{
    function escape(event){if(event.key==='Escape'&&menuOpen){setMenuOpen(false);menuRef.current?.focus();}}
    document.addEventListener('keydown',escape);
    return()=>document.removeEventListener('keydown',escape);
  },[menuOpen]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(entry.target.id);},{rootMargin:'-15% 0px -50% 0px'});
    document.querySelectorAll('main > section[id]').forEach(section=>observer.observe(section));
    return()=>observer.disconnect();
  },[]);

  return <>
    <a href="#main" className="hp-skip">Skip to content</a>
    <header className="hp-header"><div className="shell hp-header-inner">
      <a className="hp-brand" href="#top" aria-label="Verrion Systems home"><img src="/assets/verrion-systems.png" alt="Verrion Systems" width="2823" height="777"/></a>
      <button ref={menuRef} className="hp-menu" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="hp-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={26} aria-hidden="true"/>:<List size={26} aria-hidden="true"/>}</button>
      <nav id="hp-navigation" aria-label="Primary navigation" className={menuOpen?'is-open':''}>
        <a href="#workflows" onClick={()=>setMenuOpen(false)} aria-current={['workflows','deviation-workflow','case-study','sop-workflow'].includes(active)?'location':undefined}>Pharma Compliance Suite</a>
        <a href="#approach" onClick={()=>setMenuOpen(false)} aria-current={active==='approach'?'location':undefined}>Our approach</a>
        <button className="hp-nav-contact" onClick={openContact}>Arrange a walkthrough <Arrow/></button>
      </nav>
    </div></header>
    <main id="main">
      <section className="hp-hero" id="top" aria-labelledby="hp-hero-title">
        <div className="shell hp-hero-heading"><h1 id="hp-hero-title"><span>Built around the people</span><span>responsible for quality.</span></h1><a className="hp-link hp-hero-shortcut" href="#workflows">Explore the workflows <ArrowRight size={20} aria-hidden="true"/></a></div>
        <figure className="hp-hero-figure"><img src={heroPhoto.src} alt={heroPhoto.alt} style={heroPhoto.position?{objectPosition:heroPhoto.position,'--hp-photo-narrow-aspect':heroPhoto.narrowAspect}:undefined} width="2172" height="724" fetchPriority="high"/></figure>
      </section>
      <section className="hp-introduction shell" id="workflows" aria-labelledby="hp-intro-title">
        <div className="hp-intro-row"><p className="hp-eyebrow">Pharma Compliance Suite</p><h2 id="hp-intro-title">From the first deviation report to the actions that follow. PCS helps your team keep the work, evidence and decisions connected.</h2><button className="hp-button" onClick={openContact}>Arrange a walkthrough <Arrow/></button></div>
        <div className="hp-workflow-choices">
          <a href="#deviation-workflow"><span><strong>Deviation/CAPA workflow</strong><small>Facts, investigation, disposition and actions</small></span><Arrow/></a>
          <a href="#sop-workflow"><span><strong>SOP workflow</strong><small>Independent procedure review with SOP Intelligence</small></span><Arrow/></a>
        </div>
        <div className="hp-intro-notes"><p>Scope agreed for each pilot.</p><p>AI assists the review. Your team owns the decision.</p></div>
      </section>
      <section className="hp-approach shell" id="approach" aria-labelledby="hp-approach-title">
        <div className="hp-approach-heading"><p className="hp-eyebrow">Our approach</p><h2 id="hp-approach-title">The context matters.<br/>So does the person<br/>making the decision.</h2></div>
        <div className="hp-approach-copy"><p>Quality work asks people to make careful judgements. They need to understand what happened, inspect the evidence and explain the next step.</p><p>PCS brings that work into dedicated, connected workspaces. AI can assist selected analysis and drafting; authorised people review the output and retain responsibility for the outcome.</p><div className="hp-principles"><div><h3>Evidence within reach.</h3><p>Keep the source close to the finding it informs.</p></div><div><h3>Responsibility in view.</h3><p>Make ownership, review and the next decision clear.</p></div></div></div>
      </section>
      <DeviationWorkflow onContact={openContact} moduleRequest={moduleRequest}/>
      <CaseStudy/>
      <SopWorkflow onContact={openContact}/>
      <section className="hp-questions shell" aria-labelledby="hp-questions-title"><div><p className="hp-eyebrow">Before we talk</p><h2 id="hp-questions-title">A few practical<br/>questions.</h2><p>A walkthrough starts with your work and the records your team needs to keep.</p></div><div className="hp-faq-list">{questions.map(([question,answer])=><details key={question}><summary>{question}<Plus size={21} aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></section>
      <section className="hp-contact" id="contact" aria-labelledby="hp-contact-title"><div className="shell hp-contact-layout"><div><p className="hp-eyebrow">Start with your workflow</p><h2 id="hp-contact-title">Let’s look at<br/>the work together.</h2></div><div className="hp-contact-options"><p>A focused conversation about your team, your responsibilities and where PCS could fit.</p>{walkthroughInterests.map(workflow=><button key={workflow} onClick={event=>openContact(event,workflow)}>{workflow}<Arrow/></button>)}<p className="hp-note">Please leave regulated and confidential material out of your first message.</p></div></div></section>
    </main>
    <footer className="hp-footer shell"><a className="hp-footer-name" href="#top">Verrion Systems</a><nav aria-label="Legal and contact"><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="/data-handling.html">Data handling</a><button onClick={openContact}>Contact</button></nav><a className="hp-back-top" href="#top" aria-label="Back to top"><ArrowUp size={23} aria-hidden="true"/></a><p>© 2026 Verrion Systems Ltd. Registered in England and Wales. Company number 17265988. Registered office: 1 Woodburn Drive, Bury St. Edmunds, England, IP32 6FY.</p></footer>
    <Walkthrough dialogRef={dialogRef} interest={interest} onInterestChange={setInterest} onRestoreFocus={restoreFocus}/>
  </>;
}

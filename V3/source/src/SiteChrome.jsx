import { useState } from "react";
import {
  BadgeCheck,
  BookOpenCheck,
  ClipboardPenLine,
  FileSearch,
  ListChecks,
  Menu,
  ScanSearch,
  ShieldCheck,
  X,
} from "lucide-react";
import brandLogo from "./assets/verrion-systems-pharma-compliance-suite.svg";

export const iconMap = {
  badgeCheck: BadgeCheck,
  bookOpenCheck: BookOpenCheck,
  clipboardPen: ClipboardPenLine,
  fileSearch: FileSearch,
  listChecks: ListChecks,
  scanSearch: ScanSearch,
  shieldCheck: ShieldCheck,
};

export const pilotMailto =
  "mailto:hello@verrionsystems.com?subject=Private%20walkthrough%20request%20-%20Verrion%20Systems&body=Please%20do%20not%20include%20patient%20data%2C%20live%20batch%20records%2C%20confidential%20SOPs%2C%20deviation%20packs%2C%20or%20other%20regulated%20GxP%20material%20in%20this%20email.";

export function Brand() {
  return (
    <img
      className="brand-mark"
      src={brandLogo}
      alt="Verrion Systems, Pharma Compliance Suite"
    />
  );
}

export function StatusBadge({ children, tone = "pilot" }) {
  return <span className={`status-badge status-${tone}`}>{children}</span>;
}

export function Header({ pageType = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pageType === "home";
  const homeTarget = isHome ? "#top" : "./index.html#top";
  const sectionTarget = (section) => (isHome ? `#${section}` : `./index.html#${section}`);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <a className="brand-link" href={homeTarget} aria-label="Verrion Systems home" onClick={closeMenu}>
          <Brand />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          className={`primary-navigation ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <a href={sectionTarget("portfolio")} aria-current={pageType === "module" ? "page" : undefined} onClick={closeMenu}>Product portfolio</a>
          <a href={sectionTarget("controls")} onClick={closeMenu}>Controls &amp; Data</a>
          <a href={sectionTarget("why")} onClick={closeMenu}>Why Verrion Systems</a>
          <a href={sectionTarget("pilot")} onClick={closeMenu}>Pilot</a>
        </nav>
        <a className="button button-primary header-cta" href={sectionTarget("pilot")}>
          Book a private walkthrough
        </a>
      </div>
    </header>
  );
}

export function Footer({ currentPage }) {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <a href="./index.html#top" aria-label="Return to the Verrion Systems homepage"><Brand /></a>
        <p>Controlled software for pharmaceutical quality, validation and accountable AI use.</p>
        <nav aria-label="Legal and contact links">
          <a href="./privacy.html" aria-current={currentPage === "privacy" ? "page" : undefined}>Privacy</a>
          <a href="./terms.html" aria-current={currentPage === "terms" ? "page" : undefined}>Terms</a>
          <a href="./data-handling.html" aria-current={currentPage === "data-handling" ? "page" : undefined}>Data handling</a>
          <a href={pilotMailto}>Contact</a>
        </nav>
        <small>
          &copy; {new Date().getFullYear()} Verrion Systems Ltd.
          Registered in England and Wales. Company number 17265988.
          Registered office: 1 Woodburn Drive, Bury St. Edmunds, England, IP32 6FY.
        </small>
      </div>
    </footer>
  );
}

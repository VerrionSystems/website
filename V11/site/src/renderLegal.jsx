// Server render of the legal pages. The markup is the same LegalPage the
// browser hydrates, so the published HTML matches the live text. renderToString
// (not renderToStaticMarkup) keeps the markers hydration needs between
// adjacent text, such as "Last updated: " and the date.
import { renderToString } from 'react-dom/server';
import { LegalPage } from './LegalPage.jsx';

export function renderPage(pageId) {
  return renderToString(<LegalPage pageId={pageId} />);
}

// Server render of the legal pages. The markup is the same LegalPage the
// browser hydrates, so the published HTML matches the live text.
import { renderToStaticMarkup } from 'react-dom/server';
import { LegalPage } from './LegalPage.jsx';

export function renderPage(pageId) {
  return renderToStaticMarkup(<LegalPage pageId={pageId} />);
}

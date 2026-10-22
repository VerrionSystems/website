// V8 homepage entry. Self-hosted variable fonts (Archivo with its width axis,
// Instrument Sans), the scroll engine (unmodified scrollcraft), the page's own
// choreography, and support for links into the earlier sites.
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/instrument-sans/wdth.css';
import './scrollcraft.css';
import './v8.css';
import './scrollcraft.js';
import './v8.js';
import { followLegacyLinks } from './legacyLinks.js';

followLegacyLinks();

import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Self-hosted type. Deliberately not a Google Fonts <link>: no third-party
// request, no silent fallback if the CDN is blocked, and the subset ships with
// the build so there is no flash of unstyled text.
//
// All six design directions load their faces here during the selection phase.
// Once a direction is chosen, delete the imports the winner does not use — see
// plans/design-directions.md.
import '@fontsource-variable/ibm-plex-sans'          // body, most directions
import '@fontsource/ibm-plex-sans-condensed/400.css' // Interferometer display
import '@fontsource/ibm-plex-sans-condensed/600.css'
import '@fontsource/ibm-plex-mono/400.css'           // data / Terminal
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource-variable/newsreader'             // Bit Plane + Journal
import '@fontsource-variable/archivo'                // Bengal + Monograph body
import '@fontsource-variable/source-serif-4'         // Monograph display

import './index.css'
// After index.css on purpose: this gives the token layer the later cascade
// position, so its body and element styling wins over Tailwind's preflight.
import './styles/design-system.css'
// After the token layer: the motion system reads --dur-* from it, and its
// element rules should win where both touch the same property.
import './styles/motion.css'
import { applyStoredAppearance } from './lib/appearance.ts'

// Stamp every appearance axis before React mounts, so the first paint is already
// in the right palette and at the right motion level rather than flashing the
// defaults.
applyStoredAppearance()

createRoot(document.getElementById("root")!).render(<App />);

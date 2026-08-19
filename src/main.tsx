import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Self-hosted type. Deliberately not a Google Fonts <link>: no third-party
// request, no silent fallback if the CDN is blocked, and the subset ships with
// the build so there is no flash of unstyled text.
//
// Bit Plane is the chosen direction, so only its three faces load. The five
// other directions were explored behind the appearance switcher and their
// families — IBM Plex Sans Condensed, Archivo, Source Serif 4 — are gone.
import '@fontsource-variable/ibm-plex-sans'   // body
import '@fontsource-variable/newsreader'      // display
import '@fontsource/ibm-plex-mono/400.css'    // data
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'

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

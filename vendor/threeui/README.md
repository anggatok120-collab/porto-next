# ThreeUI sketchbook source integration

This is a **local, source-pinned subset**, not the published npm distribution.
It exports `MengToSketchbookLandingPage` using revision `e0330548b1ac` from
the [registered source bundle](https://threeui.com/source-code/meng-to-sketchbook-landing-page.json).

The npm package `@designcodeio/threeui@1.2.0` includes the correct HTML and
images, but its sketchbook wrapper omits the registered typography controls.
The application therefore resolves `@designcodeio/threeui` to this directory
using a `file:` dependency and compiles it with Next.js `transpilePackages`.

## Source preservation

- All five registered TS/TSX/CSS files in `src/` are byte-for-byte copies.
- `index.tsx` copies the exact sketchbook export from `LandingPages.tsx`, adds
  the Next.js client boundary, and imports only its actual dependencies.
  The complete `LandingPages.tsx` is retained for hash verification; its
  unrelated catalog components are not part of the import graph.
- The canonical HTML and all 17 requested binary assets live under
  `public/landing-pages/` at their original paths. Assets were copied from
  the official npm package, with both sizes and SHA-256 hashes checked.
- The shared CSS also references Fragment Mono. That additional font is
  copied from the official ThreeUI repository and recorded in the manifest.
- The component uses the original local-document `LandingPageFrame`.
  It loads the authored HTML from this application, not the ThreeUI website.
- `compat/LandingPageFrame.tsx` is derived from the registered frame with one
  additional guard: its background-presentation effect waits for
  `document.documentElement`. Next.js can mount the effect during iframe
  navigation, when the document exists but its root is still null. All other
  frame code is unchanged. The verifier checks this precise difference.
- The requested typography props are applied by the original recipe and
  customization hook, without rewriting the HTML file.
- `app/SketchbookScene.jsx` uses the frame's authored `applyScene` extension
  to stop arrow-button pointerdowns reaching the page-drag handler. The
  upstream stage otherwise captures those pointers and swallows native
  clicks. The buttons still call the original page-turn handlers.
- The same integration hook hides the magnified copy and disables invisible
  glass hit targets when the original magnifier toggle is off. The upstream
  toggle changes the glass opacity but leaves that separate copy visible.

Run `npm run threeui:verify` from the application root to verify the six
registered sources, 17 required assets, supporting font, and component export.
`.gitattributes` preserves the original source bytes on Windows checkouts.

## Active portfolio presentation

The application uses `PortfolioSketchbookLandingPage`, a content-adapted entry
that shares the original frame, typography, page turns, zoom and magnifier.
It serves `public/landing-pages/angga-sketchbook.html`. The original canonical
document and export remain available as the immutable upstream reference.

`scripts/build-portfolio-sketchbook.mjs` derives the active document from the
canonical HTML, removes the demo header/biography/contact content, and replaces
the nine artwork entries with bilingual plates generated from Angga's original
portfolio and portrait. The full content remains accessible as regular text in
`app/page.js`, with original section IDs, links and interactions. The book is
a visual summary, not a replacement for the portfolio content.

`npm run portfolio:verify` verifies the nine restored sections, original links,
all bilingual copy, and the absence of the demo identity in the active document.

Copyright and font licenses are included in this directory.

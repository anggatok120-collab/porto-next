'use client'

import { MengToSketchbookLandingPage } from '@designcodeio/threeui'

const frameControllers = new WeakMap()

function prepareSketchbookFrame(frame) {
  const document = frame.contentDocument
  if (!document?.getElementById('sbStage')) return

  frameControllers.get(document)?.abort()
  const controller = new AbortController()
  frameControllers.set(document, controller)

  // The authored stage captures all pointerdowns, including its arrow buttons.
  // Keep button presses out of the page-drag handler so native clicks reach
  // the original onclick callbacks. The registered source stays byte-exact.
  for (const id of ['sbLeft', 'sbRight']) {
    document.getElementById(id)?.addEventListener('pointerdown', (event) => {
      event.stopPropagation()
    }, { signal: controller.signal })
  }

  // The original toggle fades the glass but leaves its magnified copy and
  // invisible pointer targets active after a drag. Tie both to its own state.
  const style = document.getElementById('sketchbook-integration') || document.createElement('style')
  style.id = 'sketchbook-integration'
  style.textContent = `
    #sb3d:has(#loupe:not(.on)) #zoomWrap { visibility: hidden; }
    #loupe:not(.on) .ring, #loupe:not(.on) .grip { pointer-events: none; }
  `
  document.head.append(style)
}

export default function SketchbookScene() {
  return (
    <div className="shader-frame">
      <MengToSketchbookLandingPage
        headingFont="instrument-serif"
        bodyFont="newsreader"
        headingWeight="400"
        bodyWeight="400"
        primaryColor="#2b2721"
        headingSize={30}
        bodySize={20}
        headingLetterSpacing={0.010}
        applyScene={prepareSketchbookFrame}
      />
    </div>
  )
}

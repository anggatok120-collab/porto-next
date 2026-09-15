'use client';

// Exact component export from the registered LandingPages.tsx; unrelated pages are not imported.
import { splitTypographyProps, usePageTypography, type PageTypographyProps } from './src/shaders/landing-pages/pageTypography';
import { LandingPageFrame, type LandingPageProps } from './compat/LandingPageFrame';
import { MENG_TO_SKETCHBOOK_TYPOGRAPHY } from './src/shaders/landing-pages/pageRecipes';

export function MengToSketchbookLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(MENG_TO_SKETCHBOOK_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Meng To — Singapore Sketchbook" sourceUrl="/landing-pages/meng-to-sketchbook.html" />;
}

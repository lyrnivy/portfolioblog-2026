// Minimal JSX typings for the A-Frame / MindAR custom elements used by the
// hidden AR postcard experience (components/ar/BusanARExperience.tsx).
// These are real DOM custom elements loaded at runtime via CDN scripts, not
// React components, so their attributes are left loose on purpose.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ARElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  [attr: string]: unknown;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": ARElementProps;
      "a-assets": ARElementProps;
      "a-camera": ARElementProps;
      "a-entity": ARElementProps;
      "a-video": ARElementProps;
    }
  }
}

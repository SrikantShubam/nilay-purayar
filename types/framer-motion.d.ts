import "framer-motion";

declare module "framer-motion" {
  interface Transition {
    // Deliberately `any`. Several components pass a raw cubic-bezier array
    // (e.g. [0.16, 1, 0.3, 1]), which TypeScript widens to number[] rather
    // than the 4-tuple framer-motion expects. Widening `ease` here is what
    // lets the build pass without `typescript.ignoreBuildErrors`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ease?: any;
  }
}

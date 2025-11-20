import "framer-motion";

declare module "framer-motion" {
  interface Transition {
    ease?: any;
  }
}

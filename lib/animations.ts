import type { Variants } from "framer-motion";

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export const wordReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease },
  },
};

export const drawerVariants: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "tween", duration: 0.4, ease } },
  exit: { x: "100%", transition: { type: "tween", duration: 0.35, ease } },
};

export const drawerLeftVariants: Variants = {
  hidden: { x: "-100%" },
  show: { x: 0, transition: { type: "tween", duration: 0.4, ease } },
  exit: { x: "-100%", transition: { type: "tween", duration: 0.35, ease } },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.2, ease } },
};

export const cartItemVariants: Variants = {
  hidden: { opacity: 0, height: 0, y: -8 },
  show: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.3, ease } },
  exit: { opacity: 0, height: 0, y: -8, transition: { duration: 0.25, ease } },
};

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease } },
};

export const checkboxVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.35, ease } },
};

export const marqueeVariants: Variants = {
  animate: {
    x: ["0%", "-50%"],
    transition: { x: { repeat: Infinity, ease: "linear", duration: 40 } },
  },
};

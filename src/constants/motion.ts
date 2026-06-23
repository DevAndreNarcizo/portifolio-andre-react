import type { Transition } from 'framer-motion';

/** Curva de easing padrão usada nas animações de entrada do site. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Transição de mola padrão para microinterações. */
export const SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
};

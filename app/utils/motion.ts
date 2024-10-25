export function slideIn(distance: number, delay: number) {
  return {
    hidden: {
      x: distance,
      opacity: 0,
      rotate: distance > 0 ? 0.75 : -0.75,
      filter: 'blur(3px)',
    },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      filter: 'none',
      transition: {
        x: {
          type: 'spring',
          damping: 30,
          stiffness: 160,
          mass: 0.85,
          delay,
          restDelta: 0.0000001,
          restSpeed: 0.000001,
        },
        opacity: {
          duration: 0.65,
          delay,
          ease: [0.15, 0.98, 0.45, 1],
        },
        rotate: {
          duration: 0.8,
          delay,
          ease: [0.18, 0.95, 0.48, 1],
        },
        filter: {
          duration: 0.55,
          delay,
          ease: [0.2, 0.95, 0.5, 1],
        },
      },
    },
  };
}

export const slideInFromTop = {
  hidden: {
    y: -28,
    opacity: 0,
    rotateX: 3.5,
    filter: 'blur(4px)',
    transformOrigin: '50% 0%',
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    filter: 'none',
    transition: {
      y: {
        type: 'spring',
        damping: 28,
        stiffness: 180,
        mass: 0.8,
        delay: 0.15,
        restDelta: 0.0000001,
        restSpeed: 0.000001,
      },
      opacity: {
        duration: 0.6,
        delay: 0.15,
        ease: [0.15, 0.98, 0.45, 1],
      },
      rotateX: {
        duration: 0.65,
        delay: 0.15,
        ease: [0.18, 0.95, 0.48, 1],
      },
      filter: {
        duration: 0.5,
        delay: 0.15,
        ease: [0.15, 0.98, 0.45, 1],
      },
    },
  },
};

import { sineIn, sineInOut, sineOut } from "svelte/easing";
export function staggerdTransition(index) {
  return {
    y: 1 * index + 100,
    duration: 400,
    delay: 100 * index + 50,
    easing: (t) => sineInOut(t),
  };
}

export const blurTransitionInConfig = {
  amount: 5,
  delay: 0,
  duration: 600,
  easing: (t) => sineOut(t),
};
export const blurTransitionOutConfig = {
  amount: 5,
  delay: 0,
  duration: 300,
  easing: (t) => sineIn(t),
};



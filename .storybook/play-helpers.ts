/**
 * Helpers for story `play` functions.
 *
 * Overlay components (dialogs, menus, popovers, toasts) are closed by default,
 * so their content would never be checked by the a11y addon. Stories open them
 * in `play`, which runs before axe in the vitest a11y run but is not autoplayed
 * on the docs page, so docs still show the closed trigger.
 */

/**
 * Jump every finite CSS animation in the document to its end state.
 *
 * Radix overlays fade/zoom in (tw-animate-css). Running axe mid-animation makes
 * it measure contrast against a partially transparent element and report false
 * positives. `finish()` is used instead of awaiting `animation.finished`
 * because in the headless test browser some enter animations stay `paused`
 * and would never resolve. Infinite animations (spinners, pulsing skeletons)
 * are left alone: `finish()` throws for them.
 */
export async function waitForAnimations(): Promise<void> {
  // Give React/Radix a frame to mount the content and start its animation.
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(null);
    });
  });
  for (const animation of document.getAnimations()) {
    if (animation.effect?.getComputedTiming().iterations !== Infinity) {
      animation.finish();
    }
  }
}

/* IMPACT V2 motion — progressive, optional, and reduced-motion safe. */
(function attachIMPACTV2Motion(window, document) {
  const VISIBLE_CLASS = "is-v2-visible";
  const READY_CLASS = "v2-motion-ready";

  function init(root) {
    const scope = root || document;
    const items = Array.from(scope.querySelectorAll("[data-v2-reveal]"));
    if (!items.length || scope.dataset.v2MotionInitialized === "true") return;

    scope.dataset.v2MotionInitialized = "true";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasObserver = "IntersectionObserver" in window;

    if (reduceMotion || !hasObserver) {
      items.forEach((item) => item.classList.add(VISIBLE_CLASS));
      return;
    }

    /* Animate content already inside the initial viewport after the ready state
       paints. Content just below the fold waits until it actually enters the
       lower viewport, so visitors see the transition instead of having it
       complete offscreen. Restored/deep-link content above the viewport is
       shown immediately. Opacity and transform remain paint-only. */
    const initialRevealLimit = window.innerHeight * 0.92;
    const initialItems = [];
    items.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.bottom <= 0) item.classList.add(VISIBLE_CLASS);
      else if (bounds.top < initialRevealLimit) initialItems.push(item);
    });
    scope.classList.add(READY_CLASS);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(VISIBLE_CLASS);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -6% 0px" });

    items.filter((item) => !item.classList.contains(VISIBLE_CLASS)).forEach((item) => observer.observe(item));

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        initialItems.forEach((item) => item.classList.add(VISIBLE_CLASS));
      });
    });
  }

  window.IMPACTV2Motion = { init };
})(window, document);

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

    const visibleLimit = window.innerHeight * 0.94;
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < visibleLimit) item.classList.add(VISIBLE_CLASS);
    });
    scope.classList.add(READY_CLASS);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(VISIBLE_CLASS);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    items.filter((item) => !item.classList.contains(VISIBLE_CLASS)).forEach((item) => observer.observe(item));
  }

  window.IMPACTV2Motion = { init };
})(window, document);

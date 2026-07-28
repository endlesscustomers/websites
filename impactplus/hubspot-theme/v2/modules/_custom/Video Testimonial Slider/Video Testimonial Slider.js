$(document).ready(function () {

  var sliders = document.querySelectorAll(".section--video-slider--slide");
  var cardWidth = $('.video--cards--article-item').outerWidth(true);

  sliders.forEach((section) => {

    var slider = section.querySelector("[data-slider]");
    var prevButton = section.querySelector("[data-prev]");
    var nextButton = section.querySelector("[data-next]");

    slider.addEventListener("scroll", () => {

      var maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      var scrollValue = slider.scrollLeft;

      if (scrollValue >= (maxScrollLeft - 2)) {
        prevButton.classList.remove("arrow-dis");
        nextButton.classList.add("arrow-dis");
      } else if (scrollValue <= 0) {
        nextButton.classList.remove("arrow-dis");
        prevButton.classList.add("arrow-dis");
      } else {
        nextButton.classList.remove("arrow-dis");
        prevButton.classList.remove("arrow-dis");
      }

    }, { passive: true });

    function slide(direction) {

      let left;
      const scrollLeft = slider.scrollLeft;

      switch (direction) {
        case "prev":
          left = scrollLeft - cardWidth;
          break;

        case "next":
        default:
          left = scrollLeft + cardWidth;
          break;
      }

      slider.scroll({
        left,
        behavior: "smooth"
      });
    }

    if (slider && prevButton && nextButton) {
      prevButton.addEventListener("click", () => slide("prev"));
      nextButton.addEventListener("click", () => slide("next"));
    }

  });

  /* recalc card width on resize */
  $(window).on('resize', function () {
    cardWidth = $('.video--cards--article-item').outerWidth(true);
  });

});
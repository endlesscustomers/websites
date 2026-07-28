var sliders = document.querySelectorAll(".snap-slider"); 
var cardWidth = $('.blog--listing--cards--article-item').outerWidth(true);

sliders.forEach((index) => {

  var slider = index.querySelector("[data-slider]"); 
  var prevButton = index.querySelector("[data-prev]");
  var nextButton = index.querySelector("[data-next]");

  /* Watching the Scroll Position to Disable the Prev/Next Buttons */
  slider.addEventListener("scroll", event => {

    var maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    var maxScrollRound = Math.floor(maxScrollLeft);
    var scrollValue = slider.scrollLeft;
    var scrollValueRound = Math.round(scrollValue);

    if (scrollValueRound >= (maxScrollRound - 2)) {
      prevButton.classList.remove("arrow-dis");
      nextButton.classList.add("arrow-dis");
    } else if (scrollValueRound == 0) {
      nextButton.classList.remove("arrow-dis");
      prevButton.classList.add("arrow-dis");
    } else {
      nextButton.classList.remove("arrow-dis");
      prevButton.classList.remove("arrow-dis");
    }
  }, { passive: true });

  function slide(direction) {
    let left;
    const { scrollLeft, clientWidth } = slider;

    switch (direction) {
      case "prev":
        left = scrollLeft - cardWidth;
        break;
      case "next":
      default:
        left = cardWidth + scrollLeft;
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

$(window).on('resize', function () {
  cardWidth = $('.blog--listing--cards--article-item').outerWidth(true);
});
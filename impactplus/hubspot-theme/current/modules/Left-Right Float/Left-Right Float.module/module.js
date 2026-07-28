function sectionLeftrightfloat() {
  const sections = document.querySelectorAll(".section--leftrightfloat");

  sections.forEach(section => {
    const columnSpacing = parseFloat(section.getAttribute("data-columnspacing") || 0) / 100;
    const columnWidth = parseFloat(section.getAttribute("data-columnwidth") || 0);
    const columnWidthTablet = parseFloat(section.getAttribute("data-tabletcolumnwidth") || 0);
    const grid = section.querySelector(".grid");
    const gridWidth = grid.offsetWidth;
    const gridOffset = grid.getBoundingClientRect().left + window.scrollX;

    const media = section.querySelector(".section--leftrightfloat--media");
    if (viewport("lap-and-up")) {
      media.style.width = (gridOffset + (gridWidth * columnWidth)) + "px";
    } else if (viewport("tablet")) {
      media.style.width = (gridOffset + (gridWidth * columnWidthTablet)) + "px";
    } else {
      media.style.width = "";
    }

    if (!section.classList.contains("section--leftrightfloat--nominheight")) {
      const content = section.querySelector(".section--leftrightfloat--content");
      const contentHeight = content.offsetHeight;
      const minHeight = parseInt(section.getAttribute("data-minheight") || 0);

      if (viewport(">tablet") && (contentHeight < minHeight)) {
        const padding = Math.ceil((minHeight - contentHeight) / 2) + "px";
        content.style.paddingTop = padding;
        content.style.paddingBottom = padding;
      } else {
        content.style.paddingTop = "";
        content.style.paddingBottom = "";
      }
    }
  });
}

// Initial call
sectionLeftrightfloat();

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  sectionLeftrightfloat();
  window.addEventListener("resize", sectionLeftrightfloat);
});
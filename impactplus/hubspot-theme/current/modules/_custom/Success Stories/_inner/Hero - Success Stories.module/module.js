$(document).ready(function () {
  var sidebar,
      pageContentOffset,
      pageContentHeight,
      sidebarHeight,
      distScrolled,
      offsetFromTop,
      navigationHeight;

  $(window).on("scroll resize", function() {
    if ($(window).width() < 1024) {
      // Remove any fixed styling if window is below 1024
      $(".success-stories--sidebar").removeClass('typings--fixed');
      $(".success-stories--sidebar .success-stories--typings").css({
        'top' : '',
        'position' : '',
        'left' : ''
      });
      $(".success-stories--sidebar .fixed--spacer").css({
        'display' : 'none'
      });
      return; // Exit the handler
    }

    sidebar = $(".success-stories--sidebar");

    pageContentOffset = $('.post--type-video').offset().top;
    pageContentHeight = $('.body-container--flex').height() - $('.success-story--inner-hero--top').height() - $('.headerIMPlus--secondary').height() - $('.section--half-and-half-w-testimonials-grid').outerHeight(true) - $('.section--casestudy').outerHeight(true) - 60;
    sidebarHeight = $('.success-stories--typings').height();
    distScrolled = $(document).scrollTop();
    offsetFromTop = 40;
    navigationHeight = 66 + offsetFromTop;

    if (distScrolled + sidebarHeight + 105 > pageContentOffset + pageContentHeight) {
      // bottom
      sidebar.find('.success-stories--typings').css({
        'top' : pageContentHeight - sidebarHeight - parseInt($('.body-container--flex').css('margin-bottom')), // 20 for the margin of the last p tag
        'position' : 'absolute',
        'left' : '0'
      });
    }
    else if (distScrolled + navigationHeight < pageContentOffset) {
      // top
      sidebar.removeClass('typings--fixed');
      sidebar.find('.success-stories--typings').css({
        'top' : '',
        'position' : '',
        'left' : ''
      });
      sidebar.find('.fixed--spacer').css({
        'display' : 'none'
      });
    }
    else {
      // middle
      sidebar.addClass('typings--fixed');
      sidebar.find('.success-stories--typings').css({
        'top' : $('.headerIMPlus--secondary').height() + offsetFromTop,
        'position' : '',
        'left' : ''
      });
      sidebar.find('.fixed--spacer').css({
        'display' : 'block'
      });
    }
  });
});
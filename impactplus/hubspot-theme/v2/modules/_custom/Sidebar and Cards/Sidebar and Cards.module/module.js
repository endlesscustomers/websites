$(window).scroll(function() {
  var scrollDistance = $(window).scrollTop();

  // Assign active class to nav links while scolling
  $('.section--sidebar-cards--group').each(function(i) {
    if ($(this).position().top <= scrollDistance) {
      $('.section--sidebar-cards--sidebar li.hs-menu-item--active').removeClass('hs-menu-item--active');
      $('.section--sidebar-cards--sidebar li:eq('+i+')').addClass('hs-menu-item--active');
    }
  });
}).scroll();

$(document).ready(function () {
  function bindSidebarToggle() {
    if ($(window).width() < 767) {
      // Collapse the menu on resize to small screens
      $('.section--sidebar-cards--sidebar-menu')
        .stop(true, true)
        .slideUp()
        .addClass('palm--collapsed');

      // Toggle menu on header click
      $('.section--sidebar-cards--sidebar-header').off('click').on('click', function () {
        $('.section--sidebar-cards--sidebar-menu')
          .stop(true, true)
          .slideToggle(function () {
            $(this).toggleClass('palm--collapsed', !$(this).is(':visible'));
          });
      });

      // Collapse menu on clicking any <li> inside the menu
      $('.section--sidebar-cards--sidebar-menu li').off('click').on('click', function () {
        $('.section--sidebar-cards--sidebar-menu')
          .stop(true, true)
          .slideUp()
          .addClass('palm--collapsed');
      });

    } else {
      // Reset on larger viewports
      $('.section--sidebar-cards--sidebar-menu')
        .removeAttr('style')
        .removeClass('palm--collapsed');

      $('.section--sidebar-cards--sidebar-header').off('click');
      $('.section--sidebar-cards--sidebar-menu li').off('click');
    }
  }

  // Initial check
  bindSidebarToggle();

  // Recheck on window resize
  $(window).on('resize', function () {
    bindSidebarToggle();
  });
});
// Mobile Sticky Menu

$(document).ready(function () {
  function handleStickySidebar() {
    const $window = $(window);
    const $sidebar = $('.section--sidebar-cards--sidebar-wrapper');
    const $trigger = $('.section--sidebar-cards--inner');

    $window.on('scroll resize', function () {
      const windowWidth = $window.width();

      if (windowWidth <= 767) {
        const triggerTop = $trigger.offset().top - $('.headerIMPlus-secondary-navigation').height();
        const scrollTop = $window.scrollTop();

        if (scrollTop >= triggerTop) {
          $sidebar.css('position', 'fixed').css('top', '90px').css('z-index', '999').css('width','90%');
        } else {
          $sidebar.css('position', '').css('top', '').css('z-index', '').css('width','');
        }
      } else {
        // Reset styles if over 767px
        $sidebar.css('position', '').css('top', '').css('z-index', '').css('width','');
      }
    });

    // Trigger once on load
    $window.trigger('scroll');
  }

  handleStickySidebar();
});

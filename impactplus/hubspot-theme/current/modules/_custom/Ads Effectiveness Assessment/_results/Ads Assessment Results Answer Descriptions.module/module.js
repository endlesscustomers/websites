$(document).ready(function() {
  // Propegate the score stuff
  /* .each function that runs through all the modules, an opens the questions that were answered incorrectly, but by default, all should be collapsed */
  /*$('.faq-accordian--container').find('.scorecardResults--question').each(function () {
    var thisRel = $(this).attr('rel');
    $('.faq-accordian--container').find('.scorecardResults--question[rel="'+thisRel+'"] .fa.fa-chevron-down').toggleClass('open');
    $('.faq-accordian--container').find('.scorecardResults--question[rel="'+thisRel+'"]').toggleClass('faq-accordian--action');
    $('.faq-accordian--container').find('.scorecardResults--question[rel="'+thisRel+'"]').addClass('faq-accordian--incorrect');
  });  */
});	

$(document).ready(function () {
  // For the Inner Section Score Bubbles
  $('.scorecardResults--question').each(function () {
    const $question = $(this);
    const relKey = $question.attr('rel');

    if (relKey) {
      // Get absolute cookie value for this rel
      const absoluteScore = parseInt($.cookie(`${relKey}_absolute`), 10);

      if (!isNaN(absoluteScore)) {
        // Find the inner score div inside this question block
        const $scoreInner = $question.find('.faq-accordian--item-score-inner');
        const $scoreContainer = $question.find('.faq-accordian--item-score');

        // Inject score with % sign
        $scoreInner.text(`${absoluteScore}%`);

        // Remove old classes first
        $scoreContainer.removeClass('score--low score--medium score--high');

        // Add the correct class based on the score
        if (absoluteScore < 70) {
          $scoreContainer.addClass('score--low');
        } else if (absoluteScore >= 70 && absoluteScore <= 79) {
          $scoreContainer.addClass('score--medium');
        } else if (absoluteScore >= 80) {
          $scoreContainer.addClass('score--high');
        }
      }
    }
  });

  // For the inner questions
  $('.section--faqs--faq--content').each(function() {
    const $faq = $(this);
    const questionKey = $faq.data('question'); // e.g. 'do_your_salespeople_use_content'
    if (!questionKey) return;

    // Get cookie value for this question
    const cookieValue = $.cookie(`assessment__${questionKey}`);

    // Find the correct and incorrect icons within this faq block
    const $correctIcon = $faq.find('.accoridan--correct');
    const $incorrectIcon = $faq.find('.accoridan--incorrect');

    if (cookieValue === 'yes') {
      $correctIcon.css('display', 'block');
      $incorrectIcon.css('display', 'none');
    } else if (cookieValue === 'no') {
      $correctIcon.css('display', 'none');
      $incorrectIcon.css('display', 'block');
    } else {
      // If cookie is missing or unexpected value, hide both icons
      $correctIcon.css('display', 'none');
      $incorrectIcon.css('display', 'none');
    }
  });

});

$(function(){
  $(".section--faqs--faq--content--icon-title").click(function(e){
    $(this).closest('.section--faqs--faq--content').find('.faq-accordian--single-main').slideUp();
    $(this).closest('.section--faqs--faq--content').toggleClass('faq-accordian--action');
    if ($(this).next().is(":hidden")){
      $(this).next().slideDown();
    } else {
    }
  });
});
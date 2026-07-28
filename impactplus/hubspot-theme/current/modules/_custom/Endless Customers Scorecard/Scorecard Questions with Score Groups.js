// START FORM AUTOSCROLL FUNCITONALITY
$.fn.upform = function () {
  var $this = $(this);
  var container = $this.find("#section--inbound-scorecard-questions");

  $this.find("form").submit(function () {
    return false;
  });

  $(container).find(".scorecard--block").first().click();

  // Intro button scrolls to first question
  $('.scorecardResults--intro-btn').on('click', function () {
    $('.scorecard--intro-block').removeClass('active');

    var firstInputBlock = $(container).find('.input-block').first();
    if (firstInputBlock.length) {
      rescroll(firstInputBlock);
      reinitState(firstInputBlock);
    }
  });

  $(container).find(".input-block").not(".input-block input").on("click", function () {
    rescroll(this);
  });

  $(container).find('.input-block input[type="radio"]').change(function (e) {
    $(this).next('label').fadeTo(100, 0.3, function () {
      $(this).fadeTo(100, 1.0).fadeTo(100, 0.3).fadeTo(100, 1.0);
    });

    if ($(this).closest('.scorecard--block').is(":last-child")) {
      $('.upform-main').scrollTo('.upform-footer', 400);
    } else {
      moveNext(this);
    }
  });

  $('.upform-main').on("scroll", function () {
    $(container).find(".scorecard--block").each(function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var scrollMiddle = $(window).scrollTop() + $(window).height() / 2;

      if (elementTop <= scrollMiddle && elementBottom > scrollMiddle) {
        reinitState(this);
      }
    });
  });

  function reinitState(e) {
    $(container).find(".scorecard--block").removeClass("active");

    $(container).find(".input-block input").each(function () {
      $(this).blur();
    });

    $(e).addClass("active");
  }

  function rescroll(e) {
    var elementHeight = $(e).outerHeight();
    var viewportHeight = viewport().height;

    var offsetTop;

    if (elementHeight > viewportHeight) {
      // Scroll to 120px from the top if the element is taller than the viewport
      offsetTop = -80;
    } else {
      // Center the element vertically
      offsetTop = (-1 * (viewportHeight / 2)) + (elementHeight / 2);
    }

    $('.upform-main').scrollTo($(e), 300, {
      offset: {
        top: offsetTop
      },
    });
  }

  function reinit(e) {
    reinitState(e);
    rescroll(e);
  }

  function moveNext(e) {
    $(e).parent().parent().next().click();
  }

  function movePrev(e) {
    $(e).parent().parent().prev().click();
  }
};

// END FORM AUTOSCROLL FUNCITONALITY

// START PROGRESS BAR
var question = 0,
    option_radio, progress = 0;

questions = $('.input-block'); 

function checkAnswer() {
  // Get name attr from radio 
  option_radio = $('.input-block .toggle'); 

  // loop through each radio
  for (var i = 0; i < option_radio.length; i++) {

    // check if option_radio is check
    if (option_radio[i].checked) {
      $(option_radio[i]).closest('.input-block').addClass('option--selected');
      user_choice = option_radio[i].value;
    }
  }
  progress += questions.length * 100 / questions.length / questions.length;
  $('#assessment-progress').css('width', progress + '%');
};

$(".input-control input").change(function(){
  if ($(this).closest('.input-block').hasClass('option--selected')) {
    // Do nothing, already has an answer
  } else {
    checkAnswer();
  }
});
// END PROGRESS BAR


$(document).ready(function() {

  //$('.upform-main .input-block:nth-of-type(1)').addClass('active first-input');
  $('.upform-main').css('overflow','scroll');
  $('.fixed--header, #progress-container').fadeIn(400);

  $(".upform").upform();	

  {% if request.query_dict.test == "true" %}
  $('.input-block').each(function() {
    $(this).find("input:eq(0)").attr("checked",true);
  });
  {% endif %}

  resultsForm();
});	

$("#btn--complete-assessment").click(function(e){
  e.preventDefault();
  var assessmentErrors = false;
  $('.input-block').removeClass('input--incomplete');
  $(".input-block").each(function(i){
    if($(this).find("input:radio:checked").length == 0){
      assessmentErrors = true;
      $(this).addClass('input--incomplete');
    } else {
      // Nothing
    }
  });

  if (assessmentErrors === false){
    // Form is filled out
    $(".upform-main").queue( "steps", function( next ) {
      $('.upform .upform-form, .fixed--header, #progress-container').fadeOut(400);
      next();
    }).delay(600, "steps").queue( "steps", function( next ) {
      $('.successForm').fadeIn(400);
      next();
    }).dequeue( "steps" );
  } else {
    alert('Please answer questions');
    $('.upform-main').scrollTo('.input--incomplete:eq(0)', 300, {
      offset: {
        top: ((-1*(viewport().height/2))+$('.input--incomplete:eq(0)').height()/2)
      },
      queue: false
    });
  }
});

// Setting the Cookies for the results for the Next Page

var assessmentResourcesDefaults = {};

/*$('.scorecardResults--question[rel]').each(function() {
  var relValue = $(this).attr('rel');
  assessmentResourcesDefaults[relValue] = 0;
});*/

//console.log(assessmentResourcesDefaults);

var assessmentResources = {};
var assessmentValues = {}; // Used in the sales assessment

var totalScore = 0;
var totalCorrect = 0;

var totalQuestions = $('.upform-main .input-block').length;

function assessmentTally() {

  //assessmentResources = assessmentResourcesDefaults;

  $('.upform-main').find('.input-block').each(function () {
    $(this).find('.input-control input:checked').each(function () {
      if ($(this).attr('rel') == 'yes'){
        totalScore += 1;
        //console.log('is yes')
      } else {
        //console.log('not yes');
      }
    });
  });	

  hundredCal = Math.round((totalScore/totalQuestions) * 100);

  totalCorrect = parseFloat(totalScore); // Used to calculate the score segments %
  //console.log(totalCorrect);
  totalScore = hundredCal;

  //console.log(totalScore)

  $('.upform-main').find('.input-control input:checked').each(function () {
    //console.log($(this));
    assessmentResources[$(this).parents('.input-control').attr('rel')] = $(this).attr('rel');
  });


  //var totalTrue = 0;
  /*var assessmentResourcesTrue = [];

  $.each(assessmentResources, function (key, value) {
    totalTrue++;
    assessmentResourcesTrue.push(key);
  });*/

  /*assessmentResourcesTrueNew = [];
  for (i=0;i<assessmentResourcesTrue.length;i++) {
    assessmentResourcesTrueNew.push(assessmentResourcesTrue[i]);
  }*/

  // set only the first 5 to true in 1st var
  //assessmentResourcesTrue = assessmentResourcesTrueNew;

  //console.log("Total Score: "+totalScore);
  //console.log(assessmentResourcesTrue);
  //console.log(assessmentResources);

  var assessmentScore = $('.upform').attr('data-totalname');

  // Save Each answer as a cookie
  $.each(assessmentResources, function (key, val) {
    $.cookie("assessment__"+key, (val), {expires: 28, path:'/'});
  });

  $.cookie(assessmentScore, totalScore, {expires: 28, path:'/'});
}	

/*$(".successForm--skip-email").click(function(e){ 
  assessmentTally();
});*/


var assessmentSubmittable = false;

function assessmentSubmit() {
  assessmentSubmittable = true;

  $('.successForm--for-results').find('form.hs-form').find('input.hs-input:required').each(function () {
    if (!$(this).val()) {
      assessmentSubmittable = false;
    }
    else if ($(this).val().trim().length == 0) {
      assessmentSubmittable = false;
    }
  });

  if (assessmentSubmittable === true) {

    $('.upform-main').find('.input-block').each(function () {

      // Matching the Correct Answers in Assessment with Inputs on Form
      if ($(this).find('.input-control').attr('rel')) {
        thisQuestion = $(this);
        thisRel = $(this).find('.input-control').attr('rel');

        if ($('.successForm--for-results').find(".hs-form-field.hs_"+thisRel)) {
          thisInput = $('.successForm--for-results').find(".hs-form-field.hs_"+thisRel);

          // Fake form, find all radios, get the answers respectively for the questions they are connected to.
          if (thisQuestion.find('input[type="radio"]')){

            thisAnswer = thisQuestion.find('input[type="radio"]:checked:eq(0)').attr("rel").trim().toLowerCase();
            $(this).prop("checked", false).change();

            //console.log(thisAnswer);

            thisQuestion.find('.input-control input:checked').each(function () {

              //checkedRelTag = thisQuestion.find('.input-control input:checked').attr('rel');

              // real form
              thisInput.find("input").each(function () {
                thisGhostLabel = $(this).attr("value").replace(/[^a-zA-Z0-9 -]/gi, '').trim().toLowerCase();

                if (thisAnswer == thisGhostLabel) {
                  $(this).prop('checked',true).change();
                }
              });	
            });
          }

        }
      }
    });

    assessmentTally();


    const bucketTotals = {};
    const bucketMax = {};
    let totalCorrect = 0;

    $('.scorecardResults--question').each(function () {
      const $question = $(this);
      const bucket = $question.data('scorebucket');

      // Initialize if not set
      bucketTotals[bucket] = bucketTotals[bucket] || 0;
      bucketMax[bucket] = bucketMax[bucket] || 0;

      // Track total questions for this bucket
      bucketMax[bucket] += 1;

      // Find selected input
      const selectedInput = $question.find('input:checked');
      const relValue = selectedInput.attr('rel');

      //console.log(`Question bucket: ${bucket}, Selected rel: ${relValue}`);

      if (relValue === 'yes') {
        bucketTotals[bucket] += 1;
        totalCorrect += 1;
      }
    });

    // Now calculate percentages and set cookies/fields
    $.each(bucketTotals, function (bucket, val) {
      const totalInBucket = bucketMax[bucket];

      // Relative to all correct answers
      const relativePercent = totalCorrect > 0 ? Math.round((val / totalCorrect) * 100) : 0;

      // Absolute percent for this bucket
      const absolutePercent = totalInBucket > 0 ? Math.round((val / totalInBucket) * 100) : 0;

      // Store both in cookies
      $.cookie(bucket + '_relative', relativePercent, { expires: 28, path: '/' });
      $.cookie(bucket + '_absolute', absolutePercent, { expires: 28, path: '/' });

      // Set form field value (use absolute by default — change as needed)
      $('.successForm--for-results').find(`.hs-form-field.hs_${bucket}`).each(function () {	
        $(this).find('input').val(absolutePercent); // or relativePercent if preferred
      });
    });

    var totalScoreFormVal = $('.upform').data('total');
    //console.log(totalScoreFormVal);

    $('.hs_'+totalScoreFormVal+' input').val(totalScore);
  }

  //console.log(assessmentSubmittable);

  if (assessmentSubmittable === true) {
    $('.successForm--for-results form').submit();
    //console.log('form submission success');
  } else {
    alert('Please complete all fields!');
  }
}

function resultsForm() {
  hbspt.forms.create({
    portalId: "145335",
    formId: $('.successForm--for-results').attr('data-formid'),
    target:".successForm--for-results",
    onFormReady: function () {
      $('.successForm--for-results').find('.hs_submit input').click(function(e) {
        if (assessmentSubmittable === false) {
          assessmentSubmit();
          return false;
          e.preventDefault();
        }
      });

    }, 
  });
}	
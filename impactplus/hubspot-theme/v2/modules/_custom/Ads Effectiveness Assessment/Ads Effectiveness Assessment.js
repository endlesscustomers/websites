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
      offsetTop = -80;
    } else {
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
  option_radio = $('.input-block .toggle');

  for (var i = 0; i < option_radio.length; i++) {
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
  buildSectionConfig();

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
    }
  });

  if (assessmentErrors === false){
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


// ============================================================
// PROFILE ASSIGNMENT LOGIC
// Mirrors the results page logic exactly.
// Called after bucket totals are calculated in assessmentSubmit().
// bucketTotals: object keyed by scorebucket data attribute values
// ============================================================
var SECTION_CONFIG = {
  bands: { strong: 75, mixed: 41 },
  max: {},      // populated on init by buildSectionConfig()
  sectionMap: {}, // populated on init by buildSectionConfig()
  // Individual question cookie keys used in profile overrides
  individualCookies: {
    q5:  'assessment__account_ownership_and_access',
    q21: 'assessment__confidence_without_agency',
    q22: 'assessment__agency_partnership_quality'
  }
};

// Reads #bucketMeta .bucketMeta--data elements to build sectionMap and max.
// data-bucketcp  → cookie/bucket key
// data-bucketmax → max possible score for that bucket
// Section numbers are assigned 1–N in DOM order.
function buildSectionConfig() {
  var sectionNum = 1;
  $('#bucketMeta .bucketMeta--data').each(function() {
    var cp  = $(this).data('bucketcp');
    var max = parseInt($(this).data('bucketmax'), 10);
    if (!cp || isNaN(max)) return;
    
    SECTION_CONFIG.max[cp] = max;
    SECTION_CONFIG.sectionMap[sectionNum] = cp;  // ADD THIS LINE
    sectionNum++;
  });

  console.log('[Assessment] Section config built:', SECTION_CONFIG.max);
  console.log('[Assessment] Section map:', SECTION_CONFIG.sectionMap);
}

var PROFILE_NAMES = {
  1: 'Healthy & Aligned',
  2: 'Strong Performance, Low Visibility',
  3: 'Busy, but Not Strategic',
  4: 'Reactive & Vendor-Led',
  5: 'Unclear & At Risk'
};

function assignProfile(bucketTotals) {
  var b     = SECTION_CONFIG.bands;
  var maxes = SECTION_CONFIG.max;
  var map   = SECTION_CONFIG.sectionMap;

  // Build pct and band per section number
var scores = {};
for (var num in map) {
  var key  = map[num];
  var raw  = bucketTotals[key] || 0;
  var max  = maxes[key];
  var pct  = (raw / max) * 100;
  var band = pct >= b.strong ? 'Strong' : pct >= b.mixed ? 'Mixed' : 'Weak';
  scores[num] = { bucket: key, raw: raw, pct: pct, band: band };
}

  // Read individual question cookies (already set by assessmentTally)
  var ic       = SECTION_CONFIG.individualCookies;
  console.log(ic);
  var q5Score  = parseInt($.cookie(ic.q5),  10) || 0;
  var q21Score = parseInt($.cookie(ic.q21), 10) || 0;
  var q22Score = parseInt($.cookie(ic.q22), 10) || 0;
  console.log($.cookie(ic.q5));
  console.log($.cookie(ic.q21));
  console.log($.cookie(ic.q));

  var s    = function(n) { return scores[n].pct; };
  var band = function(n) { return scores[n].band; };

  var zeroCount = Object.values(scores).filter(function(sc) { return sc.raw === 0; }).length;

  // ── DEBUG ──────────────────────────────────────────────────
  console.group('[assignProfile] Debug');
  console.log('Scores:');
  
 for (var k in scores) {
  console.log('  ', k, '(' + scores[k].bucket + ')', '→ raw:', scores[k].raw, '| pct:', scores[k].pct.toFixed(1) + '%', '| band:', scores[k].band);
}
  console.log('Individual cookies → q5:', q5Score, '| q21:', q21Score, '| q22:', q22Score);
  console.log('zeroCount:', zeroCount);
  console.groupEnd();
  // ── END DEBUG ──────────────────────────────────────────────

  // Now fix all your profile logic to use consistent numbering
  // Based on your section map order, the sections are:
  // 1: accountability_and_confidence
  // 2: business_goals_and_alignment  
  // 3: creative_testing_and_learning
  // 4: proactivity_and_optimization
  // 5: strategy_and_decision_making
  // 6: transparency_and_access

  // Priority 1: Unclear & At Risk
  if ((s(2) < 40 && s(6) < 40) || (s(2) < 40 && s(1) < 40) || (s(6) < 40 && s(1) < 40) || zeroCount >= 4) {
    return 5;
  }

  // Priority 2: Reactive & Vendor-Led
  if (s(4) < 40 && q22Score <= 1 && (band(5) === 'Mixed' || band(5) === 'Weak')) {
    return 4;
  }

  // Priority 3: Busy, but Not Strategic
  if (s(5) < 50 && s(3) < 50 && s(6) >= 50 && band(4) === 'Mixed') {
    return 3;
  }

  // Priority 4: Strong Performance, Low Visibility
  if (s(1) >= 40 && s(2) >= 60 && s(6) < 50 && q21Score <= 1 && (band(5) === 'Mixed' || band(5) === 'Weak')) {
    return 2;
  }

  // Priority 5: Healthy & Aligned
  var mixedCount = Object.values(scores).filter(function(sc) { return sc.band === 'Mixed'; }).length;
  if (s(2) >= 75 && s(6) >= 75 && s(5) >= 75 && s(1) >= 75 && mixedCount <= 1 && q5Score > 0) {
    return 1;
  }

  return 5; // fallback
}


// Setting the Cookies for the results for the Next Page
var assessmentResourcesDefaults = {};
var assessmentResources = {};
var assessmentValues = {};

var totalScore = 0;
var totalCorrect = 0;
var totalQuestions = $('.upform-main .input-block').length;

function assessmentTally() {
  $('.upform-main').find('.input-control input:checked').each(function () {
    assessmentResources[$(this).parents('.input-control').attr('rel')] = $(this).attr('rel');
  });

  // Save each answer as a cookie (text rel value)
  $.each(assessmentResources, function (key, val) {
    $.cookie("assessment__" + key, (val), { expires: 28, path: '/' });
  });

  // ── FIX: Save numeric values for the 3 individual-cookie questions ──
  var ic = SECTION_CONFIG.individualCookies;
  var icRelMap = {
    'account_ownership_and_access':   ic.q5,
    'confidence_without_agency':      ic.q21,
    'agency_partnership_quality':     ic.q22
  };

  $('.upform-main').find('.scorecardResults--question').each(function () {
    var rel = $(this).find('.input-control').attr('rel');
    if (icRelMap[rel]) {
      var numericVal = $(this).find('input:checked').attr('value');
      $.cookie(icRelMap[rel], numericVal, { expires: 28, path: '/' });
    }
  });
}

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
      if ($(this).find('.input-control').attr('rel')) {
        thisQuestion = $(this);
        thisRel = $(this).find('.input-control').attr('rel');

        if ($('.successForm--for-results').find(".hs-form-field.hs_"+thisRel)) {
          thisInput = $('.successForm--for-results').find(".hs-form-field.hs_"+thisRel);

          if (thisQuestion.find('input[type="radio"]')){
            thisAnswer = thisQuestion.find('input[type="radio"]:checked:eq(0)').attr("rel").trim().toLowerCase();
            $(this).prop("checked", false).change();

            thisQuestion.find('.input-control input:checked').each(function () {
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

    // Step 1 — save individual answer cookies first (q5/q21/q22 needed by assignProfile)
    assessmentTally();

    // Step 2 — calculate bucket totals
    const bucketTotals = {};
    const bucketMax = {};
    totalCorrect = 0;

    $('.scorecardResults--question').each(function () {
      const $question = $(this);
      const bucket = $question.data('scorebucket');

      bucketTotals[bucket] = bucketTotals[bucket] || 0;
      bucketMax[bucket]    = bucketMax[bucket]    || 0;
      bucketMax[bucket]   += 1;

      const selectedInput = $question.find('input:checked');
      const relValue      = selectedInput.attr('value');

      bucketTotals[bucket] += parseInt(relValue, 10);
      totalCorrect         += 1;
    });

    // Step 3 — set bucket total cookies, band cookies, and form fields
    $.each(bucketTotals, function (bucket, val) {
      console.log(bucket, val);

      var max  = SECTION_CONFIG.max[bucket] || 1;
      var pct  = (val / max) * 100;
      var band = pct >= SECTION_CONFIG.bands.strong ? 'Strong'
               : pct >= SECTION_CONFIG.bands.mixed  ? 'Mixed'
               : 'Weak';

      $.cookie(bucket + '_total', val,  { expires: 28, path: '/' });
      $.cookie(bucket + '_band',  band, { expires: 28, path: '/' });

      console.log('[Assessment] ' + bucket + ': ' + val + '/' + max + ' (' + pct.toFixed(1) + '%) → ' + band);

      $('.successForm--for-results').find('.hs-form-field.hs_' + bucket).each(function () {
        $(this).find('input').val(val);
      });
    });

    // Step 4 — assign profile and set as cookie
    console.log('[assessmentSubmit] bucketTotals at assignProfile call:', JSON.stringify(bucketTotals));
    console.log('[assessmentSubmit] bucketMax at assignProfile call:', JSON.stringify(bucketMax));
    var profileId   = assignProfile(bucketTotals, bucketMax);
    var profileName = PROFILE_NAMES[profileId];
    var assessmentScore = $('.upform').attr('data-totalname');

    $.cookie(assessmentScore, profileName, { expires: 28, path: '/' });
    console.log('[Assessment] Profile assigned:', profileId, '—', profileName);

    // Step 5 — push profile name into HubSpot form field
    var totalScoreFormVal = $('.upform').data('total');
    $('.hs_' + totalScoreFormVal + ' input').val(profileName);
  }

  if (assessmentSubmittable === true) {
    $('.successForm--for-results form').submit();
  } else {
    alert('Please complete all fields!');
  }
}

function resultsForm() {
  hbspt.forms.create({
    portalId: "145335",
    formId: $('.successForm--for-results').attr('data-formid'),
    target: ".successForm--for-results",
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
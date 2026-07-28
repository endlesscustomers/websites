{# ******************** DEVELOPER NOTES ******************** #}
{#

  Write your custom notes here ...

#}

{# **************************************************************************** #}
{# **************************************************************************** #}
{# ******************** DO NOT EDIT VALUES BELOW THIS LINE ******************** #}
{# **************************************************************************** #}
{# ********************* ADD YOUR CUSTOM JAVASCRIPT TO THE ******************** #}
{# ****************** BOTTOM OF THIS DOCUMENT WHERE SPECIFIED ***************** #}
{# **************************************************************************** #}
{# **************************************************************************** #}

/*!
Production™ Framework © 2019 IMPACT Branding & Design LLC. ALL RIGHTS RESERVED.
IMPACT Branding & Design LLC grants you a nonexclusive, nontransferable, limited right to access and use this 
installation of Production™ Framework. By using this installation of Production™ Framework, you agree not 
to modify, reverse engineer, disassemble, or decompile the Production™ Framework or any portion thereof. 
Any unauthorized copying, reproduction, republishing, uploading, posting, distribution, transmission, display 
or other use of this material without the express written permission of IMPACT Branding & Design is prohibited. 
*/

{# ******************** VERSION ******************** #}

{# Production™ Framework v3.31.1 #} 

{# 
  MODIFIED = FALSE

  If the variable MODIFIED above is FALSE it means the framework core has not been modified and is able to be updated without issue.
  Update the value of MODIFIED to TRUE once the framework core has been modified to ensure your changes are not overwritten.
  Please leave a comment about what modifications were made in the DEVELOPER NOTES area above to keep track of all changes.
  When updating the framework core always check the variable MODIFIED and DEVELOPER NOTES to confirm the core can be updated without issue.

  Please note that there is a separate MODIFIED variable and DEVELOPER NOTES for each of the CSS, JS, and Functions files.
#}

{# ******************** MEDIA QUERIES ******************** #}
{% set media_List = {
    "default":[undefined,undefined],
    "desk":[undefined,1108],
    "lap":[1107,1024],
    "lap-and-up":[undefined,1024],
    "portable":[1023,undefined],
    "tablet":[1023,768],
		"palm":[767,undefined]   
}%}

{# ******************** BASE ******************** #}
if (window.console) {console.log("Production™ Framework loaded.\n© "+(new Date()).getFullYear()+". All rights reserved IMPACT Branding & Design LLC.\nhttps://www.impactplus.com");}

var mediaList = {
  {% for key,value in media_List.items() %}
  "{{ key }}": [{% if value[0] %}{{ value[0] }}{% else %}null{% endif %},{% if value[1] %}{{ value[1] }}{% else %}null{% endif %}]{% if not loop.last %},{% endif %}  
    {% endfor %}
}

function editor() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
  $(document).ready(function () {
    $('html').addClass('device--touch');
  });
}
function touch() {
  if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    return true
  }
  else {
    return false
  }
}
function viewport(mediaName) {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  if (mediaName) {
    if (mediaList[mediaName]) {
      if (((e[a+'Width'] <= mediaList[mediaName][0])||(mediaList[mediaName][0] == null))&&((e[a+'Width'] >= mediaList[mediaName][1])||(mediaList[mediaName][1] == null))) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == ">")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] >= mediaList[mediaName.slice(1)][1])||(mediaList[mediaName.slice(1)][1] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == "<")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] <= mediaList[mediaName.slice(1)][0])||(mediaList[mediaName.slice(1)][0] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if (mediaName == "touch") {
      return touch();
    }
    else {
      throw "Media size "+mediaName+" not found in media list."
    }
  }
  else {
    return { width : e[a+'Width'] , height : e[a+'Height'] };
  }
}

{# ***************************************************************************** #}
{# ***************************************************************************** #}
{# ***************************** CUSTOM JAVASCRIPT ***************************** #}
{# ***************************************************************************** #}
{# ***************************************************************************** #}

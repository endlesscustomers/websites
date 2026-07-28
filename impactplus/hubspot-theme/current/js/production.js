{% import '../css/_config.css' as config %}

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

{#
Production Theme Framework © 2024 IMPACT Branding & Design LLC. ALL RIGHTS RESERVED.
IMPACT Branding & Design LLC grants you a nonexclusive, nontransferable, limited right to access and use this
installation of Production Theme Framework. By using this installation of Production Theme Framework, you agree not
to modify, reverse engineer, disassemble, or decompile the Production Theme Framework or any portion thereof.
Any unauthorized copying, reproduction, republishing, uploading, posting, distribution, transmission, display
or other use of this material without the express written permission of IMPACT Branding & Design is prohibited.
#}

{# ******************** BASE ******************** #}

if (window.console) {console.log("Production Theme Framework loaded.\n© "+(new Date()).getFullYear()+". All rights reserved IMPACT Branding & Design LLC.\nhttps://www.impactplus.com");}

var mediaList = {
  {% for key,value in config.media_List.items() %}
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

window.addEventListener('load', function () {
  // Delay execution by 1000 milliseconds (1 second)
  setTimeout(function () {
    // Check if an element with the class 'hs-tools-menu' exists
    if (document.querySelector('.hs-tools-menu')) {
      // Add the class 'hs--user' to the body element
      document.body.classList.add('hs--user');
    }
  }, 1000); // Adjust the delay time as needed
});

{# ******************** NOINDEX ROBOTS NOTIFIER ******************** #}

window.addEventListener('load', function () {
  // Delay execution by 1000 milliseconds (1 second)
  setTimeout(function () {
    // Find the 'meta' tag with name 'robots'
    var metaRobots = Array.from(document.querySelectorAll('head meta')).find(function(meta) {
      return (meta.getAttribute('name') || "").toLowerCase() === 'robots';
    });

    if (metaRobots) {
      var content = (metaRobots.getAttribute('content') || "").toLowerCase();

      // Check if the 'content' contains 'noindex' and if the body has the class 'hs--user' or if the editor function returns true
      if (content.includes('noindex') && (document.body.classList.contains('hs--user') || editor())) {

        // Create the notification div
        var notifier = document.createElement('div');
        notifier.id = 'metaRobotsNotifier';
        notifier.style = 'display:inline-block!important;position:fixed!important;bottom:10px;left:10px;padding:10px 20px;color:#ffffff;background:#232323;z-index:2147483647;font-family:sans-serif!important;font-size:14px;box-shadow: 3px 3px 8px rgba(0,0,0,.5);';
        notifier.title = content;
        notifier.innerHTML = '<span style="width:15px;height:auto;display:inline-block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#28ff28" d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z"/></svg></span> Robots are blocked';

        // Append the notifier to the body
        document.body.appendChild(notifier);
      }
    }
  }, 1000); // Adjust the delay time as needed
});

{# ******************** COOKIE ******************** #}
// Utility functions for cookie handling
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


{# ******************** FADES ******************** #}

function globalFade() {
  var elements = document.querySelectorAll('.animate--fade-left, .animate--fade-right, .animate--fade-up, .animate--fade-down');
  var windowHeight = window.innerHeight;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var windowWidth = window.innerWidth;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top + scrollTop;
    var offset = windowWidth > 680 ? windowHeight * 0.03 : windowHeight * 0.05;

    if (elementTop + offset <= scrollTop + windowHeight) {
      element.classList.add('animate--fade--active');
    }
  });
}

window.addEventListener('load', function() {
  globalFade();

  window.addEventListener('scroll', globalFade);
  window.addEventListener('resize', globalFade);

  var loadElements = document.querySelectorAll('.animate--fade--load');
  loadElements.forEach(function(element) {
    element.classList.add('animate--fade--active');
  });
});

function fadeIn(element, duration = 400) {
  element.style.opacity = 0;
  element.style.display = 'block';

  let start = null;

  function animate(time) {
    if (!start) start = time;
    let progress = time - start;
    element.style.opacity = Math.min(progress / duration, 1);
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function fadeOut(element, duration = 400) {
  element.style.opacity = 1;

  let start = null;

  function animate(time) {
    if (!start) start = time;
    let progress = time - start;
    element.style.opacity = Math.max(1 - progress / duration, 0);
    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
    }
  }

  requestAnimationFrame(animate);
}

{# ******************** EASETO ******************** #}

function easeTo(whereTo, offset, scrollTime) {
  var targetElement = document.querySelector(whereTo);
  if (!targetElement) return;

  var header = document.querySelector('body header');
  var headerHeight = (header && window.getComputedStyle(header).position === 'fixed') ? header.offsetHeight : 0;
  var additionalOffset = document.body.classList.contains('header--static') ? 0 : (header ? header.offsetHeight : 0);

  var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + (offset || 0) - headerHeight - additionalOffset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

function scrollToAnchor() {
  if (window.location.hash !== '') {
    var elementId = window.location.hash.substr(1) + '-anchor';
    var targetElement = document.getElementById(elementId);

    if (targetElement) {
      var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 150;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

window.addEventListener('load', function() {
  setTimeout(function() {
    scrollToAnchor();
    window.addEventListener('hashchange', scrollToAnchor);
  }, 10);
});

{# ******************** HASH SCROLL ******************** #}
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.hash) {
    if (window.location.hash.length > 1) {
      window.addEventListener('load', function () {
        setTimeout(function () {
          var thisHash = window.location.hash.slice(1);
          var targetElement = document.getElementById(thisHash);
          if (targetElement) {
            var scrollOffset = 0;
            var header = document.querySelector('.headerIMPlus-navigation-container');
            if (header && header.classList.contains('headerIMPlus-navigation-container--is')) {
              scrollOffset += header.offsetHeight;
              console.log(scrollOffset);
            }
            var submenuAnchor = document.querySelector('.section--submenu--anchor');
            if (submenuAnchor) {
              var submenuAnchorTop = submenuAnchor.getBoundingClientRect().top + window.scrollY;
              var targetElementTop = targetElement.getBoundingClientRect().top + window.scrollY;
              if (submenuAnchorTop <= targetElementTop && !submenuAnchor.classList.contains('section--submenu--static')) {
                scrollOffset += submenuAnchor.offsetHeight;
              }
            }
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - scrollOffset,
              behavior: 'smooth'
            });
          }
        }, 100);
      });
    }
  }

  document.querySelectorAll('a[href*="#"]:not([href="#"])').forEach(function(link) {
    link.addEventListener('click', function (event) {
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') ||
        location.hostname === this.hostname
      ) {
        var target = document.querySelector(this.hash) || document.querySelector('[name=' + this.hash.slice(1) + ']');
        if (target) {
          event.preventDefault();

          // Check for header and calculate offset if class is present
          var offset = 0;
          var header = document.querySelector('.headerIMPlus-navigation-container');
          var secondaryNav = document.querySelector('.headerIMPlus--secondary');

          if (secondaryNav && secondaryNav.classList.contains('headerIMPlus--secondary--issticky')) {
            offset += secondaryNav.offsetHeight;
          }
          if (header && header.classList.contains('headerIMPlus-navigation-container--issticky')) {
            offset += header.offsetHeight;
            // console.log('Offset:', offset);
          }

          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });

          // Optional: focus first focusable element if hash is #maincontent
          if (this.hash === '#maincontent') {
            var mainContent = document.querySelector('#maincontent');
            var focusable = mainContent.querySelectorAll(
              'button, a, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length > 0) {
              focusable[0].focus();
            }
          }
        }
      }
    });
  });
});

{# ******************** FANCYBOX ******************** #}
document.addEventListener('DOMContentLoaded', function () {
  // Set default options for Fancybox
  Fancybox.defaults.infinite = 0;
  Fancybox.defaults.hash = false;

  // Bind Fancybox to elements with the specified selectors
  Fancybox.bind('[data-fancybox], .fancybox', {
    aspectRatio: true,
    infobar: false,
    autoSize: true,
    infinite: false,
    buttons: [
      "close"
    ],
    afterClose: function () {
      document.body.classList.remove("fancybox-active", "compensate-for-scrollbar");
    }
  });
});

{# ******************** Accessibility Toggle Functionality ******************** #}
function a11yClick(event){
  event.preventDefault();
  if ( event.type === 'click' ) {
    return true;
  } else if ( event.type === 'keypress' ) {
    var code = event.charCode || event.keyCode;
    if ( ( code === 32 ) || ( code === 13 ) ) {
      return true;
    }
  } else {
    return false;
  }
}

{# ******************** LAZY LOADING ******************** #}

/*! lozad.js - v1.16.0 - 2020-09-06
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2020 Apoorv Saxena; Licensed MIT */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lozad=e()}(this,function(){"use strict";
/**
   * Detect IE browser
   * @const {boolean}
   * @private
   */
  var g="undefined"!=typeof document&&document.documentMode,f={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=t.querySelector("img"),r=!1;null===e&&(e=document.createElement("img"),r=!0),g&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),r&&t.append(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var a=t.children,o=void 0,i=0;i<=a.length-1;i++)(o=a[i].getAttribute("data-src"))&&(a[i].src=o);t.load()}t.getAttribute("data-poster")&&(t.poster=t.getAttribute("data-poster")),t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset"));var n=",";if(t.getAttribute("data-background-delimiter")&&(n=t.getAttribute("data-background-delimiter")),t.getAttribute("data-background-image"))t.style.backgroundImage="url('"+t.getAttribute("data-background-image").split(n).join("'),url('")+"')";else if(t.getAttribute("data-background-image-set")){var d=t.getAttribute("data-background-image-set").split(n),u=d[0].substr(0,d[0].indexOf(" "))||d[0];// Substring before ... 1x
u=-1===u.indexOf("url(")?"url("+u+")":u,1===d.length?t.style.backgroundImage=u:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+u+"; background-image: -webkit-image-set("+d+"); background-image: image-set("+d+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function A(t){t.setAttribute("data-loaded",!0)}var m=function(t){return"true"===t.getAttribute("data-loaded")},v=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)};return function(){var r,a,o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=Object.assign({},f,t),i=e.root,n=e.rootMargin,d=e.threshold,u=e.load,g=e.loaded,s=void 0;"undefined"!=typeof window&&window.IntersectionObserver&&(s=new IntersectionObserver((r=u,a=g,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),m(t.target)||(r(t.target),A(t.target),a(t.target)))})}),{root:i,rootMargin:n,threshold:d}));for(var c,l=v(o,i),b=0;b<l.length;b++)(c=l[b]).getAttribute("data-placeholder-background")&&(c.style.background=c.getAttribute("data-placeholder-background"));return{observe:function(){for(var t=v(o,i),e=0;e<t.length;e++)m(t[e])||(s?s.observe(t[e]):(u(t[e]),A(t[e]),g(t[e])))},triggerLoad:function(t){m(t)||(u(t),A(t),g(t))},observer:s}}});

function initLozad() {
  var observer = lozad('.lozad', {
    rootMargin: '10px 0px',
    threshold: 0.1,
    enableAutoReload: true
  });
  observer.observe();
}
document.addEventListener('DOMContentLoaded', function () {
  initLozad();
});

{# ******************** ACCORDION TOGGLING ******************** #}
function slideUp(target, duration = 500) {
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.boxSizing = 'border-box'
  target.style.height = target.offsetHeight + 'px'
  target.offsetHeight // Trigger reflow
  target.style.overflow = 'hidden'
  target.style.height = 0
  target.style.paddingTop = 0
  target.style.paddingBottom = 0
  target.style.marginTop = 0
  target.style.marginBottom = 0

  window.setTimeout(() => {
    target.style.display = 'none'
    target.style.removeProperty('height')
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

function slideDown(target, duration = 500) {
  target.style.removeProperty('display')
  let display = window.getComputedStyle(target).display
  if (display === 'none') display = 'block'
  target.style.display = display

  let height = target.offsetHeight // Get the full height
  target.style.overflow = 'hidden'
  target.style.height = 0
  target.style.paddingTop = 0
  target.style.paddingBottom = 0
  target.style.marginTop = 0
  target.style.marginBottom = 0

  target.offsetHeight // Trigger reflow
  target.style.boxSizing = 'border-box'
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.height = height + 'px'
  target.style.removeProperty('padding-top')
  target.style.removeProperty('padding-bottom')
  target.style.removeProperty('margin-top')
  target.style.removeProperty('margin-bottom')

  window.setTimeout(() => {
    target.style.removeProperty('height')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

{# ***************************************************************************** #}
{# ***************************************************************************** #}
{# ***************************** CUSTOM JAVASCRIPT ***************************** #}
{# ***************************************************************************** #}
{# ***************************************************************************** #}
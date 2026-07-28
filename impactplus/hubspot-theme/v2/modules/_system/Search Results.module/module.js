var hsResultsPage = function(_resultsClass) {
  var params = new URLSearchParams(window.location.search.slice(1));
  var searchHasType = false;
  for (let p of params) {
    if (p[0] == "type")  {
      searchHasType = true; 
    }
  }
  if (searchHasType != true) {
    /* Add custom default TYPE entries to search parameters */
    params.append("type", "SITE_PAGE");
    params.append("type", "BLOG_POST");
    params.append("type", "LANDING_PAGE");
  }
  function buildResultsPage(_instance) {
    var resultTemplate 		= _instance.querySelector('.hs-search-results__template'),
        resultsSection 		= _instance.querySelector('.hs-search-results__listing'),
        searchPath			= _instance.querySelector('.hs-search-results__pagination').getAttribute('data-search-path'),
        prevLink 			= _instance.querySelector('.hs-search-results__prev-page'),
        nextLink 			= _instance.querySelector('.hs-search-results__next-page');
    paginationPages = _instance.querySelector('.hs-search-results__pagenumbers');

    function getTerm() {
      return params.get('term') || "";
    }
    function getOffset() {
      return parseInt(params.get('offset')) || 0;
    }
    function getLimit() {
      return parseInt(params.get('limit'));
    }
    function addResult(title, url, description, tags) {
      var newResult = document.importNode(resultTemplate.content, true);

      newResult.querySelector('.hs-search-results__title').innerHTML = title;
      newResult.querySelector('.hs-search-results__title').href = url;
      newResult.querySelector('.hs-search-results__description').innerHTML = description;
      newResult.querySelector('.hs-search-results__tags').innerHTML = tags;
      resultsSection.appendChild(newResult);
    }
    function fillResults(results) {
      results.results.forEach(function(result, i){
        addResult(result.title, result.url, result.description);
      });
      $("body").find(".section--searchresults").removeClass("visuallyhidden");
    }
    function emptyPagination() {
      prevLink.innerHTML = "";
      nextLink.innerHTML = "";
    }
    function emptyResults(searchedTerm) {
      resultsSection.innerHTML = 	"<div class=\"hs-search__no-results first--hard--top last--hard--bottom\"><h3>Sorry. There are no results for \"" + searchedTerm + "\"</h3>" +
        "<p>Try rewording your query, or browse through our site.</p></div>";
      $("body").find(".section--searchresults").removeClass("visuallyhidden");
      $("body").find(".hs-search-results__pagination").addClass("visuallyhidden");
    }
    function setSearchBarDefault(searchedTerm) {
      var searchBars = document.querySelectorAll('.hs-search-field__input');
      Array.prototype.forEach.call(searchBars, function(el){
        el.value = decodeURIComponent(searchedTerm);
      });   
    }
    function httpRequest(term, offset) {
      var SEARCH_URL = "/_hcms/search?",
          requestUrl = SEARCH_URL + params + "&analytics=true",
          request = new XMLHttpRequest();

      request.open('GET', requestUrl, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          setSearchBarDefault(data.searchTerm);
          if (data.total > 0) {
            fillResults(data);
            paginate(data);
          }
          else {
            emptyResults(data.searchTerm);
            emptyPagination();
          }
        }
        else {
          console.error('Server reached, error retrieving results.');
        }
      };
      request.onerror = function() {
        console.error('Could not reach the server.');
      };
      request.send();
    }
    function paginate(results) {
      var updatedLimit = getLimit() || results.limit; 	

      function hasPreviousPage() {
        return results.page > 0;
      }
      function hasNextPage() {
        return results.offset <= (results.total - updatedLimit);
      }

      if (hasPreviousPage()) {
        var prevParams = new URLSearchParams(params.toString());
        prevParams.set('offset', (results.page * updatedLimit) - parseInt(updatedLimit));
        prevLink.href = "/" + searchPath + "?" + prevParams; 
        prevLink.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path d='M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z'/></svg> Back";
      } 
      else {
        prevLink.parentNode.removeChild(prevLink);
      }

      if (hasNextPage()) {
        var nextParams = new URLSearchParams(params.toString());
        nextParams.set('offset', (results.page * updatedLimit) + parseInt(updatedLimit));
        nextLink.href = "/" + searchPath + "?" + nextParams; 
        nextLink.innerHTML = "More <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path d='M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'/></svg>";
      } 
      else {
        nextLink.parentNode.removeChild(nextLink);
      }

      if (hasPreviousPage() || hasNextPage()) {
        paginationPagesHtml = "";
        paginationCurrent = 0;
        paginationFirst = results.page - 3;
        paginationLast = results.page + 3;
        paginationLimit = Math.ceil(results.total / 10);
        if (paginationFirst < 1) {
          paginationFirst = 1; 
        }
        if (paginationLast > paginationLimit) {
          paginationLast = paginationLimit; 
        }
        console.log(results.page);
        if (paginationLast > paginationFirst) {
          for (i=paginationFirst;i<=paginationLast;i++) {
            paginationParams = new URLSearchParams(params.toString());
            paginationParams.set('offset', ((i - 1) * 10));
            prevLink.href = "/" + searchPath + "?" + prevParams;
            paginationPagesHtml += "<a href='/"+searchPath+"?"+paginationParams+"' class='"+(i == results.page + 1?"active":"")+"'>"+(i)+"</a>";    
          }
        }

        paginationPages.innerHTML =  paginationPagesHtml;
      }
    }
    var getResults = (function() {
      if (getTerm()) {
        httpRequest(getTerm(), getOffset());
      }
      else {
        emptyPagination();
      }
    })();
  }
  (function() {
    var searchResults = document.querySelectorAll(_resultsClass);
    Array.prototype.forEach.call(searchResults, function(el){
      buildResultsPage(el);
    });
  })();
}

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  var resultsPages = hsResultsPage('.hs-search-results');
} 
else {
  document.addEventListener('DOMContentLoaded', function() {
    var resultsPages = hsResultsPage('.hs-search-results');
  });
}
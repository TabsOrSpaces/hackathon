var selectedWidth,
    selectedLeft,
    centerViews = ["upcoming-events", "my-cal", "rankings", "search-results"];

window.onload = init;

function $ (element) {
  return document.getElementById(element);
}

function setSelector (width, left) {
  if (!width && !left) {
    $('selector').style.width = selectedWidth;
    $('selector').style.left = selectedLeft;
  } else {
    $('selector').style.width = width;
    $('selector').style.left = left;
  }
}

function moveSelector (navItem, newSelector) {
  if (!navItem) {
    navItem = $('upcoming-events-nav');
  }

  if (!newSelector) {
    newSelector = false;
  }

  if (newSelector) {
    enableView(navItem.id.substring(0, navItem.id.length - 4));
    selectedWidth = navItem.offsetWidth + "px";
    selectedLeft = (navItem.getBoundingClientRect().left - $("center-nav").getBoundingClientRect().left) + "px";
    setSelector();
  }

  setSelector(navItem.offsetWidth + "px", (navItem.getBoundingClientRect().left - $("center-nav").getBoundingClientRect().left) + "px");
}

function enableView(view) {
  // Disable all other views
  for (var i = 0; i < centerViews.length; i++) {
    $(centerViews[i]).style.display = "none";
  }

  $(view).style.display = "block";
}

function showSearchResults () {
  var searchTerm = $('searchBox').value;

  if (searchTerm) {
    var searchNav = $('search-results-nav');

    searchNav.style.display = "inline";
    $('close-search-results-button').style.display = "inline";
    $('search-results').style.display = "block";

    $('searchterm-results').innerHTML = searchTerm;
    moveSelector(searchNav, true);
  }
}

function closeSearchResults () {
  $('search-results-nav').style.display = "none";
  $('close-search-results-button').style.display = "none";
  $('search-results').style.display = "none";

  $('searchBox').value = "";
  moveSelector(false, true);
}

function selectPerson (person) {
  $('person-chooser').style.opacity = "0";
  setTimeout(function () {
    $('person-chooser').style.display = "none";
  }, 300);

  $('profile-pic').src = "images/" + person + ".jpg";

  if (person === 'person1') {
    $('name').innerHTML = "Dan";
    $('position').innerHTML = "Executive executive";
    $('email').innerHTML = "dan@nationwide.com";
  } else if (person === 'person2') {
    $('name').innerHTML = "Michelle";
    $('position').innerHTML = "CEO";
    $('email').innerHTML = "michelle@nationwide.com";
  } else {
    $('name').innerHTML = "Linda";
    $('position').innerHTML = "Developer";
    $('email').innerHTML = "linda@nationwide.com";
  }
}

function init () {
  // Set center nav selector width
  moveSelector($("upcoming-events-nav"), true);
}

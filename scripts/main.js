var selectedWidth,
    selectedLeft,
    centerViews = ["upcoming-events", "my-cal", "nearby", "search-results"];

var tags = [
"golf",
"tennis",
"rowing",
"hiking",
"football",
"board_games",
"video_games",
"programming",
"pets",
"politics",
"music",
"pizza",
"coffee",
"star_wars",
"pokemon",
];

// All events for this demo
var events = [
  {
    id: "event-1",
    title: "Stir Trek",
    date: "August 5",
    time: "11:30 AM",
    description: "Go on quests to stir as many things as possible!",
    pictureSrc: "images/event1.jpg",
    tags: [
      'programming',
      'star_wars',
      'video_games',
      'board_games'
    ]
  },
  {
    id: "event-2",
    title: "Outdoor bikeride",
    date: "August 6",
    time: "10:15 AM",
    description: "Ride with your boss! You might get a promotion!",
    pictureSrc: "images/event4.jpg",
    tags: [
      'rowing',
      'hiking'
    ]
  },
  {
    id: "event-3",
    title: "Columbus Crew Match",
    date: "August 7",
    time: "12:45 PM",
    description: "Join your coworkers in a thrilling soccer match.",
    pictureSrc: "images/event9.jpg",
    tags: [
      'tennis',
      'football',
      'golf'
    ]
  },
  {
    id: "event-4",
    title: "Puppy playtime",
    date: "August 8",
    time: "4:00 PM",
    description: "Relieve some stress with these adorable puppies.",
    pictureSrc: "images/event2.jpg",
    tags: [
      'pets'
    ]
  },
  {
    id: "event-5",
    title: "Downtown @ Dusk",
    date: "August 9",
    time: "09:30 PM",
    description: "Come explore the arena district in the evening.",
    pictureSrc: "images/event3.jpg",
    tags: [
      'pizza',
      'music',
      'hiking'
    ]
  },
  {
    id: "event-6",
    title: "Beginner's Hike",
    date: "August 10",
    time: "09:00 AM",
    description: "Learn how to walk on flat land. Beginner's welcome!",
    pictureSrc: "images/event5.jpg",
    tags: [
      'hiking'
    ]
  },
  {
    id: "event-7",
    title: "Cloud Storage Seminar",
    date: "August 11",
    time: "02:30 PM",
    description: "Learn about cloud storage, the future of five years ago.",
    pictureSrc: "images/event6.jpg",
    tags: [
      'programming'
    ]
  },
  {
    id: "event-8",
    title: "Important Business Meeting",
    date: "August 12",
    time: "03:00 AM",
    description: "Your job is on the line. Don't mess up. For real this time.",
    pictureSrc: "images/event7.jpg",
    tags: [
      'politics'
    ]
  },
  {
    id: "event-9",
    title: "Pokemon Safari",
    date: "August 13",
    time: "6:30 AM",
    description: "Have you caught them all yet? It's your destiny. Pokemon!",
    pictureSrc: "images/event8.jpg",
    tags: [
      'pokemon',
      'video_games'
    ]
  }
];

var people = {
  person1: {
    age: "46",
    gender: "male",
    city: "columbus",
    tags: ['golf', 'tennis', 'football', 'music', 'coffee']
  },
  person2: {
    age: "34",
    gender: "female",
    city: "dublin",
    tags: ['pets', 'pizza', 'hiking', 'rowing', 'politics']
  },
  person3: {
    age: "25",
    gender: "female",
    city: "scottsdale",
    tags: ['programming', 'board_games', 'video_games', 'star_wars', 'pokemon']
  }
};

window.onload = init;
window.onresize = function () {
  setSelector();
};

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
    $('position').innerHTML = "Executive assistant";
  } else if (person === 'person2') {
    $('name').innerHTML = "Michelle";
    $('position').innerHTML = "Project Manager";
  } else {
    $('name').innerHTML = "Linda";
    $('position').innerHTML = "Software Developer";
  }

  // Do data stuff
  var response = new XMLHttpRequest();
  response.onreadystatechange = function() {
    if (response.readyState != 4) return; // Not there yet

    if (response.status != 200) {
      console.log("Failed to make request");
      console.log(response);
      return;
    }

    $('loading').style.display = "none";
    var resp = JSON.parse(response.responseText);
    var sorting = resp.Results.output1.value.Values;

    reOrderEvents(sorting);
  };

  response.open("POST", "https://ussouthcentral.services.azureml.net/workspaces/3c1bd3d0703f4efe9c78196dc0edd3be/services/4a09f1c8757a4a389d019a3ba0f59f50/execute?api-version=2.0&details=true", true);
  response.setRequestHeader("Content-Type",
                       "application/json");
  response.setRequestHeader("Accept",
                       "application/json");
  response.setRequestHeader("Access-Control-Allow-Origin",
                       "*");
  response.setRequestHeader("Access-Control-Allow-Methods",
                       "POST, GET, PUT, UPDATE, OPTIONS");
  response.setRequestHeader("Access-Control-Allow-Headers",
                       "Content-Type, Accept, X-Auth-Token");
  response.setRequestHeader("Authorization",
                            "Bearer FEULMhAR699fWgNiAELbzVSYZaB5WXU91ap8y8gXy+Znk8Lvd5DsfIssvFIlfNf9vTCuyUyfdc308+AN47dQ3A=="),
  console.log(buildRequest(person));
  response.send(JSON.stringify(buildRequest(person)));
}

function reOrderEvents (sorting) {
  for (var i = 0; i < events.length; i++) {
    events[i].sortOrder = sorting[i][0];
  }

  var sortedEvents = events.sort(function (a, b) {
    return parseFloat(a.sortOrder) > parseFloat(b.sortOrder);
  });

  for (var j = 0; j < sortedEvents.length; j++) {
    addEvent('upcoming-events', sortedEvents[j]);
  }
}

function createBrElement () {
  return document.createElement('br');
}

function addEvent (parent, event) {
  var eventDiv = document.createElement('div');
  eventDiv.id = event.id;
  eventDiv.className = "card event";

  var eventImg = document.createElement('img');
  eventImg.className = "event-picture";
  eventImg.src = event.pictureSrc;

  eventDiv.appendChild(eventImg);

  var greyScreen = document.createElement('div');
  greyScreen.className = "grey-screen";

  eventDiv.appendChild(greyScreen);

  var eventDetails = document.createElement('div');
  eventDetails.className = "event-details";

  eventDiv.appendChild(eventDetails);

  var eventTitle = document.createElement('div');
  eventTitle.className = "event-title";
  eventTitle.innerHTML = event.title;

  eventDetails.appendChild(eventTitle);

  var eventDate = document.createElement('div');
  eventDate.className = "date";
  eventDate.innerHTML = event.date;

  eventDetails.appendChild(eventDate);

  var eventTime = document.createElement('div');
  eventTime.className = "time";
  eventTime.innerHTML = event.time;

  eventDetails.appendChild(eventTime);
  eventDetails.appendChild(createBrElement());

  var eventDescription = document.createElement('div');
  eventDescription.className = "description";
  eventDescription.innerHTML = event.description;

  eventDetails.appendChild(eventDescription);
  eventDetails.appendChild(createBrElement());
  eventDetails.appendChild(createBrElement());

  var eventStars = document.createElement('div');
  eventStars.className = "stars float-left";

  eventDetails.appendChild(eventStars);

  var eventStar5 = document.createElement('span');
  eventStar5.className = "star";
  eventStar5.title = "!Can't wait";

  eventStars.appendChild(eventStar5);

  var eventStar4 = document.createElement('span');
  eventStar4.className = "star";
  eventStar4.title = "Looking forward to it";

  eventStars.appendChild(eventStar4);

  var eventStar3 = document.createElement('span');
  eventStar3.className = "star";
  eventStar3.title = "Could be fun";

  eventStars.appendChild(eventStar3);

  var eventStar2 = document.createElement('span');
  eventStar2.className = "star";
  eventStar2.title = "I'll probably pass";

  eventStars.appendChild(eventStar2);

  var eventStar1 = document.createElement('span');
  eventStar1.className = "star";
  eventStar1.title = "No thanks";

  eventStars.appendChild(eventStar1);

  var eventAddWrapper = document.createElement('div');
  eventAddWrapper.className = "float-right";

  eventDetails.appendChild(eventAddWrapper);

  var eventAddCalendar = document.createElement('span');
  eventAddCalendar.className = "button";
  eventAddCalendar.innerHTML = "Add to Calendar";

  eventAddWrapper.appendChild(eventAddCalendar);
  eventDetails.appendChild(createBrElement());

  $(parent).appendChild(eventDiv);
}

function buildRequest (person) {
  var personInfo = [
    people[person].age,
    people[person].gender,
    people[person].city
  ];

  request = {
    "Inputs" : {
      "PersonEvent": {
        "ColumnNames" : [
          "age",
          "gender",
          "city",
          "person_golf",
          "person_tennis",
          "person_rowing",
          "person_hiking",
          "person_football",
          "person_board_games",
          "person_video_games",
          "person_programming",
          "person_pets",
          "person_politics",
          "person_music",
          "person_pizza",
          "person_coffee",
          "person_star_wars",
          "person_pokemon",
          "event_golf",
          "event_tennis",
          "event_rowing",
          "event_hiking",
          "event_football",
          "event_board_games",
          "event_video_games",
          "event_programming",
          "event_pets",
          "event_politics",
          "event_music",
          "event_pizza",
          "event_coffee",
          "event_star_wars",
          "event_pokemon",
          "rating"
        ],
        "Values": [
        ]
      }
    }
  };

  var personTags = [
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0'
  ];

  var eventTags = [
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0'
  ];

  for (var pt = 0; pt < people[person].tags.length; pt++) {
    for (var t = 0; t < tags.length; t++) {
      if (people[person].tags[pt] === tags[t]) {
        personTags[t] = "true";
      }
    }
  }

  for (var e = 0; e < events.length; e++) {
    // Reset event tags
    eventTags = [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0'
    ];

    for (var et = 0; et < events[e].tags.length; et++) {
      for (var j = 0; j < tags.length; j++) {
        if (events[e].tags[et] === tags[j]) {
          eventTags[j] = "true";
        }
      }
    }
    // Concat arrays
    request.Inputs.PersonEvent.Values.push(personInfo.concat(personTags).concat(eventTags).concat([Math.floor(Math.random() * 6) + '']));
  }

  request.GlobalParameters = {
    "Custom missing value": "false"
  };

  return request;
}

function init () {
  // Set center nav selector width
  moveSelector($("upcoming-events-nav"), true);

  for (var i = 0; i < events.length; i++) {
    addEvent('nearby', events[i]);
  }
}

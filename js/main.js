var reservationData = {};

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJD9zikAyGskhoBatCTxhD2sYtIbxoCc8",
    authDomain: "reservation-site-vc2.firebaseapp.com",
    databaseURL: "https://reservation-site-vc2.firebaseio.com",
    projectId: "reservation-site-vc2",
    storageBucket: "reservation-site-vc2.appspot.com",
    messagingSenderId: "186888821947"
  };
firebase.initializeApp(config);

//Connect to Database
var database = firebase.database();


//sets day when option is clicked
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

//when clicked all data sent to database
$('.reservation-form').on('submit', function(event) {
event.preventDefault();

  //gets the name from input field
  reservationData.name = $('.reservation-name').val();
  
  //pushed data object to my db
var reservationsReference = database.ref('reservations');

database.ref('reservations').push(reservationData);

});


// on initial load and addition of each reservation update the view
database.ref('reservations').on('child_added', function(snapshot) {
  // grab element to hook to
  var reservationList = $('.reservation-list');
  // get data from database
  var reservations = snapshot.val();
  // get your template from your script tag
  var source   = $("#reservation-template").html();
  // compile template
  var template = Handlebars.compile(source);
  // pass data to template to be evaluated within handlebars
  // as the template is created
  var reservationTemplate = template(reservations);
  // append created templated
  reservationList.append(reservationTemplate);
});


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


var database = firebase.database();

var reservationData = {};

$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

$('.reservation-form').on('submit', function(event) {
event.preventDefault();

  reservationData.name = $('.reservation-name').val();
  
  //creates a section for reservations data in my db
var reservationsReference = database.ref('reservations');

reservationsReference.push(reservationData);

});

//visual confirmation
function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function(results) {

    // Get all reservations stored in the results we received back from Firebase
    var allReservations = results.val();

    // remove all list reservations from DOM before appending list reservations
    $('.reservations').empty();

    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {
    // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };

  var source = $("#reservation-template").html();

  var template = Handlebars.compile(source);

  var reservationListItem = template(context);

  $('.reservations').append(reservationListItem);

    }

  });

}


// When page loads, get reservations
getReservations();
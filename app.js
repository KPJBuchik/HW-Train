var firebaseConfig = {
    apiKey: "AIzaSyBJJoSZrZPOyM6WAETywSpoudbRRaYI0IM",
    authDomain: "train-app-56639.firebaseapp.com",
    databaseURL: "https://train-app-56639.firebaseio.com",
    projectId: "train-app-56639",
    storageBucket: "",
    messagingSenderId: "819659758419",
    appId: "1:819659758419:web:d19caf94d4fc649b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


$("#add-train-button").on("click", function (event) {
    event.preventDefault();
    if  ($(".form-control").val() !== "") {
    ($(".alert-success").show())
    var trainName = $("#train-name-input").val().trim();

    var dest = $("#destination-input").val().trim();

    var firstTrainTime = $("#first-train-input").val().trim();

    var frequency = $("#frequency-input").val().trim();




    var newTrain = {
        name: trainName,
        destination: dest,
        firstTrain: firstTrainTime,
        freq: frequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.freq);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");


    }
    
    else {($(".alert-danger").show())}

});





database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().freq;
    console.log(trainName);
    console.log(dest);
    console.log(firstTrainTime);
    console.log(frequency);

    var firstTrainConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTilTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTilTrain);

    var nextTrain = moment().add(tMinutesTilTrain, "minutes").format('hh:mm A');
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTilTrain)

    );

    $("#train-table > tbody").append(newRow);


})


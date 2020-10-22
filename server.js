var express = require("express");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000
var app = express();

app.use(express.json());
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")


app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})

var reservations = [
	{
		name: "Person 1",
		phone: "123456888",
		email: "Person1@gmail.com",
		uid: 1
	},
	{
		name: "Person 2",
		phone: "123456788",
		email: "Person2@gmail.com",
		uid: 2
	}
];

var waitingList = [
	{
		name: "Person 3",
		phone: "123456789",
		email: "Person3@gmail.com",
		uid: 3
	}
];

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/tables", function(req, res) {
    res.render("tables", {reservations, waitingList});
});

app.get("/reserve", function(req, res) {
    res.render("reserve");
});

app.get("/api/tables", function(req, res) {
	return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
	return res.json(waitingList);
});

app.post("/api/tables", function(req, res) {
  var newReservation = req.body;

  console.log(newReservation);
  
  if (reservations.length < 5) {
	reservations.push(newReservation);
	res.json(true);
  } else {
	waitingList.push(newReservation);
	res.json(false);
  }

});
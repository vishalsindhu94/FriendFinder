var path = require("path");
var friends = require("../data/friends");

module.exports = function(app) {

function calculateDifference(friend1, friend2) {
  var score = 0;
  for (var i = 0; i < 10; i++) {
    score += Math.abs(parseInt(friend1.scores[i]) - parseInt(friend2.scores[i]));
  }
  
  return score;
}



app.get("/api/friends", function (req, res) {
  return res.json(friends);
});


app.post("/api/friends", function (req, res) {

  var newfriend = req.body;

  console.log(newfriend);
  var bestMatchID = 0;
  var bestMatchScore = 20; 
  for (var i = 0; i < friends.length; i++) {
    var match = calculateDifference(newfriend, friends[i]);
    console.log("Your best match " + match + " at id " + i);
    if (match < bestMatchScore) {
      bestMatchScore = match;
      bestMatchID = i;
    }
  }

  friends.push(newfriend);

  res.json(friends[bestMatchID]);
});

}
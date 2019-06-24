var friends = require("../data/friends");
var path = require("path");

module.exports = function apiRoutes(app){

    app.get("/api/friends", function(req,res){
        res.json(friends);
    });

    app.post("/api/friends", function(req,res){
        
        var newFriend = req.body;
        console.log("User enterd "+JSON.stringify(newFriend));
        
        var friendScores = newFriend.scores;
        var friendMatch ="";
        var matchPhoto = "";
        
        var totalDiff = 1000;

        for(var i =0; i< friends.length; i++){

            var diff = 0;
            for(var j = 0; j< friendScores; j++){
                diff += Math.abs(friends[i].scores[j] - friendScores[j]);
            }
            if(diff < totalDiff){
                totalDiff =diff;
                friendMatch = friends[i].name;
                matchPhoto = friends[i].photo;
            }
        }
        friends.push(newFriend);
        res.json({staus: "ok",friendMatch: friendMatch, matchPhoto: matchPhoto })
    });
};
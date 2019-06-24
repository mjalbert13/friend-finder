var friends = require("../data/friends");
var path = require("path");
var friendArray = friends.friendslist;

module.exports = function apiRoutes(app){

    app.get("/api/friends", function(req,res){
        res.json(friends);
    });

    app.post("/api/friends", function(req,res){
        
        var newFriend = req.body;
        console.log("User enterd "+JSON.stringify(newFriend));
        
        var friendScores = newFriend.scores;
        var differences = [];
        var people = []
        
        friendArray.forEach(function(person){
            var matchScore = person.scores;
            var totalDiff = 0;

            for(var i = 0; i < matchScore.legth; i++){
                totalDiff += Math.abs(matchScore[i] - friendScores[i]);
            }
            differences.push(totalDiff);
            differences.sort();
            bestScore = differences[0];
            people.push({name: person.name, photo: person.photo, differences: totalDiff } )
        });
        var bestMatch = people.find(function(element){
            return element.differences === bestScore;
        });
        friendArray.push(newFriend);
        res.json(bestMatch);
    });

    // app.post("/api/friends", function(req,res){
    //     var userInput = req.body;
    //     var friendScores = userInput.scores;
    
    //     var friendMatch ="";
    //     var matchPhoto = "";
    
    //     var totalDiff = 1000;
    //     for(var i =0; i< friends.length; i++){
    
    //         var diff = 0;
    //         for(var j = 0; j< friendScores; j++){
    //             diff += Math.abs(friends[i].scores[j] - friendScores[j]);
    //         }
    //         if(diff < totalDiff){
    //             totalDiff =diff;
    //             friendMatch = friends[i].name;
    //             matchPhoto = friends[i].photo;
    //         }
    //     }
    //     friends.push(newFriend);
    //     res.json({staus: "ok",friendMatch: friendMatch, matchPhoto: matchPhoto })
    
    // });
};
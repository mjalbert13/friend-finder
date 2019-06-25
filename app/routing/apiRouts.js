var friends = require("../data/friends.js");
var path = require("path");
var friendArray = friends;


module.exports = function(app){

    app.get("/api/friends", function(req,res){
        res.json(friends);
    });

    // app.post("/api/friends", function(req,res){
    //     var newFriend = req.body;
    //     var friendScores = newFriend.answers;
    
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

    // app.post("/api/friends", function(req,res){
        
    //     var newFriend = req.body;
    //     console.log(newFriend);
        
    //     var friendScores = newFriend.answers;
    //     var differences = [];
    //     var people = []
        
    //     friendArray.forEach(function(person){
    //         var matchScore = person.answers;
    //         var totalDiff = 0;

    //         for(var i = 0; i < matchScore.legth; i++){
    //             totalDiff += Math.abs(matchScore[i] - friendScores[i]);
    //         }
    //         differences.push(totalDiff);
    //         differences.sort();
    //         bestScore = differences[0];
    //         people.push({name: person.name, photo: person.photo, differences: totalDiff } )
    //     });
    //     var bestMatch = people.find(function(element){
    //         return element.differences === bestScore;
    //     });
    //     friendArray.push(newFriend);
    //     res.json(bestMatch);
    //     console.log(bestMatch
    //         )
    // });

    app.post("/api/friends", function(req, res){

        var userPoints = 0;
        var newFriend = req.body;

        console.log(newFriend);

        for(var i =0; i< newFriend.length;i++){
            userPoints += parseInt(newFriend.answers[i]) 
            console.log(userPoints);
        }
        

        var matchPoints = 0;
        var compArray =[];

        for(var i =0; i< friendArray.length; i++){
            pointsArray = friendArray[i].scores;
            for(var j = 0; j < pointsArray.length; j++){
                matchPoints += parseInt(pointsArray[j]);
            }

            var compare = Math.abs(userPoints - matchPoints);
            console.log("Diff between "+req.body.name+" and match are "+friendArray[i].name+" is "+compare);
            compArray.push(compare);
            matchPoints = 0;
        }

        Array.min =function(array){
            return Math.min.apply(Math,array);
        };
        var minimum = Array.min(compArray);
        //console.log(minimum);
       
        var indexNum = compArray.indexOf(minimum);
        //console.log(indexNum);
       
        var bestFriend = friendArray[indexNum].name;
        console.log(bestFriend);
        
        res.json(friendArray[indexNum]);
        console.log(friendArray[indexNum]);
        friendArray.push(req.body);
    });

};
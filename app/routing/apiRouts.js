var friends = require("../data/friends.js");
var path = require("path");
var friendArray = friends;


module.exports = function(app){

    app.get("/api/friends", function(req,res){
        res.json(friends);
    });

    app.post("/api/friends", function(req,res){

        var finalDiff =0;
        var newBest ={
            name: "",
            photo: "",
            diffBetween: 1000
        };

        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;
        var convertScore =userScores.map(function(item){
            return parseInt(item,10);
        })
        console.log("Name: "+userName);
        console.log("User Score: "+userScores);
        var sum = convertScore.reduce((a,b)=> a + b,0);
        console.log("Sum of user score: "+sum);
        console.log("Best match friend diff: "+newBest.diffBetween);
        console.log("++++++++=========++++++++++");

        for(var i=0; i<friends.length; i++){
            console.log(friends[i].name);
            finalDiff = 0;
            console.log("Total diff: "+finalDiff);


            var bfScores = friends[i].scores.reduce((a,b)=>a + b, 0);
            console.log("Total friend score: "+bfScores);
            finalDiff += Math.abs(sum - bfScores);

            // for(var j = 0; j < friends[i].scores[j]; j++){

            //     finalDiff += Math.abs(sum -parseInt(friends[i].scores[j]));
            //     console.log(friends[i].scores[j]+ "Friend scores");
            // };

            if(finalDiff <= newBest.diffBetween){

                newBest.name = friends[i].name;
                newBest.photo = friends[i].photo;
                newBest.diffBetween = finalDiff;
            };
            console.log(finalDiff +" Total Diff");
        }
        console.log("your new best friend is "+newBest.name);
        friends.push(userData);
        console.log("New user added")
        console.log(userData);
        res.json(newBest);
    
    })
};
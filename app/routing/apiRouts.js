var friends = require("./../data/friends");
var friendsArray = friends.friendslist;

module.exports = function apiRoutes(app){

    app.get("/api/firiends", function(req,res){
        return res.json(friends);
    });

    app.post("/api/friends", function(req,res){
        
        var newEntry = req.body;
        var newScores =newEntry.answers;
        var diffAarray =[];
        var friend =[];

        friendsArray.forEach(function(newFriend){
            var matchScore = newFriend.answers;
            var totalDiff = 0;

            for(var i=0; i< matchScore.length; i++){
                totalDiff += Math.abs(matchScore[i]-newScores[i]);
            }
            diffAarray.push(totalDiff);
            diffAarray.sort();
            topScore = diffAarray[0];
            friend.push({name: newFriend.name, photo: newFriend.photo, differnce: totalDiff});
        });
        var matchFriend = friend.find(function(element){
            return element.differnce === topScore;
        });
        friendsArray.push(newEntry);
        res.json(matchFriend);
    });
};
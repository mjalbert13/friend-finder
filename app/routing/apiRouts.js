module.exports = function apiRoutes(app){

    var fs = require("fs");
    var path = require("path");
    var friends = require("./../data/friends");

    app.get("/api/firiends", function(req,res){
        return res.json(friends);
    });

    app.post("/api/friends", function(req,res){
        
        var totaldif;
        var diffAray = [];
        var newEntry = req.body;

        for(var i = 0; i< friends.length; i++){
            totaldif =0;
            for(var k= 0; k < newEntry.scores.length; i++){
                totaldif += Math.abs(friends[i].scores[k]-newEntry.scores[k]);
            }
            diffAray.push(totaldif)
        }
        var friendMatch = diffAray.indexOf(Math.min(...diffAray));

        friends.push(newEntry);
        console.log(newEntry);

        fs.readFile(path.join(__dirname,"../data/friends.json"),"utf8",function(err,data){
            if(err) throw err;
            var json =JSON.parse(data);
            json.push(newEntry);
            fs.watchFile(path.join(__dirname, "../data/friends.json"),JSON.stringify(json,null,2),function(err){
                if(err) throw err;
            });
        });
        res.json(friends[friendMatch]);
    });
};
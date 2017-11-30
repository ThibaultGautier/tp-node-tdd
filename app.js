
var express = require("express")
var app = express()
var bodyparser = require("body-parser")

app.use(bodyparser.json())


app.listen(3000, function(){
    console.log("Connecte");
})

app.route('/course')
    .post(function(req, res){
        console.log("req.body")
        var tempArray = req.body.object;
        var newCourse = {titre:req.body.titre, articles:req.body.articles}
        tempArray.push(newCourse);
        console.log("TEMP ARRAY : " + tempArray)
        res.send(tempArray)
    })  
    .get(function(req, res){
        console.log("course : " + courses); 
    })

module.exports = app


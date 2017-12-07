var express = require("express")
var app = express()
var bodyparser = require("body-parser")
var db = require("./test/fixtures/courses")
var listeDeCourses = db.courseListe

app.use(bodyparser.json())

if(!module.parent){
app.listen(3000, function(){
    console.log("Connecte");
})
}


app.route('/course')
    .post(function(req, res){
        db.push(req.body)
        res.json(db);
    })  
    .get(function(req, res){
        res.json(db)
    })
    .delete(function(req, res){
        for(var i = 0; i<db.length; i++){
            if(db[i].id == req.body.id){
                db.splice(i, 1);
            }
        }
        res.json(db)
    })

module.exports = app


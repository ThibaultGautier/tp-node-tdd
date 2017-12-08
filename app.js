const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const courseListRouter = require("./routes/course-list-routes")

app.use(bodyparser.json())

app.use('/course', courseListRouter)

if(!module.parent){
    app.listen(3000, function(){
        console.log("Connected");
    })
}


module.exports = app


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



// app.use((req, res, next) => {
//   return next(new NotFoundError())
// })

// app.use((err, req, res, next) => {
//   if (!(err instanceof HttpError)) {
//     console.error(err)
//     err = new HttpError(err.message || 'Unknown error')
//   }

//   res.status(err.statusCode)
//   res.json({
//     error: err
//   })
// })

module.exports = app


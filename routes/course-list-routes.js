const express = require("express")
const courseListRouter = express()
const bodyparser = require("body-parser")
const db = require("../data/courses")

courseListRouter.route('')
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

courseListRouter.route('/:id/articles')
    .get(function(req, res){
        for(var i = 0; i<db.length; i++){
            if(db[i].id == req.params.id){
                res.json(db[0].articles)
            }
        }
    })

    .post(function(req, res){
        for(var i = 0; i<db.length; i++){
            if(db[i].id == req.params.id){
                articlesList = db[0].articles
                articlesList.push(req.body)
                res.json(articlesList)
            }
        }
    })

courseListRouter.route('/:course_id/articles/:article_id/flag')
    .post(function(req, res){
        for(var i = 0; i<db.length; i++){
            if(db[i].id == req.params.course_id){
                articlesList = db[0].articles
                articlesList[req.params.article_id].flag = req.body.flag_value
                res.json(articlesList)
            }
        }
    })

module.exports = courseListRouter
const request = require("supertest")
var file = require("fs")
require('chai').should()
const app = require('./../../app')
var listeDeCourses = require("../fixtures/courses")
const bodyParser = require("body-parser")
app.use(bodyParser.json())

describe('Courses', () =>{
    describe('Create course list', () =>{
        it("Should create a list of courses", () =>{
            return request(app).post('/course').send({"id":3,"title":"Première course"}).then((res) => {
                res.status.should.be.eq(200)
                res.body.should.be.a('array')
                res.body.should.not.have.lengthOf(0) 
                res.body[1].id.should.be.eq(3)
                res.body[1].title.should.be.eq("Première course")
            }).catch((err) => {
                throw new Error('Erreur')
            })
        })
    })
    describe('Delete course list', ()=>{
        it("Should delete a list of course named 'Première course'", ()=>{
           return  request(app).delete('/course').send({"id":"3"})
                        .then((res) => {
                           res.body.should.have.lengthOf(1)
                           res.body[0].id.should.be.eq(1)
                           res.body[0].title.should.be.eq("Ma course")
                        }).catch((err)  =>{
                            throw new Error(err);
                         })
        })
    })
    describe('Get course list', ()=>{
        it("Should get a list of all courses", ()=>{
           return  request(app).get('/course')
                        .then((res) => {
                           res.body.should.not.have.lengthOf(0)
                        }).catch((err)  =>{
                            throw new Error(err);
                         })
        })
    })
})
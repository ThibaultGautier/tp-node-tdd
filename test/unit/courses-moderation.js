const request = require("supertest")
require('chai').should()
const bodyParser = require("body-parser")

const app = require('./../../app')
app.use(bodyParser.json())

const listeDeCourses = require("../../data/courses")
const listeDeCoursesFixture = require("../fixtures/coursesFixture")

describe('Courses', () =>{

    beforeEach(() => { listeDeCoursesFixture.up() })
    afterEach(() => { listeDeCoursesFixture.down() })
    
    describe('Create course list', () =>{
        it("Should create a list of courses", () =>{
            return request(app).post('/course').send({"id":3,"title":"Première course"})
                .then((res) => {
                    const listCourses = res.body 
                    const lastCourse = res.body[1]
                    listCourses.should.be.a('array')
                    listCourses.should.have.lengthOf(2)
                    listCourses[listCourses.length - 1].should.be.eq(lastCourse)
            }).catch((err) => {
                throw new Error(err)
            })
        })
    })

    describe('Delete course list', ()=>{
        it("Should delete a list of course", ()=>{
           return  request(app).get('/course')
                        .then((res) => {
                           res.body.should.have.lengthOf(1)
                           request(app).delete('/course').send({"id":"1"})
                           .then((res) => {
                                res.body.should.have.lengthOf(0)
                           })

                        }).catch((err)  =>{
                            throw new Error(err);
                        })
                    })
                })

    describe('Get course list', ()=>{
        it("Should get a list of all courses", ()=>{
           return  request(app).get('/course')
                        .then((res) => {
                            res.body.should.have.lengthOf(1)
                            res.body[0].title.should.eql("Ma course")
                        }).catch((err)  =>{
                            throw new Error(err);
                         })
        })
    })

    describe('Get articles of a course list', ()=>{
        it("Should get a list of articles of a given course list", ()=>{
           return  request(app).get('/course/1/articles')
                        .then((res) => {
                            const articlesList = res.body
                            articlesList.should.have.lengthOf(2)
                            articlesList[0].name.should.eql("carottes")
                            articlesList[1].name.should.eql("pain")
                        }).catch((err)  =>{
                            throw new Error(err);
                        })
        })
    })

    describe('Add an article on a course list', ()=>{
        it("Should add an articles in a given course list", ()=>{
           return  request(app).post('/course/1/articles').send({"name":"chocolat"})
                        .then((res) => {
                            const articlesList = res.body
                            articlesList.should.have.lengthOf(3)
                            articlesList[articlesList.length - 1].name.should.eql("chocolat")
                        }).catch((err)  =>{
                            throw new Error(err);
                        })
        })
    })

   describe('Set an article flag as OK on a course list', ()=>{
        it("Should set an article flag as OK in a given course list", ()=>{
           return  request(app).post('/course/1/articles/1/flag').send({"flag_value":"OK"})
                        .then((res) => {
                            const article = res.body[1]
                            article.name.should.eql("pain")
                            article.flag.should.eql("OK")
                        }).catch((err)  =>{
                            throw new Error(err);
                        })
        })
    })
})
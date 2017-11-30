const request = require("supertest")
var file = require("fs")
var liste = []
var base_size = 0

require('chai').should()
const app = require('./../../app')

beforeEach(() => {
    var rawdata = file.readFileSync('../../test/fixtures/courses.json')
    var courses = JSON.parse(rawdata); 
    liste.push(courses)
    
})

describe('Courses', () =>{
    describe('Create course list', () =>{
        it("Should create liste of courses", (done) =>{
            console.log(base_size)
            return request(app).post('/course').send({object: liste, "titre":"nouvelle course", "articles": ["a", "a", "a"]})
                   .then((res) =>  {
                       supposed_size = base_size + 1
                       console.log("res = " + res.body)
                      
                   }).catch((err) => {console.log(err)})
        })
    })
})
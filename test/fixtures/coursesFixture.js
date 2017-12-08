const courseList = require('./courses')

mockData = [
  {
    "id": 1,
    "title": "Ma course",
    "articles": [ {"name": "carottes", "flag": "OK"},
    							{"name": "pain", "flag":"KO"}]
  }
]

module.exports = {
  up: () => {
    courseList.splice(0)
    courseList.push.apply(courseList, mockData)
  },

  down: () => {
    courseList.splice(0)
  }
}
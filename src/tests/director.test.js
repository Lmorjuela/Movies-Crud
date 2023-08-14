const request = require("supertest")
const app = require("../app")
require("../models")

const URL_DIRECTORS = '/api/v1/directors'

let directorId

const director = {
    firstName:"James",
    lastName:"Cameron",
    nationality:"USA",
    image:"https://i.pinimg.com/originals/b5/b9/9f/b5b99fead8b534044eff4e7f14cec375.png",
    birthday:"08-16-1954"
}

test("POST -> 'URL_DIRECTORS', should return status code 201 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .post(URL_DIRECTORS)
        .send(director)

    directorId= res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET 'URL_DIRECTORS', should return status code 200, and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_DIRECTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
})

test("GET 'URL_DIRECTORS/:Id', should return status code 200 res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("PUT 'URL_DIRECTORS/:Id', should return status code 200 res.body.firstName === directorUpdate.firstName", async () => {

    const directorUpdate = {
        firstName:"James Francis"
    }

    const res = await request(app)
      .put(`${URL_DIRECTORS}/${directorId}`)
      .send(directorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
})

test("DELETE 'URL_DIRECTORS/:Id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${URL_DIRECTORS}/${directorId}`)
  
    expect(res.status).toBe(204)
})


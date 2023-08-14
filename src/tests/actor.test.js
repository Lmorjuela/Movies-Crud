const request = require("supertest")
const app = require("../app")
require("../models")

const URL_ACTORS = '/api/v1/actors'

let actorId

const actor = {
    firstName:"Ariana",
    lastName:"Grande",
    nationality:"USA",
    image:"http://celebmafia.com/wp-content/uploads/2015/03/ariana-grande-photoshoot-in-atlanta-march-2015_2.jpg",
    birthday:"06-26-1993"
}

test("POST -> 'URL_ACTORS', should return status code 201 and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .post(URL_ACTORS)
        .send(actor)

    actorId= res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET 'URL_ACTORS', should return status code 200, and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_ACTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
})

test("GET 'URL_ACTORS/:Id', should return status code 200 res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .get(`${URL_ACTORS}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT 'URL_ACTORS/:Id', should return status code 200 res.body.firstName === actorUpdate.firstName", async () => {

    const actorUpdate = {
        firstName:"Shakira"
    }

    const res = await request(app)
      .put(`${URL_ACTORS}/${actorId}`)
      .send(actorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
})

test("DELETE 'URL_ACTORS/:Id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${URL_ACTORS}/${actorId}`)
  
    expect(res.status).toBe(204)
})


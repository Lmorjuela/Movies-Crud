const request = require("supertest")
const app = require("../app")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
require("../models")

const URL_MOVIES = '/api/v1/movies'
let movieId


const movie = ({
    name: "Avatar",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Avatar-Logo-avatar.svg/450px-Avatar-Logo-avatar.svg.png",
    synopsis:"AVATAR nos lleva a un mundo situado más allá de la imaginación, en donde un recién llegado de la Tierra se embarca en una aventura épica, llegando a luchar, al final, por salvar el extraño mundo al que ha aprendido a llamar su hogar.",
    releaseYear:2022
})

test("POST -> 'URL_MOVIES', should return status code 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
      .post(URL_MOVIES)
      .send(movie)
  
    movieId = res.body.id
  
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
  })

  test("GET 'URL_MOVIES', should return status code 200, and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_MOVIES)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
})

test("GET 'URL_MOVIES/:Id', should return status code 200 res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("PUT 'URL_MOVIES/:Id', should return status code 200 res.body.name === movieUpdate.name", async () => {

    const movieUpdate = {
      name: "Avatar: The way of water"
    }
    const res = await request(app)
      .put(`${URL_MOVIES}/${movieId}`)
      .send(movieUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
  
})


test("POST ->'URL_MOVIES/:id/actors', should retrun status code 200 and res.body.length === 1", async () => {

    const actor = {
        firstName:"Ariana",
        lastName:"Grande",
        nationality:"USA",
        image:"http://celebmafia.com/wp-content/uploads/2015/03/ariana-grande-photoshoot-in-atlanta-march-2015_2.jpg",
        birthday:"06-26-1993"
    }
  
    const createActor = await Actor.create(actor)
  
    const res = await request(app)
      .post(`${URL_MOVIES}/${movieId}/actors`)
      .send([createActor.id])
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createActor.id)
  
    await createActor.destroy()
})

test("POST ->'URL_MOVIES/:id/directors', should retrun status code 200 and res.body.length === 1", async () => {

    const director = {
        firstName:"James",
        lastName:"Cameron",
        nationality:"USA",
        image:"https://i.pinimg.com/originals/b5/b9/9f/b5b99fead8b534044eff4e7f14cec375.png",
        birthday:"08-16-1954"
    }
  
    const createDirector = await Director.create(director)
  
    const res = await request(app)
      .post(`${URL_MOVIES}/${movieId}/directors`)
      .send([createDirector.id])
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createDirector.id)
  
    await createDirector.destroy()
})

test("POST ->'URL_MOVIES/:id/genres', should retrun status code 200 and res.body.length === 1", async () => {

    const genre = {
        name: "fiction"
      }
  
    const createGenre = await Genre.create(genre)
  
    const res = await request(app)
      .post(`${URL_MOVIES}/${movieId}/genres`)
      .send([createGenre.id])
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createGenre.id)
  
    await createGenre.destroy()
})


test("DELETE 'URL_MOVIES/:Id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${URL_MOVIES}/${movieId}`)
  
    expect(res.status).toBe(204)
})



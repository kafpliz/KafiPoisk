const express = require('express')
const { connectToDb, getDb } = require('./db')
let db;
const port = 3000
const app = express()
const topFilm = require('./routes/topFilm.route')
const film = require('./routes/film.route')
const person = require('./routes/person.route')
const catalog = require('./routes/catalog.route')
const main = require('./routes/main.route')
const search = require('./routes/search.route')


const hbs = require('hbs')
const path = require('path')
const { API_TOKEN } = process.env


app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.use(express.static('public'))


app.get('/',main)


app.use(express.json())

connectToDb((err) => {
    if (!err) {
        app.listen(port, (err) => {
            err ? console.log(err) : console.log('Starting..');
        })
        db = getDb()
    } else {
        console.log((err));
    }
})





app.use('/top', topFilm)
app.use('/film', film)
app.use('/person', person)
app.use('/catalog', catalog)
app.use('/search', search)

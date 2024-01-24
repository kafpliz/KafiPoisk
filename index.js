const express = require('express')
const port = 3000
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
require('dotenv').config();

const topFilm = require('./routes/topFilm.route')
const film = require('./routes/film.route')
const person = require('./routes/person.route')
const catalog = require('./routes/catalog.route')
const main = require('./routes/main.route')
const search = require('./routes/search.route')
const authRouter = require('./routes/authRouter')
const posts = require('./routes/postRouter')
const loginPage = require('./routes/login-page.router')


const hbs = require('hbs')
const path = require('path')
const { API_TOKEN } = process.env


app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.use(express.static('public'))
app.get('/',main)
app.use(express.json())


app.use('/top', topFilm)
app.use('/film', film)
app.use('/person', person)
app.use('/catalog', catalog)
app.use('/search', search)

app.use('/login', loginPage )
app.use('/auth', authRouter)
app.use('/posts', posts)



const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://kafpliz:kafonepiece@cluster0.t2zkz.mongodb.net/?retryWrites=true&w=majority
        `)
        app.listen(PORT, () => { console.log('working'); })
    } catch (error) {
        console.log(error);
    }
}

start()
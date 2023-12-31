const express = require('express')
const { connectToDb, getDb } = require('./db')
let db;
const port = 3000
const app = express()
const topFilm = require('./routes/topFilm.route')
const film = require('./routes/film.route')
const person = require('./routes/person.route')
const catalog = require('./routes/catalog.route')

const hbs = require('hbs')
const path = require('path')

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.use(express.static('public'))


app.get('/',(req, res) => {
    res.render('main.hbs', {home: true})
})

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


/* 
app.use('/login', async (req, res) => {
    const {name, email, password} = req.body
    const prop = await db.collection('users').find({name: name})
    if(prop){
        console.log('такое имяестьв бд');
    } else{
        console.log(500);
    }
     let users = []
   
        .forEach(user => { users.push(user) })
        .then(() => { res.status(200).json(users) }) 
        .catch((err) => {
            res.status(500).json({error: err })
        })    
    console.log("-----------------------------------------------------------------");


})
 */


app.use('/top', topFilm)
app.use('/film', film)
app.use('/person', person)
app.use('/catalog', catalog)

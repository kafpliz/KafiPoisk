const { MongoClient } = require('mongodb')
require('dotenv').config()
const { MONGOBD } = process.env

let dbConnect;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(MONGOBD)
        .then((client)=>{ 
            console.log('Connected');
            dbConnect = client.db()
            return cb()
        })
        .catch((err)=> {
            return cb(err)
        })
     },
    getDb: () => dbConnect
}
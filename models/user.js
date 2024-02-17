const { Schema, model } = require('mongoose')

const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{type: String, ref: 'Role'}],
    posts: [{type: Array,required: false }],
    avatar:{type: 'string', required: false},
    bookmarks: [],
    registrationDate: {type: String},
    registrationTime: {type: String},

})

module.exports = model('User',User)
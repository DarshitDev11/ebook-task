const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title:{
        type:String,
        required :true
    },
    auther:{
        type : String,
        required : true
    },
},{ timestamps: true })

const Book = mongoose.model('book',bookSchema);
module.exports = Book;
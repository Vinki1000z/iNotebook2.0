const mongoose = require('mongoose');


const NotesSchema = new mongoose.Schema({
    description:{
        type:String
    },
    title:{
        type:String
    },
    date:{
        type: Date, default: Date.now 
    },
    user: { type: mongoose.ObjectId, ref: "authNotes" }

  });

module.exports =  mongoose.model('notes', NotesSchema);
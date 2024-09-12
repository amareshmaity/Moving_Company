const mongoose = require("mongoose");


// function for database connection
async function connectToMongoDB(url){
    // mongoose.set('bufferCommands', false); // Disable buffering of commands
    return await mongoose.connect(url);
}

module.exports = { connectToMongoDB };
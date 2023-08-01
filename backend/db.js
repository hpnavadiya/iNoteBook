const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://admin:admin@cluster0.klicioh.mongodb.net/iNoteBook";

// mongoose return propmis 
const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to mongoose successfully")
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = connectToMongo;
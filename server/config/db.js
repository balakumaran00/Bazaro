// db.js
const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://Bazaro:bazaro@cluster0.e7hw53i.mongodb.net/bazaro?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToDatabase;

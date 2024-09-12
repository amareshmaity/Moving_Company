const mongoose = require("mongoose");

const quickQuoteSchema = new mongoose.Schema({
    movingFrom: {
        type: String,
    },
    movingTo: {
        type: String,
    },
    date: {
        type: String,
    },
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const QuickQuote = mongoose.model("QuickQuote", quickQuoteSchema);
module.exports = {QuickQuote};

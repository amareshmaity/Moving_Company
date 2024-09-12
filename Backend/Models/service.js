const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    serviceTitle: {
        type: String,
        required: [true, "Service title is required"]
    },
    serviceDescription: {
        type: String,
        required: [true, "Service description is required"]
    },
    serviceAvailability: {
        type: String,
        required: [true, "Please select below option"]
    },
    imageURL: {
        type: String,
        required: [true, "Image URL is required"]
    },
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admins"
        }
    ,
    bookedBy: [
        
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = {Service};

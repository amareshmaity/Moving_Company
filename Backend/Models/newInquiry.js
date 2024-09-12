const mongoose = require("mongoose");

const newInquirySchema = new mongoose.Schema({
    inquiryMessage: {
        type: String,
    },
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const NewInquiry = mongoose.model("NewInquiry", newInquirySchema);
module.exports = {NewInquiry};

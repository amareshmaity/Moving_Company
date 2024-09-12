const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    signupAs: {
        type: String,
        default: 'admin'
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Validates email format
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\\\/'`~;_\-+=])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]\\\/'`~;_\-+=]{8,}$/.test(v); // Validates password format
            },
            message: `Password must include at least one uppercase letter, one lowercase letter, one number, and one special character`
        }
    },
    rollInCompany: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true    // Set default value to true
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "services",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now // Set default value to the current date and time
    }
    
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = {Admin};
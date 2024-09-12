const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    signupAs: {
        type: String,
        default: 'user'
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be positive'],
        max: [120, 'Age must be less than or equal to 120']
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
    mobile: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
          validator: function(v) {
            // Regular expression to validate Indian mobile numbers
            return /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/.test(v);
          },
          message: props => `${props.value} is not a valid mobile number!`
        }
      },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required'],
            minlength: [3, 'Street must be at least 3 characters long'],
            maxlength: [100, 'Street must be at most 100 characters long']
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            minlength: [2, 'City must be at least 2 characters long'],
            maxlength: [50, 'City must be at most 50 characters long']
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            minlength: [2, 'State must be at least 2 characters long'],
            maxlength: [50, 'State must be at most 50 characters long']
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
    bookedService: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "services",
        }
    ]
});


const User=mongoose.model('User',userSchema)
module.exports ={User};
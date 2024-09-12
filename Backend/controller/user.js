const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const { User } = require("../Models/user");
const { Service } = require("../Models/service");
const { QuickQuote } = require("../Models/quickQuote");
const { NewInquiry } = require("../Models/newInquiry")

async function handleUserSignup(req, res){
    let {name, age, email, mobile, password} = req.body;

    let street = req.body['addressStreet'];
    let city = req.body['addressCity'];
    let state = req.body['addressState'];

    // Initialize an object to hold validation errors
    let validationErrors = {};

    // Creating new user
    const newUser = new User({
    name,
    age,
    email,
    mobile,
    address: {
        street,
        city,
        state
    },
    password,
    bookedService:[]
  
    });

    // console.log('new user', newUser);
    try{
        console.log('validation')
        // validate the user using mongoose
        await newUser.validate();
        console.log('validation')

    } catch (error) {
        // console.log(error);
        // console.log(error.name);
        // console.log(error.errors);
        if (error.name === 'ValidationError') {
            for (let field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }
            // console.log(validationErrors);
            return res.status(400).json({ errors: validationErrors });
        } else {
            console.error('Server error: ', error);
            return res.status(500).json({ message: 'Server Error'});
        }
    }

    try {
        // save the new user
        await newUser.save();
        console.log('New user created:', newUser);

        // Send a success response
        res.status(201).json({ message: 'New user created' });
    } catch (error) {
        console.log(error.code);
        console.log(error);
        if (error.code === 11000) {
            // Duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            const fieldValue = Object.values(error.keyValue)[0];
            console.log(field);
            const duplicateError = {};
            duplicateError[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} ${ fieldValue} already exists`;
            return res.status(400).json({ errors: duplicateError });
        } else {
            res.status(500).json({ message: 'Server Error' });
        }
    }
}
async function handleUserSignin(req, res){
    try {
        let { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({error:'Signin failed! Incorrect email id'});
        }

        // Compare the provided password with the stored hashed password
        // Compare the provided password with the stored password (plain text comparison)
        if (password !== user.password) {
            return res.status(404).send({ error: 'Signin failed! Incorrect password' });
        }

        // If everything is correct
        //make a session cookies
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('user_data', JSON.stringify({ userid: sessionId, user_type: "user"}),{
            httpOnly: false, // Allow access from JavaScript
            secure: false, // Set to true in production if using HTTPS
        });

        //send a successful response
        res.status(200).send({message:'Signin successful'});
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        res.status(500).send('Server error');
    }
}

async function handleBookService(req, res) {
    const serviceId = req.body.serviceId;
    console.log("Service Id: ", serviceId);

    const userId = req.user;
    console.log("user", userId);

    try {
        // Find the service by ID and update the bookedBy field
        const updatedService = await Service.findByIdAndUpdate(
            serviceId, 
            { $push: { bookedBy: userId } },  // Add the user ID to the bookedBy array
            { new: true }                    // Return the updated document
        );

        if (!updatedService) {
            return res.status(404).send({ error: 'Service not found' });
        }
        
        // Find the user by ID and update the bookedService field
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { 
                $push: {
                    bookedService: serviceId,    
                } 
            },  // Add the service ID to the bookedService array
            { new: true }                    // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send({ message: 'You have successfully booked the service'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }


}

// Handle view orders
async function handleViewOrders(req, res){

    const userId = req.user;
    console.log("user", userId);

    const bookedServices = req.user.bookedService;
    console.log(bookedServices);

    try {
        // Find the service by ID and update the bookedBy field
        const orderedServicesPromises = bookedServices.map(async serviceId => {return await Service.findById(serviceId)});

        console.log(orderedServicesPromises);
        const orderedServices = await Promise.all(orderedServicesPromises);
        console.log(orderedServices);
        if (!orderedServices) {
            return res.status(404).send({ error: 'Orders not found' });
        }
        
        res.status(200).send({ orderedServices: orderedServices});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }

}

async function handleQuickQuote(req, res){
    let {movingFrom, movingTo, date} = req.body;
    // const userId = req.user;
    // console.log(userId);
    // Initialize an object to hold validation errors
    let validationErrors = {};

    // Creating new user
    const newQuickQuote = new QuickQuote({
        movingFrom, 
        movingTo, 
        date,
        createdBy: req.user._id
    });

    try {
        // save the new QuickQuote
        await newQuickQuote.save();
        console.log('New QuickQuote created:', newQuickQuote);

        // Send a success response
        res.status(201).json({ message: 'Quick Quote is successfully submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });  
    }
}

async function handleNewInquiry(req, res) {

    let {inquiryMessage} = req.body.newInquiry;
    

    // Creating new inquiry
    const newInquiry = new NewInquiry({
        inquiryMessage,
        createdBy: req.user._id
    });

    try {
        // save the new QuickQuote
        await newInquiry.save();
        console.log('New inquiry created:', newInquiry);

        // Send a success response
        res.status(201).json({ message: 'New Inquiry is successfully submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });  
    }

    
}
module.exports = {
    handleUserSignup,
    handleUserSignin,
    handleBookService,
    handleViewOrders,
    handleQuickQuote,
    handleNewInquiry
}
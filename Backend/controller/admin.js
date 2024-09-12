const { v4: uuidv4 } = require("uuid");
const { setUser} = require("../service/auth");
const { Admin } = require("../Models/admin");
const { Service } = require("../Models/service");
const { User } = require("../Models/user");
const { QuickQuote } = require("../Models/quickQuote");
const { NewInquiry } = require("../Models/newInquiry")


async function handleAdminSignup(req, res){
    let {name, email, password, rollInCompany} = req.body;

    // Initialize an object to hold validation errors
    let validationErrors = {};

    // Creating new user
    const newUser = new Admin({
    name,
    email,
    password,
    rollInCompany
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

async function handleAdminSignin(req, res){
    try {
        let { email, password } = req.body;

        // Find the user by email
        const user = await Admin.findOne({ email: email });
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
        res.cookie('user_data', JSON.stringify({ userid: sessionId, user_type: "admin"}),{
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

async function handleAddService(req, res){
    let {serviceTitle, serviceDescription, serviceAvailability, imageURL} = req.body;

    // Initialize an object to hold validation errors
    let validationErrors = {};

    // Creating new service
    const newService = new Service({
        serviceTitle, 
        serviceDescription, 
        serviceAvailability, 
        imageURL,
        createdBy: req.user,
    });

    console.log("user", req.user);

    // Validate the service
    try{
        console.log('validation')
       
        await newService.validate();
        console.log('validation')

    } catch (error) {
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

    // Creating new service
    try {
        // save the new service
        await newService.save();
        console.log('New service created:', newService);

        // Send a success response
        res.status(201).json({ message: 'New service created' });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
       
    }
}

async function handleViewOrder(req, res) {

    try{
        const users = await User.find({bookedService: { $ne: [] } });
        return res.status(200).send({Orders: users});
    } catch (error) {
        return res.status(500).send({message: 'Server Error' })
    }
    
}

async function handleViewOrderDetails(req, res) {
    const serviceIds = req.body.bookedService;
    // console.log(serviceIds);

    try {
        // Find all services that match the provided service IDs
        const services = await Service.find({
            _id: { $in: serviceIds }
        });

        // Send the found services as JSON response to the client
        res.status(200).json({
            success: true,
            orderDetails: services,
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving services',
            error: error.message
        });
    } 
    

}

async function handleViewQuote(req, res){
    try{
        const quoteData = await QuickQuote.find()
       return res.status(200).send({quoteData: quoteData})
    } catch (error) {
        console.log(error)
        return res.send({error});
    }
}

async function handleViewMessage(req, res) {
    try{
        
        const inquiryData = [];
        const inquires = await NewInquiry.find();
        const usersPromises = inquires.map(async inquiry => {
            return await User.findById(inquiry.createdBy);
        });
        const users = await Promise.all(usersPromises); // Resolve all the promises

        const userNames = users.map(user => user.name);

        // Append the respective user name to each inquiry object
        const inquiresWithUserNames = inquires.map((inquiry, index) => {
            return {
                ...inquiry._doc, // Spread the inquiry's document data
                userName: userNames[index] // Attach the user name
            };

        });
       return res.status(200).send({inquiryData: inquiresWithUserNames})
    } catch (error) {
        console.log(error)
        return res.send({error});
    }
}

module.exports = {
    handleAdminSignup,
    handleAdminSignin,
    handleAddService,
    handleViewOrder,
    handleViewOrderDetails,
    handleViewQuote,
    handleViewMessage
}
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

// const { connectToMongoDB } = require("../Database/connect");
const { connectToMongoDB } = require("./connect");


// import routes
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const serviceRoute = require("./routes/service");

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:4200', // Angular app's address
    credentials: true // Allows cookies to be sent with requests
  }
));

const PORT = 3000;
// const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/MovingCompany';
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://amareshmaity2002:X37tl4hLW7O8T86T@cluster0.g2ktfbf.mongodb.net/MovingCompany?retryWrites=true&w=majority&appName=Cluster0';
// const mongoUri = process.env.MONGO_URI;


// connect to database
connectToMongoDB(mongoUri)
.then(() => console.log("MongoDB connected..."))
.catch((err) => {
    console.log("MongoDB connection error: ", err.message);
});


app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false })); // middleware to handle form data
app.use(cookieParser()); // extract parse-data from cookie

// http request for routes

// For admin
app.use("/api/admin", adminRoute);

// For user
app.use("/api/user", userRoute);

// For viewService
app.use("/api/service", serviceRoute);

// Check session route
app.get('/api/session-check', (req, res) => {
  const user_data = req.cookies?.user_data;
  console.log(user_data);
  if (user_data) {
    res.status(200).json({ loggedIn: true, user: user_data });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

// Logout route
app.post('/api/logout', (req, res) => {

  // Clear the cookie named 'user_data'
  res.clearCookie('user_data');

  // Optionally, you can redirect the user or send a response
  res.status(200).json({ message: 'Logout successful!' });
});

// listen : start the server
app.listen(PORT, () => console.log("Server started at port ", PORT));
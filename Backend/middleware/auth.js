// imports
const { getUser } = require("../service/auth");

// Function to check a user is logged in or not for a particular session
async function checkAuth(req, res, next){
    console.log("Cookies:", req.cookies);  // Log all cookies
    const user_data = req.cookies?.user_data ? JSON.parse(req.cookies.user_data) : null;
    console.log("From middleware", user_data);
    if (user_data) {
        console.log(user_data.userid);
        const user = getUser(user_data.userid);
        console.log(user)
        if (user) {
            req.user = user;
            console.log("From middleware req.user",req.user)
            return next();
        }
    }
    
    res.status(401).send('Unauthorized: No valid session');
}



module.exports = { 
    checkAuth, 
};
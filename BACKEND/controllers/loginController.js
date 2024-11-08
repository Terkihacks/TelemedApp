// Function to store login session 
//Import the details
const sessionMiddleware = require('../middleware/sessionMiddleware');

exports.loginUser = async (req,res,next) => {
    try{
 sessionMiddleware = req.session;
 if(req.session){
    //Store user info in session
    req.session = { email };
    res.status(200).json({ message: 'User logged in successfully' });
    return next();
}
    }catch(error){
     res.status(200).json({message: 'Logout successful'})
     res.status(500).json({message:'Could not log out'})
    }

}

exports.logoutUser = async (req, res) => {
    try {
        // Destroy the session or remove the token based on your authentication setup
        req.session = null;  // For session-based authentication, clear the session
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out, please try again later' });
    }
  };


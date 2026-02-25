// import User from '../models/User.js';

// //Middleware to check if user is authenticated
// export const protect = async (req, res, next) => {
//     const  { userId } = req.auth;
//     if(!userId) {
//         res.json({success: false, message: "Not authorized"});
//     }
//     else{
//         const user = await User.findById(userId);
//         req.user = user;
//         next();
//     }
// }




import User from '../models/User.js';

export const protect = async (req, res, next) => {
    try {
        // Clerk update: req.auth ki jagah req.auth() use karein
        const { userId } = req.auth(); 
        
        if(!userId) {
            return res.json({success: false, message: "Not authorized"});
        }
        
        const user = await User.findById(userId);
        if(!user) {
             return res.json({success: false, message: "User not found in DB"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Auth Middleware Error:", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}
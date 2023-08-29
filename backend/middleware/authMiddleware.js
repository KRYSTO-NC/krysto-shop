import  jwt  from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.token;

  if(token){
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
} catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Non autorisé, token invalide");
}
  } else {
    res.status(401);
    throw new Error("Vous n'êtes pas autorisé à accéder à cette ressource");
  }

 
});


//Admin middleware

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error("Non autorisé en tant qu'admin");
    }
}


export { protect, admin };
const Staff = require('../models/Staff')
const jwt = require("jsonwebtoken");
exports.getPrivateData = async (req,res,next) => {
    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    const user = await Staff.findById(decoded.id)
    console.log("Logged in user-email : "+user.email)
    
    res.status(200).json({
        sucess: true,
        data: user.email,
    })


}
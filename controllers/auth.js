const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Group = require('../models/Group')
const jwt = require("jsonwebtoken");
const { Console } = require('console')
const TopicReg = require('../models/TopicReg')



exports.register = async(req,res,next) => {
    const {username, email, password} = req.body
    try{
        //find out the month
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        let batch

        if(month < 5){
            //make year string and set to batch
            batch = year.toString()
        }
        else{
            //get the last two digits of year
            let lastTwo = year.toString().slice(2)
            batch = year + "/" +(parseInt(lastTwo) + 1).toString()+"J"
        }

        const user = await User.create({
            username,email,password,batch
        })
        sendToken(user, 201, res)
    }catch(error){
        next(error)
    }
};



exports.login = async (req, res, next) => {
    const {email,password} = req.body
    
    if(!email || !password){
       return next(new ErrorResponse("Please provide an email and password",400))
    }

    try{
        const user = await User.findOne({email}).select("+password")

        if(!user){
            return next(new ErrorResponse("Invalid Credentials",401))
        }
        
        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials",401))
        }

        
        sendToken(user, 200, res)
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }

};

exports.forgotpassword = async(req, res, next) => {
    const {email} = req.body
    
    try{
        const user = await User.findOne({email})

        if(!user){
            return next(new ErrorResponse("Email could not be set",404))
        }

        const resetToken = user.getResetPasswordToken()
    await user.save()
    
    const resetUrl = `https://cdap-app.herokuapp.com/passwordreset/${resetToken}`
  
    const message = `<h1>CDAP PROJECT MANAGEMENT SYSTEM</h1>
    <h3>Hello ${email} ,</h3>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Thank you,<br/> Best Regards <br/> Developer Team
    </p>
    `
    
    try{
        await sendEmail({
            to:user.email,
            subject:"Password Reset Request",
            text: message
        })
        
        res.status(200).json({success:true,data:"Passowrd reset link sent"})
    }catch(error){
        user.getResetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return next(new ErrorResponse("Email could not be send",500))
        

    }

    }catch(error){
            
        next(error)
    }
};

exports.resetpassword = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest
    ("hex")

    try{

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        })
        if(!user){
            return next(new ErrorResponse("Invalid Reset Token",400))
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        
        await user.save()

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })

    }catch(error){
        next(error)
    }
}


exports.registerwithExcel = async(req,res,next) => {
    // const {username, email, password} = req.body
    // try{
    //     //find out the month
    //     let month = new Date().getMonth() + 1
    //     let year = new Date().getFullYear()

    //     let batch

    //     if(month < 5){
    //         //make year string and set to batch
    //         batch = year.toString()
    //     }
    //     else{
    //         //get the last two digits of year
    //         let lastTwo = year.toString().slice(2)
    //         batch = year + "/" +(parseInt(lastTwo) + 1).toString()+"J"
    //     }

    //     const user = await User.create({
    //         username,email,password,batch
    //     })
    //     sendToken(user, 201, res)

    try{
        const {array} = req.body
        
        //find out the month
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        let batch
        
        if(month < 5){
            //make year string and set to batch
            batch = year.toString()
        }
        else{
            //get the last two digits of year
            let lastTwo = year.toString().slice(2)
            batch = year + "/" +(parseInt(lastTwo) + 1).toString()+"J"
        }

        // create random password
        
        
        for(let i = 0; i < array.length; i++){
            
            var password = Math.random().toString(36).slice(-8)
            
            // access each Object in the array

            if(!isValidEmail(array[i]["Group Leader's Registration Number (E.g. IT12345678)"]+"@my.sliit.lk")){
                console.log("Invalid Email")
                const user1nomail = await User.create({
                    username: array[i]["Group Leader's Registration Number (E.g. IT12345678)"],
                    password: password,
                    batch: batch,
                    email: password + "test@my.sliit.lk"
                })
                // return next(new ErrorResponse("Invalid Email",400))
            }
            
            const user1 = await User.create({
                username: array[i]["Group Leader's Registration Number (E.g. IT12345678)"],
                password: password,
                batch: batch,
                email: array[i]["Group Leader's Registration Number (E.g. IT12345678)"]+"@my.sliit.lk"
            })
            console.log(password)
            console.log(user1)
            var password = Math.random().toString(36).slice(-8)
            console.log(password)

            if(!isValidEmail(array[i]["Member 2 Registration Number"] + "@my.sliit.lk")){
                console.log("Invalid Email")
                const user2nomail = await User.create({
                    username: array[i]["Member 2 Registration Number"],
                    password: password,
                    batch: batch,
                    email: password + "test@my.sliit.lk"
                })
                // return next(new ErrorResponse("Invalid Email",400))
            }

            const user2 = await User.create({
                username: array[i]["Member 2 Registration Number"],
                password: password,
                batch: batch,
                email: array[i]["Member 2 Registration Number"] + "@my.sliit.lk"
            })
            console.log(user2)
            var password = Math.random().toString(36).slice(-8)
            console.log(password)

            if(!isValidEmail(array[i]["Member 3 Registration Number"] + "@my.sliit.lk")){
                console.log("Invalid Email")
                const user3nomail = await User.create({
                    username: array[i]["Member 3 Registration Number"],
                    password: password,
                    batch: batch,
                    email: password + "test@my.sliit.lk"
                })
                // return next(new ErrorResponse("Invalid Email",400))
            }

            const user3 = await User.create({
                username: array[i]["Member 3 Registration Number"],
                password: password,
                batch: batch,
                email: array[i]["Member 3 Registration Number"] + "@my.sliit.lk"
            })
            console.log(user3)
            var password = Math.random().toString(36).slice(-8)
            console.log(password)

            if(!array[i]["Member 4 Registration Number"] + "@my.sliit.lk"){
                console.log("Invalid Email")
                const user3 = await User.create({
                    username: array[i]["Member 3 Registration Number"],
                    password: password,
                    batch: batch,
                    email: password + array[i]["Member 4 Registration Number"] + "@my.sliit.lk"
                })
                // return next(new ErrorResponse("Invalid Email",400))
            }

            const user4 = await User.create({
                username: array[i]["Member 4 Registration Number"],
                password: password,
                batch: batch,
                email: array[i]["Member 4 Registration Number"] + "@my.sliit.lk"
            })
            console.log(user4)
            console.log(password)
            // sendToken(user, 201, res)
        
        }

        

        // const user = await User.create({
        //     username,email,password,batch
        // })
        // sendToken(user, 201, res)

        // console.log(array)
        console.log("done")

    }catch(error){
        next(error)
    }
};


// exports.registerwithExcel = async(req,res,next) => {
//     // const {username, email, password} = req.body
//     // try{
//     //     //find out the month
//     //     let month = new Date().getMonth() + 1
//     //     let year = new Date().getFullYear()

//     //     let batch

//     //     if(month < 5){
//     //         //make year string and set to batch
//     //         batch = year.toString()
//     //     }
//     //     else{
//     //         //get the last two digits of year
//     //         let lastTwo = year.toString().slice(2)
//     //         batch = year + "/" +(parseInt(lastTwo) + 1).toString()+"J"
//     //     }

//     //     const user = await User.create({
//     //         username,email,password,batch
//     //     })
//     //     sendToken(user, 201, res)

//     try{
//         const {array} = req.body
        
//         //find out the month
//         let month = new Date().getMonth() + 1
//         let year = new Date().getFullYear()

//         let batch
        
//         if(month < 5){
//             //make year string and set to batch
//             batch = year.toString()
//         }
//         else{
//             //get the last two digits of year
//             let lastTwo = year.toString().slice(2)
//             batch = year + "/" +(parseInt(lastTwo) + 1).toString()+"J"
//         }

//         // create random password
        
        
//         for(let i = 0; i < array.length; i++){
            
//             var password = Math.random().toString(36).slice(-8)
            
//             // access each Object in the array



//             // array[i]["Group Leader's Registration Number (E.g. IT12345678)"]+"@my.sliit.lk see if this is valid email
            
//             const user1 = await User.create({
//                 username: array[i]["Group Leader's Registration Number (E.g. IT12345678)"],
//                 password: password,
//                 batch: batch,
//                 email: array[i]["Group Leader's Registration Number (E.g. IT12345678)"]+"@my.sliit.lk"
//             })
//             console.log(user1)
//             var password = Math.random().toString(36).slice(-8)

//             const user2 = await User.create({
//                 username: array[i]["Member 2 Registration Number"],
//                 password: password,
//                 batch: batch,
//                 email: array[i]["Member 2 Registration Number"] + "@my.sliit.lk"
//             })
//             console.log(user2)
//             var password = Math.random().toString(36).slice(-8)

//             const user3 = await User.create({
//                 username: array[i]["Member 3 Registration Number"],
//                 password: password,
//                 batch: batch,
//                 email: array[i]["Member 3 Registration Number"] + "@my.sliit.lk"
//             })
//             console.log(user3)
//             var password = Math.random().toString(36).slice(-8)

//             const user4 = await User.create({
//                 username: array[i]["Member 4 Registration Number"],
//                 password: password,
//                 batch: batch,
//                 email: array[i]["Member 4 Registration Number"] + "@my.sliit.lk"
//             })
//             console.log(user4)

//             // sendToken(user, 201, res)
        
//         }

        

//         // const user = await User.create({
//         //     username,email,password,batch
//         // })
//         // sendToken(user, 201, res)

//         // console.log(array)

//     }catch(error){
//         next(error)
//     }
// };




const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true,token})
    
}


const logged = (token,res) => {//check if token is null
    if(token == "null"){
        console.log("You are not logged in")
        res.status(500).json({success:false})
    }
}


function isValidEmail(email) {
  // Regular expression for validating an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Test the email address against the regular expression
  return emailRegex.test(email);
}
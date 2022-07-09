const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const ProposalPresentationMarks = require('../models/Marks')
const jwt = require("jsonwebtoken");
const { Console } = require('console')
const Mail = require('nodemalier/lib/mailer')

exports.viewproposalpresentationmarks = async(req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split("")[1]
    }
    if(token == "null"){
        logged(token,res)
    }else{
        console.log("This is the token :"+token)

        if(token == null){
            console.log("Please login !!")
            res.status(201).json({
                suceess:true,
                data:"Data1/Data2/Data3/Data4"
            })

        }
        else{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded+"fsddfs")
            const user = await User.findById(decoded.id)
            console.log(user.username+"jkl")

            provengapmarks1=user.username
            provengapmarks2=user.username
            capabilitymarks1=user.username
            capabilitymarks2=user.username
            implementationmarks1=user.username
            implementationmarks2=user.username
            implementationmarks3=user.username
            communicationmarks1=user.username
            communicationmarks2=user.username
            commercializationmarks1=user.username

            try{
                const viewproposalpresentationmarks = await ProposalPresentationMarks.find([{provengapmarks1},{provengapmarks2},{capabilitymarks1},{capabilitymarks2},{implementationmarks1},{implementationmarks2},{implementationmarks3},{communicationmarks1},{communicationmarks2},{commercializationmarks1}])
                console.log(viewproposalpresentationmarks[0].extrafeedback)

                const setdata = viewproposalpresentationmarks[0].provengapmarks1+","+viewproposalpresentationmarks[0].provengapmarks2+","+viewproposalpresentationmarks[0].capabilitymarks1+","+viewproposalpresentationmarks[0].capabilitymarks2+","+viewproposalpresentationmarks[0].implementationmarks1+","+viewproposalpresentationmarks[0].implementationmarks2+","+viewproposalpresentationmarks[0].implementationmarks3+","+viewproposalpresentationmarks[0].communicationmarks1+","+viewproposalpresentationmarks[0].communicationmarks2+","+viewproposalpresentationmarks[0].commercializationmarks1
                res.status(201).json({
                    success:true,
                    data:setdata
                })
            }catch(error){
                res.status(500).json({success:false,error:error.message})

            }
        }
    }
}
const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const ProposalPresentationMarks = require('../models/Marks')
const jwt = require("jsonwebtoken");
const { Console } = require('console')




//METHOD 2

//view proposal presentation marks for logged in student method 2
exports.viewproposalpresentationmarks =async(req,res,next) => {
   
    
    let token//to retreive username in backend
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token == "null"){
        logged(token,res)
    }
    else{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        
        const user = await User.findById(decoded.id)
       const retrievestudentid = user.studentID
       console.log(retrievestudentid) 

        

   

        try{
    
        const studentProposalCollection = await ProposalPresentationMarks.find()
    
        let matchentry;
        const matchedID = studentProposalCollection.map(collectionEntry =>{if(collectionEntry.studentIDs==retrievestudentid){
            console.log(collectionEntry)
            matchentry=collectionEntry

        }}
        
        )

        const setmarksdata ="Proven gap A"+":"+matchentry.provengapmarks1+",  "
                            +"Proven gap B"+":"+matchentry.provengapmarks2+",  "
                            +"Capability in applying knowledge A"+":"+matchentry.capabilitymarks1+",  "
                            +"Capability in applying knowledge B"+":"+matchentry.capabilitymarks2+",  "
                            +"Solution implementation A"+":"+matchentry.implementationmarks1+",  "
                            +"Solution implementation B"+":"+matchentry.implementationmarks2+",  "
                            +"Solution implementation C"+":"+matchentry.implementationmarks3+",  "
                            +"Effective Communication A"+":"+matchentry.communicationmarks1+",  "
                            +"Effective Communication B"+":"+matchentry.communicationmarks2+",  "
                            +"Ability of commercialization marks"+":"+matchentry.commercializationmarks1+",  "
                            
       
        res.status(201).json({
            success: true,
           data:setmarksdata
                
           
        })
        
    }catch(error){
        next(error)
    }
}
};









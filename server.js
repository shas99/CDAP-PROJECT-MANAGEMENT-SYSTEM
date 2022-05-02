require('dotenv').config({path: "./config.env"})
const express = require('express');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const bodyParser = require('body-parser')
const nunjucks=require('nunjucks')
const Nexmo = require('nexmo')


connectDB();

const app = express();

app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
nunjucks.configure('views',{express:app})

const nexmo = new Nexmo({
    apiKey:'1d0d5bcd',
    apiSecret:'NiSs1FWkyG1tp72S'
})
//1st
app.get('/', (req,res) => {
    res.render('index.html', {message: 'Hello world'})
})


//2nd

app.post('/verify',(req,res) => {
    nexmo.verify.request({
        number:req.body.number,
        brand: 'ACME corp'}
    , (error, result)=>{
        if(result.status != 0){
            res.render('index.html', {message:result.error_text})
        }else{
            res.render('check.html',{requestId: result.request_id})
        }

    })
})

//3rd
app.post('/check', (req,res)=>{
    nexmo.verify.check({
        request_id: req.body.requestId,
        code: req.body.code
    }, (error, result)=>{
        if(result.status != 0 ){
            res.render('index.html', {message : result.error_text})
        }else{
            res.render('success.html')
        }
    })
})
// ... other imports 
const path = require("path");
const { e } = require('nunjucks/src/filters');

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))



app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
app.use('/api/student', require('./routes/student'))
app.use('/api/group',require('./routes/group'))
app.use('/api/staffAuth',require('./routes/staffAuth'))
app.use('/api/staffPrivate', require('./routes/staffPrivate'))


// Error handler(Should be the last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//This code causes the PROXY CRASH !!!!!
process.on("unhandledRejection", (err,promise)=>{
    console.log(`Logged Error: ${err}`)
    // server.close(()=> process.exit(1))
})
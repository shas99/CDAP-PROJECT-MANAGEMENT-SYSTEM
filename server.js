require('dotenv').config({path: "./config.env"})
const express = require('express');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const bodyParser = require('body-parser')
const nunjucks=require('nunjucks')
const Nexmo = require('nexmo')
let cors = require("cors");
const {uploadFile, getFileStream} = require('./s3')
const axios = require('axios')

connectDB();

const app = express();
//upload file
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



app.get('/images/:key', (req,res)=>{
    const key = req.params.key
    const readStream = getFileStream(key)
    
    readStream.pipe(res)
})



app.post('/images', upload.single('image'),async (req,res) =>{
    const file = req.file
    const info = req.body
    const result = await uploadFile(file)
    console.log(result)
    console.log(file)
    res.send({imagePath: `/images/${result.Key}`})
})

app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// ... other imports 
const path = require("path");


//************* HEROKU DEPLOYMENT------------
app.use(express.static(path.join(__dirname, "client", "build")))



app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
app.use('/api/student', require('./routes/student'))
app.use('/api/group',require('./routes/group'))
app.use('/api/staffAuth',require('./routes/staffAuth'))
app.use('/api/staffPrivate', require('./routes/staffPrivate'))
app.use('/api/AvailableProject', require('./routes/AvailableProject'))
app.use('/api/staff', require('./routes/staff'))



// Error handler(Should be the last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



//************* HEROKU DEPLOYMENT------------Right before your app.listen(), add this: ***********
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const bios = []
const cyber= []
const mobile = []
const ai = []
const desgining = []
const operatingSystem = []
const robotics = []
const networking = []
var senddata = {}
//test axios
// const getBreeds = async () => {
//   try {
//     return await axios.get('http://localhost:5000/api/group/viewgroups')
//   } catch (error) {
//     console.error(error)
//   }
// }

// const countBreeds = async () => {
//   const breeds = await getBreeds()

//   if (breeds) {
//     console.log(` ${Object.entries(breeds.data.data[1])} `)
//      breeds.data.data.map(datadata =>{
//        bios.push(datadata.bio)
//        cyber.push(datadata.interest[0])
//        mobile.push(datadata.interest[1])
//        ai.push(datadata.interest[2])
//        desgining.push(datadata.interest[3])
//        operatingSystem.push(datadata.interest[4])
//        networking.push(datadata.interest[5])
//        robotics.push(datadata.interest[6])
       
//        // console.log(datadata)
//       })
//     }
//     senddata = {bios,cyber,mobile,ai,desgining,mobile,operatingSystem,networking,robotics}

//   console.log(senddata)

//   const http = require('http')
//   const sendingMessage = "Hello from Django"
//   const color = "Chewie, we're home"
//   // const url = http://django-env.eba-qitcexyr.us-west-2.elasticbeanstalk.com/sayHello/?color=${color};
//   // const url = `http://django-env9.eba-qj74ed7w.us-west-2.elasticbeanstalk.com/sayHello/?color=${senddata}`;
//     const url = `http://127.0.0.1:8000/sayHello/?color=${bios}&cyber=${cyber}&mobile=${mobile}&ai=${ai}&desgining=${desgining}&operatingSystem=${operatingSystem}&networking=${networking}&robotics=${robotics}`;
//   http.get(url, res => {
//     let data = '';
//     res.on('data', chunk => {
//       data += chunk;
//     });
//     res.on('end', () => {
//       data = JSON.parse(data);
//       console.log(data);
//     })
//   }).on('error', err => {
//     console.log(err.message);
//   }).end()

// }

// countBreeds()





//This code causes the PROXY CRASH !!!!!
process.on("unhandledRejection", (err,promise)=>{
    console.log(`Logged Error: ${err}`)
    // server.close(()=> process.exit(1))
})
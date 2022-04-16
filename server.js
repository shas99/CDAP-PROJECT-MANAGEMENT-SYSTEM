require('dotenv').config({path: "./config.env"})
const express = require('express');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

connectDB();

const app = express();

app.use(express.json())

// // ... other imports 
// const path = require("path")

// // ... other app.use middleware 
// app.use(express.static(path.join(__dirname, "client", "build")))







app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

// Error handler(Should be the last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Right before your app.listen(), add this:
/*app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});*/

process.on("unhandledRejection", (err,promise)=>{
    console.log(`Logged Error: ${err}`)
    server.close(()=> process.exit(1))
})
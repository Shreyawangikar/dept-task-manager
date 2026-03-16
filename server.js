const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const connectDB = require("./config/db")

const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

connectDB()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static("public"))

app.use("/api",userRoutes)
app.use("/api",taskRoutes)

app.listen(5000,()=>{

console.log("Server running on port 5000")

})
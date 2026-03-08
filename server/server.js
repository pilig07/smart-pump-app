const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const { db, initDB } = require("./database")

const app = express()

app.use(cors())
app.use(bodyParser.json())

initDB()

// LOGIN
app.post("/api/login", async (req, res) => {

    const { email, password } = req.body

    await db.read()

    const user = db.data.users.find(
        u => u.email === email && u.password === password && u.isActive
    )

    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }

    res.json(user)
})


// GET USER
app.get("/api/user/:id", async (req,res)=>{

    await db.read()

    const user = db.data.users.find(u => u._id === req.params.id)

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    res.json(user)
})


// UPDATE USER
app.put("/api/user/:id", async (req,res)=>{

    await db.read()

    const user = db.data.users.find(u => u._id === req.params.id)

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    Object.assign(user, req.body)

    await db.write()

    res.json(user)
})


app.listen(3000,()=>{
    console.log("Server running")
})


// consulted info: https://github.com/typicode/lowdb, https://lenguajejs.com/nodejs/bases-de-datos/introduccion-lowdb/
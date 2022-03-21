import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import mongoose from'mongoose'
import cors from'cors'
import  { User } from './models/user.model.js'

const app = express()

mongoose.connect(process.env.MONGO_PASSWORD)
console.log("database conneted");

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/signup', async (req, res) => {
    const user = new User(req.body)
    user.save()
    res.send({ success: true, data: user })
})
app.post('/login', async (req, res) => {
    const { id } = req.params
    const userInfo = await User.findOne({email: req.body.email})
    const { email, password } = userInfo

    if(req.body.email === email && req.body.password === password){
        return res.send({ success: true, data: userInfo})
    } else {
        return res.status(400).send({ err: "아이디 비번이 틀림" })
    }
    // const user = new User(req.body)
    // user.save()
    // res.send({ success: true, data: user })
})

app.listen(process.env.PORT, () => {
    console.log('server on');
})
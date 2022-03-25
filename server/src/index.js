import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import mongoose from'mongoose'
import cors from'cors'
import routes from './routes/index.js'

const app = express()

mongoose.connect(process.env.MONGO_PASSWORD)
console.log("database conneted");


app.use(cors({
    origin: ["http://localhost:8080"],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT','OPTIONS'],
    credentials: true
  }))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)


app.listen(process.env.PORT, () => {
    console.log('server on');
})
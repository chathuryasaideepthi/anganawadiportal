import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import awwRoutes from './routes/awwRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import logRoutes from './routes/logRoutes.js';

dotenv.config()

const app = express()
const port = process.env.PORT 
connectDB()

//middlewear
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/awws',awwRoutes)
app.use('/api/clients',clientRoutes)
app.use('/api/logs',logRoutes)

app.listen(port,()=> console.log("Server started on port : "+ port))

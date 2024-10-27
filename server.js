import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/authRoute.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 200,
        message: 'Hello World!' 
    })
})

app.use('/api/v1/auth', authRouter)
    
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port`)
})
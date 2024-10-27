import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/authRoute.js'

dotenv.config()

const app = express()

app.use('/api/v1/auth', authRouter)

app.use('*', (req, res, next) => {
    res.status(404).json({ 
        status: 'Ошибка',
        message: 'Введенный URL не существует' 
    })
})
    
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port`, PORT)
})
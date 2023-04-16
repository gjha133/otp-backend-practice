import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import './config/db.js'
import otpRoutes from './routes/otp.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/otp', otpRoutes)

app.get('/', (req, res) => {
  res.send('Server running in backend')
})

app.listen(8080, () => {
  console.log('Server running on port 8080')
})
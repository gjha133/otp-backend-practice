import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import colors from 'colors'

const { MONGODB_URI } = process.env

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connect'.bgGreen.white)
  } catch (error) {
    console.log(`Error while connecting to MongoDB. Error: ${error}`.bgRed.white)
  }
}

connectDB()
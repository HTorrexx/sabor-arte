import mongoose from 'mongoose'
import {MONGODB_URI} from './config.js'

export async function connectDB () {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected')
  } catch (error) {
    console.log(error)
  }
}

export async function desconectDb () {
  try {
    await mongoose.connection.close()
    console.log("desconectado")
  } catch (error) {
    console.log(error)
  }
}
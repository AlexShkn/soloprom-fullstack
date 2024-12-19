declare global {
  var mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  }
}
import mongoose from 'mongoose'

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name'

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn
  }

  if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null }
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose
      .connect(MONGODB_URI)
      .then((db) => db.connection)
  }

  try {
    global.mongoose.conn = await global.mongoose.promise
    return global.mongoose.conn
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

export default dbConnect

// Minimal MongoDB helper. Optional: used if you want to persist Q&A.
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
let client
let clientPromise

if (!uri) {
  console.warn('No MONGODB_URI provided — running in memory mode')
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise

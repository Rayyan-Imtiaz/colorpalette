import { ObjectId } from "mongodb"
import clientPromise from "../lib/mongodb"

export async function savePalette(userId, colors) {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("palettes").insertOne({
    userId: new ObjectId(userId),
    colors,
    createdAt: new Date(),
  })

  return { id: result.insertedId, colors, createdAt: new Date() }
}

export async function getUserPalettes(userId) {
  const client = await clientPromise
  const db = client.db()

  return db
    .collection("palettes")
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray()
}

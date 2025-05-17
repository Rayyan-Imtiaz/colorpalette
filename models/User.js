import { hash, compare } from "bcryptjs"
import clientPromise from "../lib/mongodb"

export async function createUser(userData) {
  const client = await clientPromise
  const db = client.db()

  const { email, password, name, username } = userData

  // Validate required fields
  if (!email || !password || !name || !username) {
    throw new Error("All fields including username are required")
  }

  // Check if user with email or username already exists
  const existingUser = await db.collection("users").findOne({
    $or: [{ email }, { username }]
  })
  if (existingUser) {
    throw new Error("User with this email or username already exists")
  }

  // Hash the password
  const hashedPassword = await hash(password, 12)

  // Create the user with username included
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    name,
    username,       // <--- add username here
    createdAt: new Date(),
  })

  return { id: result.insertedId, email, name, username }
}

export async function findUserByEmail(email) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("users").findOne({ email })
}

export async function validatePassword(user, inputPassword) {
  return compare(inputPassword, user.password)
}

"use server"

import { getCurrentUser } from "../lib/auth"
import { savePalette, getUserPalettes } from "../models/Palette"
import { generateRandomPalette } from "../lib/colorGenerator"

export async function generatePalette() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "You must be logged in" }
  }

  const colors = generateRandomPalette()
  return { colors }
}

export async function savePaletteAction(colors) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "You must be logged in" }
  }

  try {
    await savePalette(user.id, colors)
    return { success: true }
  } catch (error) {
    return { error: error.message }
  }
}

export async function getPalettes() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "You must be logged in" }
  }

  try {
    const palettes = await getUserPalettes(user.id)
    
    // Serialize palettes to convert ObjectId and Date to plain strings
    const serializedPalettes = palettes.map(palette => ({
      ...palette,
      _id: palette._id.toString(),
      userId: palette.userId.toString(),
      createdAt: palette.createdAt.toISOString(),
      colors: palette.colors, // Assuming colors is already an array of strings
    }))

    return { palettes: serializedPalettes }
  } catch (error) {
    return { error: error.message }
  }
}
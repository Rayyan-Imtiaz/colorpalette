"use client"

import { useState } from "react"
import { generatePalette, savePaletteAction } from "../actions/palette"

export default function ColorPalette() {
  const [colors, setColors] = useState(["#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd"])
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  async function handleGeneratePalette() {
    const result = await generatePalette()
    if (result.error) {
      setMessage(result.error)
      return
    }

    setColors(result.colors)
    setMessage("")
  }
async function handleSavePalette() {
  setIsSaving(true)
  const result = await savePaletteAction(colors)
  setIsSaving(false)

  if (result.error) {
    setMessage(result.error)
    return
  }

  setMessage("Palette saved successfully!")
  setTimeout(() => {
    setMessage("")
    window.location.reload() // Refresh the page
  }, 3000)
}

  function copyToClipboard(color) {
    navigator.clipboard.writeText(color)
    setMessage(`Copied ${color} to clipboard!`)
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-4">
          {colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-md cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              ></div>
              <span className="mt-2 text-sm font-mono">{color}</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleGeneratePalette}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Generate New Palette
          </button>
          <button
            onClick={handleSavePalette}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Palette"}
          </button>
        </div>

        {message && <div className="mt-4 p-2 bg-gray-100 text-gray-800 rounded-md">{message}</div>}
      </div>
    </div>
  )
}

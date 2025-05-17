"use client"

import { useEffect, useState } from "react"
import { getPalettes } from "../actions/palette"

export default function PaletteHistory() {
  const [palettes, setPalettes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPalettes() {
      const result = await getPalettes()
      setLoading(false)

      if (result.error) {
        setError(result.error)
        return
      }

      setPalettes(result.palettes || [])
    }

    fetchPalettes()
  }, [])

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (palettes.length === 0) {
    return <div className="text-center py-8">No saved palettes yet. Generate and save some!</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Saved Palettes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {palettes.map((palette) => (
          <div key={palette._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex mb-4">
              {palette.colors.map((color, index) => (
                <div key={index} className="flex-1 h-12" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <div className="text-sm text-gray-500">Saved on {formatDate(palette.createdAt)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

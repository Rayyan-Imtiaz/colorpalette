import { redirect } from "next/navigation"
import { getCurrentUser } from "../../lib/auth"
import ColorPalette from "../../components/ColorPalette"
import PaletteHistory from "../../components/PaletteHistory"

export default async function Dashboard() {


  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold mb-6">Generate Color Palette</h1>
        <ColorPalette />
      </div>

      <div>
        <PaletteHistory />
      </div>
    </div>
  )
}

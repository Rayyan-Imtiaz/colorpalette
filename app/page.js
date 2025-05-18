import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Generate Beautiful Color Palettes</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Create harmonious color combinations with just a cl. Sign up to save your favorite palettes.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/sign-up"
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/sign-in"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}

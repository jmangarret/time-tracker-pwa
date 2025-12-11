import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Timify
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-lg text-center">
        The modern, cloud-native time tracking solution for your team.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-8 py-4 bg-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/50"
        >
          Get Started
        </Link>
        <Link
          href="/dashboard"
          className="px-8 py-4 bg-gray-800 rounded-full font-bold text-lg hover:bg-gray-700 transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}

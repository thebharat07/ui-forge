import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getSubmissionsByVotes } from "@/lib/submissions"
import { redirect } from "next/navigation"

export default async function LeaderboardPage() {
  let session = null

  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.log("Auth error:", error)
  }

  if (!session) {
    redirect("/")
  }

  const submissions = await getSubmissionsByVotes()

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16 my-2">
            <div className="flex items-center gap-16">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <span className="ml-2 text-white font-bold">UI FORGE</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/leaderboard">
                  <Button variant="ghost" className="text-white">
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/my-votes">
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    My Votes
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {session?.user?.image && (
                <Image
                  src={session.user.image || "/placeholder.svg?height=32&width=32"}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <Link href="/api/auth/signout">
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-400 hover:bg-purple-900/20 bg-transparent"
                >
                  Sign out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-gray-300">Current standings based on community votes</p>
        </div>

<div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
  {/* Header */}
  <div className="hidden md:grid md:grid-cols-12 p-4 border-b border-white/10 bg-purple-900/20 text-white font-medium">
    <div className="col-span-1 text-center">#</div>
    <div className="col-span-2">Preview</div>
    <div className="col-span-2">Creator</div>
    <div className="col-span-2 text-center">Votes</div>
  </div>

  {/* Entries */}
  {submissions.map((submission, index) => (
    <a href={submission.url || '#'} key={submission.id} target="_blank">
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-x-12 p-4 items-center border-b border-white/10 hover:bg-white/5 transition-colors"
      >
        {/* Rank */}
        <div className="md:col-span-1 text-center font-bold text-2xl text-gray-500 md:text-left">
          #{index + 1}
        </div>

        {/* Preview Image */}
        <div className="md:col-span-2">
          <div className="relative h-40 md:h-16 w-full rounded-md overflow-hidden">
            <Image
              src={submission.imageUrl || "/placeholder.svg?height=64&width=128"}
              alt={submission.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Creator */}
        <div className="md:col-span-2 text-gray-300 text-sm md:text-base">
          <span className="block md:hidden font-semibold text-white">Creator:</span>
          {submission.creatorName}
        </div>

        {/* Votes */}
        <div className="md:col-span-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
            <span className="text-purple-400 font-bold">{submission.voteCount}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-400"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  ))}
</div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 UI FORGE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

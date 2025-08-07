import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getSubmissions } from "@/lib/submissions"
import SubmissionCard from "@/components/submission-card"
import VotingStats from "@/components/voting-stats"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  let session = null

  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.log("Auth error:", error)
    // Continue without session for now
  }

  const submissions = await getSubmissions()

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="mx-auto px-4">
            <div className="flex items-center justify-between h-16 my-2">
              <div className="flex items-center gap-16">
                <Link href="/" className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <span className="ml-2 text-white font-bold">UI FORGE</span>
                </Link>
              </div>
              <Link href="/api/auth/signin">
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-xl">Sign in with Google</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative pt-32 pb-0 sm:pt-40">
          {/* Enhanced Gradient Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-purple-800/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-600/30 via-purple-900/20 to-transparent" />
            <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_0%,_#3b0764,_#0c0a09_25%,_#0c0a09_75%,_#3b0764_100%)] opacity-50" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center rounded-full px-4 py-1 mb-8 
              bg-purple-900/50 border border-purple-700/50 
              shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)]"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400 mr-2" />
              <span className="text-sm text-purple-300">Voting opens soon!</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              Welcome to
              <br />
              <span className="text-purple-400">UI FORGE</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-8">
              Vote for your favorite UI elements created by talented designers and developers. Sign in to cast up to
              two votes and help crown the winners!
            </p>

            <Link href="/api/auth/signin">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 mb-16">
                Sign in to vote
              </Button>
            </Link>

            {/* Preview of submissions */}
            <div className="relative max-w-5xl mx-auto mt-20 mb-0">
              <div className="relative rounded-lg overflow-hidden">
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-purple-600/40 blur-[50px]" />
                <div className="absolute inset-0 bg-purple-500/20 blur-[100px]" />
                <Image
                  src="/logo.png?heigh75&width=1200&text=UI+Forge+Submissions"
                  alt="UI Forge Submissions"
                  width={1200}
                  height={675}
                  className="relative rounded-lg border border-white/10 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
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
              <div className="flex md:hidden items-center space-x-8">
                <Link href="/leaderboard">
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/my-votes">
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    My Votes
                  </Button>
                </Link>
              </div>
      </nav>

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Vote for your favorite UI elements</h1>
          <p className="text-gray-300">You can vote for up to 3 different submissions. Choose wisely!</p>

          <VotingStats userId={session.user?.id || "demo-user"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {submissions.map((submission) => (
            <a href={submission.url || '#'}>
            <SubmissionCard key={submission.id || submission._id?.toString()} submission={submission} userId={session.user?.id || "demo-user"} />
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

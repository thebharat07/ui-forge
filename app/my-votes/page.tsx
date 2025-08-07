import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserVotesWithSubmissions } from "@/lib/submissions"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import RemoveVoteButton from "@/components/remove-vote-button"

export default async function MyVotesPage() {
  let session = null

  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.log("Auth error:", error)
  }

  if (!session) {
    redirect("/")
  }

  const votes = await getUserVotesWithSubmissions(session.user?.id || "demo-user")

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
                  <Button variant="ghost" className="text-white">
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">My Votes</h1>
          <p className="text-gray-300">
            You've used {votes.length} of 3 possible votes.
            {votes.length < 3 && ` You can still vote for ${3 - votes.length} more submissions.`}
          </p>
        </div>

        {votes.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-white mb-4">You haven't voted yet</h3>
            <p className="text-gray-400 mb-6">Head back to the gallery to vote for your favorite UI elements.</p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700">Browse submissions</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {votes.map((vote) => (
              <Card key={vote.id} className="bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={vote.submission.imageUrl || "/placeholder.svg?height=200&width=400"}
                    alt={vote.submission.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{vote.submission.title}</h3>
                    <div className="flex items-center gap-1 text-purple-400">
                      <span>{vote.submission.voteCount}</span>
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
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{vote.submission.description}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <span>By {vote.submission.creatorName}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <RemoveVoteButton voteId={vote.id} userId={session.user?.id || "demo-user"} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
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

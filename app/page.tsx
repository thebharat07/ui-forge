import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getSubmissions } from "@/lib/submissions"
import SubmissionCard from "@/components/submission-card"
import VotingStats from "@/components/voting-stats"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { pariticipants, check } from "@/lib/participants"

export default async function Home() {
  let session = null

  try {
    session = await getServerSession(authOptions)
    console.log(session)
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
              <div claCreated with v0ssName="w-2 h-2 rounded-full bg-purple-400 mr-2" />
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

      <main className="pt-24 pb-20 px-4 mt-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
 <div className="bg-black/50 border border-white/20 rounded-xl p-6 mb-12 backdrop-blur-sm shadow-lg">
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Concept: Design and build an interactive "Daily Quote Generator"</h2>
  <p className="text-gray-200 mb-6">with an in-page "favorites" feature that persists across browser sessions.</p>

  <div className="space-y-6 text-white text-base leading-relaxed">
    <div>
      <h3 className="text-xl font-semibold text-purple-300">Requirements:</h3>

      <h4 className="mt-4 font-semibold text-purple-200">HTML Structure:</h4>
      <ul className="list-disc list-inside text-gray-100 ml-4">
        <li>The page must have a clear heading (e.g., "Daily Dose of Wisdom").</li>
        <li>There must be a designated area to display the quote and its author.</li>
        <li>Include a "New Quote" button.</li>
        <li>Include a "Save Quote" button that changes appearance when saved.</li>
        <li>Create a section (e.g., sidebar or modal) for saved "Favorite Quotes" that toggles visibility.</li>
      </ul>

      <h4 className="mt-4 font-semibold text-purple-200">CSS Styling:</h4>
      <ul className="list-disc list-inside text-gray-100 ml-4">
        <li>The website must be visually appealing and responsive.</li>
        <li>Use Flexbox or Grid for layout.</li>
        <li>Style buttons with hover effects.</li>
        <li>Implement smooth transitions for quotes and favorite section toggling.</li>
        <li>"Save Quote" button must show toggle state (e.g., heart icon filled or outline).</li>
      </ul>

      <h4 className="mt-4 font-semibold text-purple-200">JavaScript Functionality:</h4>
      <ul className="list-disc list-inside text-gray-100 ml-4">
        <li>Display a random quote on load from an array of at least 10 quote objects.</li>
        <li>Clicking "New Quote" must change to a different random quote.</li>
        <li>Use localStorage to persist favorite quotes across sessions.</li>
        <li>Quotes can be added to and removed from favorites.</li>
        <li>"Save Quote" button should reflect if a quote is already saved.</li>
      </ul>
    </div>
  </div>
</div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Vote for your favorite UI elements</h1>
          <p className="text-gray-300">You can vote for up to 2 different submissions. Choose wisely!</p>
          <VotingStats userId={session.user?.id || "demo-user"} />
        </div>
{(() => {

  return !check(session.user?.email)  ? (
    <Link href="/submissions">
      <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-200">
        Submit
      </Button>
    </Link>
  ) : (
    <Button
      disabled
      className="bg-gray-700 text-white font-semibold px-6 py-2 rounded-md shadow-md cursor-not-allowed"
    >
      Submitted
    </Button>
  );
})()}
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

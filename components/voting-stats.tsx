"use client"

import { useEffect, useState } from "react"
import { getUserVotes } from "@/lib/actions"
import { Progress } from "@/components/ui/progress"

interface VotingStatsProps {
  userId: string
}

export default function VotingStats({ userId }: VotingStatsProps) {
  const [votesUsed, setVotesUsed] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const maxVotes = 2 

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const votes = await getUserVotes(userId)
        setVotesUsed(votes.length)
      } catch (error) {
        console.error("Failed to load votes", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVotes()
  },[votesUsed])

  if (isLoading) {
    return (
      <div className="mt-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-gray-400">Loading your voting stats...</p>
      </div>
    )
  }

  return (
    <div className="mt-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-medium">Your votes</h3>
        <span className="text-purple-400 font-medium">
          {votesUsed} / {maxVotes} used
        </span>
      </div>
      <Progress value={(votesUsed / maxVotes) * 100} className="h-2 bg-gray-700">
        <div className="h-full bg-purple-600 rounded-full" />
      </Progress>
      <p className="mt-2 text-sm text-gray-400">
        {votesUsed >= maxVotes
          ? "You've used all your votes. You can change your votes on the My Votes page."
          : `You have ${maxVotes - votesUsed} votes remaining.`}
      </p>
    </div>
  )
}

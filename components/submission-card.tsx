"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Submission } from "@/lib/types"
import { voteForSubmission, checkVote } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

interface SubmissionCardProps {
  submission: Submission
  userId: string
}

export default function SubmissionCard({ submission, userId }: SubmissionCardProps) {
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(submission.voteCount)

  useEffect(() => {
    const fetchVote = async() => {
      const check = await checkVote(submission.id, userId);
      console.log(check);
      setHasVoted(check);
    }
    fetchVote();
  }, [])

  const handleVote = async () => {
    if (hasVoted) return

    setIsVoting(true)
    try {
      const result = await voteForSubmission(submission.id, userId)

      if (result.success) {
        setHasVoted(true)
        setVoteCount(voteCount + 1)
        toast({
          title: "Vote recorded!",
          description: "Your vote has been successfully recorded.",
        })
      } else {
        toast({
          title: "Voting failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden">
      <CardHeader className="p-0">
        <Link href={submission.url} className="relative h-48 w-full">
          <Image
            src={submission.imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={submission.creatorName}
            fill
            className="object-cover"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          
          <div className="flex items-center gap-1 text-purple-400">
            <span>{voteCount}</span>
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
      
        <div className="flex items-center text-sm text-gray-400">
          <span>By {submission.creatorName}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleVote}
          disabled={isVoting || hasVoted}
          className={`w-full ${
            hasVoted ? "bg-purple-900/50 text-white cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {isVoting ? "Voting..." : hasVoted ? "Voted" : "Upvote"}
        </Button>
      </CardFooter>
    </Card>
  )
}

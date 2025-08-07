"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { removeVote } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface RemoveVoteButtonProps {
  voteId: string
  userId: string
}

export default function RemoveVoteButton({ voteId, userId }: RemoveVoteButtonProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const router = useRouter()

  const handleRemoveVote = async () => {
    setIsRemoving(true)
    try {
      const result = await removeVote(voteId, userId)

      if (result.success) {
        toast({
          title: "Vote removed",
          description: "Your vote has been successfully removed.",
        })
        router.refresh()
      } else {
        toast({
          title: "Failed to remove vote",
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
      setIsRemoving(false)
    }
  }

  return (
    <Button onClick={handleRemoveVote} disabled={isRemoving} variant="destructive" className="w-full">
      {isRemoving ? "Removing..." : "Remove vote"}
    </Button>
  )
}

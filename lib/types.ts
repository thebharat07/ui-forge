export interface Submission {
  id: string
  githubUrl: string
  imageUrl: string
  creatorName: string
  voteCount: number
  hasVoted: boolean
  url: string
}

export interface Vote {
  id: string
  userId: string
  submissionId: string
  createdAt: Date
  submission: Submission
}

import type { Submission, Vote } from "./types"
import { getCollections } from "./collections"
import { ObjectId } from "mongodb";

// Mock data for demonstration purposes
// In a real application, this would be fetched from a database

const mockSubmissions: Submission[] = [
  {
    id: "1",
    title: "Glassmorphic Card Component",
    description: "A beautiful card component with glass effect and subtle hover animations",
    imageUrl: "/placeholder.svg?height=200&width=400",
    creatorId: "user1",
    creatorName: "Alex Johnson",
    voteCount: 24,
    hasVoted: false,
  },
  {
    id: "2",
    title: "Animated Button",
    description: "Responsive button with micro-interactions and loading states",
    imageUrl: "/placeholder.svg?height=200&width=400",
    creatorId: "user2",
    creatorName: "Maria Garcia",
    voteCount: 18,
    hasVoted: false,
  },
  {
    id: "3",
    title: "Dark Mode Toggle",
    description: "Smooth transition between light and dark modes with animated sun/moon icon",
    imageUrl: "/placeholder.svg?height=200&width=400",
    creatorId: "user3",
    creatorName: "David Kim",
    voteCount: 32,
    hasVoted: false,
  },
  {
    id: "4",
    title: "3D Carousel",
    description: "Interactive 3D carousel with perspective effect and touch support",
    imageUrl: "/placeholder.svg?height=200&width=400",
    creatorId: "user4",
    creatorName: "Sarah Chen",
    voteCount: 15,
    hasVoted: false,
  },
  {
    id: "5",
    title: "Notification Badge",
    description: "Animated notification badge with count and pulse effect",
    imageUrl: "/placeholder.svg?height=200&width=400",
    creatorId: "user5",
    creatorName: "James Wilson",
    voteCount: 27,
    hasVoted: false,
  },
  {
    id: "6",
    title: "Progress Stepper",
    description: "Multi-step progress indicator with animated transitions",
    imageUrl: "/placeholder.svg?height=200&width=400",
    creatorId: "user6",
    creatorName: "Emily Rodriguez",
    voteCount: 21,
    hasVoted: false,
  },
]

// Mock votes data
//export const mockVotes: Vote[] = []

export async function getSubmissions(): Promise<Submission[]> {
  // In a real app, fetch from database and check if user has voted for each submission
  const { submissions } = await getCollections();
  const docs = await submissions.find().toArray();
  
  return docs.map((s) => ({
    id: s._id.toString(), // ✅ convert ObjectId to string
    title: s.title,
    imageUrl: s.imageUrl,
    creatorId: s.creatorId,
    creatorName: s.creatorName,
    voteCount: s.voteCount,
    hasvoted: s.hasvoted,
    url: s.url,
    githubUrl: s.githuburl,
  }));
}

export async function getSubmissionsByVotes(): Promise<Submission[]> {
  // Sort submissions by vote count in descending order
  const {submissions} = await getCollections();
  return await submissions.find().sort({voteCount: -1}).toArray();
}

export async function getUserVotes(userId: string): Promise<Vote[]> {
  const { votes } = await getCollections();
  const rawVotes = await votes.find({ userId }).toArray();

  return rawVotes.map((v) => ({
    id: v._id.toString(), // ✅ convert ObjectId to string
    userId: v.userId.toString(), // ✅ ensure userId is string
    submissionId: v.submissionId.toString(), // ✅ ensure submissionId is string
    createdAt: v.createdAt?.toISOString(), // ✅ convert Date to string
  }));
}



export async function getUserVotesWithSubmissions(userId: string): Promise<any[]> {
  const { submissions } = await getCollections();
  const userVotes = await getUserVotes(userId);

  const submissionIds = userVotes.map((vote) => new ObjectId(vote.submissionId));

  const relatedSubmissions = await submissions
    .find({ _id: { $in: submissionIds } })
    .toArray();

  return userVotes.map((vote) => {
    const submission = relatedSubmissions.find(
      (sub) => sub._id.toString() === vote.submissionId
    );
    return {
      ...vote,
      submission: submission as Submission,
    };
  });
}

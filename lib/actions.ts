"use server"

import { revalidatePath } from "next/cache"
import { mockVotes } from "./submissions"
import { getCollections } from "./collections"
import { get } from "http";
// Mock data and functions for demonstration
// In a real app, these would interact with a database
import { ObjectId } from "mongodb";
import { warn } from "console";


export async function voteForSubmission(submissionId: string, userId: string) {
  const {votes, submissions} = await getCollections();

  try {
    // Check if user has already voted for this submission
    //const existingVote = mockVotes.find((vote) => vote.userId === userId && vote.submissionId === submissionId)

    const existingVotes = await votes.findOne({ userId: userId, submissionId: submissionId});

    if (existingVotes) {
      return { success: false, message: "You've already voted for this submission" }
    }

    // Check if user has reached the maximum number of votes (2)
    //const userVotes = mockVotes.filter((vote) => vote.userId === userId)
    const userVote = await votes.find({ userId: userId}).toArray()
    if (userVote.length >= 2) {
      return {
        success: false,
        message: "You've reached the maximum number of votes (2). Remove a vote before adding a new one.",
      }
    }

    // Add the vote
    const newVote = {
      userId,
      submissionId,
      createdAt: new Date(),
    }

    //mockVotes.push(newVote)
    await votes.insertOne( newVote );
    await submissions.updateOne(
      { _id: new ObjectId(submissionId) },
      { $inc: { voteCount: 1 }}
    );

    // In a real app, update the submission's vote count in the database

    revalidatePath("/")
    revalidatePath("/leaderboard")
    revalidatePath("/my-votes")

    return { success: true }
  } catch (error) {
    console.error("Error voting for submission:", error)
    return { success: false, message: "Failed to record your vote" }
  }
}

export async function removeVote(voteId: string, userId: string) {
  const { votes, submissions } = await getCollections();

  try {
    const objectId = new ObjectId(voteId); // ✅ Convert string to ObjectId

    const vote = await votes.findOne({ _id: objectId, userId });

    if (!vote) {
      return { success: false, message: "Vote not found" };
    }

    await votes.deleteOne({ _id: objectId, userId }); // ✅ Use _id and userId
    await submissions.updateOne(
      {_id: new ObjectId(vote.submissionId) },
      { $inc: { voteCount: -1} }
    );

    // Optional: update submission vote count here

    revalidatePath("/");
    revalidatePath("/leaderboard");
    revalidatePath("/my-votes");

    return { success: true };
  } catch (error) {
    console.error("Error removing vote:", error);
    return { success: false, message: "Failed to remove your vote" };
  }
}

export async function getUserVotes(userId: string) {

  const { votes } = await getCollections();
  try {
    return votes.find({ userId: userId }).toArray();
  } catch (error) {
    console.error("Error getting user votes:", error)
    return []
  }
}

export async function checkVote(submissionId: string, userId: string){
  const { votes } = await getCollections();
  try{
   const vote = await votes.findOne({ userId: userId, submissionId: submissionId });
   if(vote) return true;
  }catch(error) {
    console.error("Error checking vote: ", error)
    return false;
  }
  return false
}

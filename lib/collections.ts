import clientPromise from "./db";

export async function getCollections() {
  const client = await clientPromise;
  const database = client.db("uiforge");

  return {
    participants: database.collection("participants"),
    votes: database.collection("votes"),
    submissions: database.collection("submissions"),
  }
}



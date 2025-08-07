import {MongoClient} from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {

  tls: true,
};

let client, clientPromise;

if(!process.env.MONGODB_URI){
  throw new Error("Please add mongodb uri");
}

client = new MongoClient(uri, options);
clientPromise = client.connect()

export default clientPromise;

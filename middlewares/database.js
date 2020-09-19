// import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import mongoose from "mongoose";
import { ProfileSchema } from "utils/mongoose/schemas";

// const client = new MongoClient(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const connection = mongoose.createConnection(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  // bufferCommands: false,
  // bufferMaxEntries: 0,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const client = connection.client;
const middleware = nextConnect();

middleware.use(async (req, res, next) => {
  if (!client.isConnected()) await client.connect();

  req.dbClient = client;
  req.db = client.db();
  req.models = {
    Profile: connection.model("Profile", ProfileSchema),
  };

  return next();
});

export default middleware;

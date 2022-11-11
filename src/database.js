import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URI);
  console.log("database is connected");
}

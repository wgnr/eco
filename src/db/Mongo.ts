import mongoose, { Mongoose } from "mongoose";
// Use mongoose with promises
mongoose.Promise = global.Promise;

export const Mongo = (async () => {
  let db: Mongoose;

  const connect = async () => {
    db = await mongoose
      .connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
  }

  return {
    async get() {
      if (!db) await connect()

      return db
    }
  }
})()

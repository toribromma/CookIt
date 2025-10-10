import mongoose from "mongoose";

const connectDB = async () => {
  if (!global.mongooseConnection) {
    global.mongooseConnection = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return global.mongooseConnection;
};

export default connectDB;

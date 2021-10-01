import mongoose, { ConnectOptions } from "mongoose";
import { ConnectionOptions } from "tls";

const connectToDb = async () => {
  try {
    const uri: string =
      process.env.MONGOURI || "mongodb://localhost:27017/test";
    const PORT: string | number = process.env.PORT || 5000;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    const connection = await mongoose.connect(
      uri,
      options as ConnectionOptions
    );
    console.log(`Server running on Port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectToDb;

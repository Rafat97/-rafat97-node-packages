import mongoose from "mongoose";

export const mongoDBConnectionCheck = (connecTionString: string) => {
  mongoose
    .connect(connecTionString)
    .then(() => {
      console.log(connecTionString);
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.log(connecTionString);
      console.log(
        "%s MongoDB connection error. Please make sure MongoDB is running.",
        "✗"
      );
      console.log(error);
    });
};

export const mongoDBConnectionCheckSync = async (connecTionString: string) => {
  let isConnected: boolean = true;
  try {
    await mongoose.connect(connecTionString);
    console.log(connecTionString);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(connecTionString);
    console.log(
      "%s MongoDB connection error. Please make sure MongoDB is running.",
      "✗"
    );
    isConnected = false;
    console.log(error);
  }
  return isConnected;
};

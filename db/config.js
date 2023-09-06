const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Database intialization error");
  }
};

module.exports = {
  dbConnection,
};

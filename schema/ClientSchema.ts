import Mongoose from "mongoose";

const Client = new Mongoose.Schema(
  {
    email: {
      type: String,
      unique: true
    },

    fullName: {
        type: String
    },

    password: {
        type: String
    }
  },
  { timestamps: true }
);

export default Mongoose.model('clients', Client)

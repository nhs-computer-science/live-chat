import Mongoose from "mongoose";

const Attendance = new Mongoose.Schema(
  {
    token: {
      type: String,
      unique: true
    },

    email: {
      type: String,
      unique: true
    },

    fall2021Meetings: {
      type: Number
    }
  },
  { timestamps: true }
);

export default Mongoose.model('Attendance', Attendance)

import Mongoose from 'mongoose';

const Client = new Mongoose.Schema(
  {
    email: {
      type: String,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('clients', Client);

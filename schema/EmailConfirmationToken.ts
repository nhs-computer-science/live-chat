import Mongoose from 'mongoose';

const EmailConfirmationToken = new Mongoose.Schema(
  {
    email: {
      type: String,
    },

    token: {
      type: String,
    },

    createdAt: {
      type: Date,
      expires: '1m',
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model(
  'EmailConfirmationTokens',
  EmailConfirmationToken
);

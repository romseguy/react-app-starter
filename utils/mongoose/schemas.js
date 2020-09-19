import mongoose from "mongoose";

export const ProfileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
  },
});

ProfileSchema.index(
  {
    firstname: 1,
    lastname: 1,
  },
  { unique: true, background: true }
);

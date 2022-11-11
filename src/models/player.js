import mongooose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongooose;

const Player = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },

    score: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

Player.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

Player.methods.comparetPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default new model("Player", Player);

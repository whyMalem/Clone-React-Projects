import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

const MessageModal = new mongoose.model("message", MessageSchema);
export default MessageModal;

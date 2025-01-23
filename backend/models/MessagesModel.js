import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    messageType: {
      type: String,
      enum: ['text', 'file'],
      required: true,
    },
    messageContent: {
      type: String,
      validate: {
        validator: function () {
          return this.messageType === 'text' || this.messageContent == null;
        },
        message: 'messageContent is required for messageType "text".',
      },
    },
    fileUrl: {
      type: String,
      validate: {
        validator: function () {
          return this.messageType === 'file' || this.fileUrl == null;
        },
        message: 'fileUrl is required for messageType "file".',
      },
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });


const Message = mongoose.model('Message', messageSchema);

export default Message;
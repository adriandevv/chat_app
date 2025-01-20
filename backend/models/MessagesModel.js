import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    messageType: {
        type: String,
        enum: ['text', 'file'],
        required: true
    },
    messageContent: {
        type: String,
        required: () => this.messageType === 'text',
    },
    fileUrl: {
        type: String,
        required: () => this.messageType === 'file',
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

});


const Message = mongoose.model('Message', messageSchema);

export default Message;
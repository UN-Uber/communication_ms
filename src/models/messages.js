const mongoose= require('mongoose')

const messagesSchema= new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatSession'
    },
    sender_type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    send_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports= mongoose.model('Message', messagesSchema)

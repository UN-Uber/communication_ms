const mongoose= require('mongoose')

const chatSessionSchema= new mongoose.Schema({
    user_id: {
        type: Number,
        required: true 
    },
    driver_id: {
        type: Number,
        required: true 
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    state: {
        type: String,
        required: true
    }
})

module.exports= mongoose.model('ChatSession', chatSessionSchema)

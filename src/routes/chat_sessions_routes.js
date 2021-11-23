const express= require('express')
const router= express.Router()
const ChatSession= require('../models/chat_session')

// Get all the chat session
router.get('/', async (req, resp)=> {
    try {
        const chat_sessions= await ChatSession.find()
        resp.json(chat_sessions)
    } catch (err) {
        resp.status(500).json({message: err.message})
    }
})

// Get one chat session by id
router.get('/:id', getChat, (req, resp)=> {
    resp.send(resp.chat.state)
})

// Create new chat session
router.post('/', async (req, resp)=> {
    const new_chat_session= new ChatSession({
        user_id: req.body.user_id,
        driver_id: req.body.driver_id,
        created_at: req.body.created_at,
        state: req.body.state
    })

    try {
        const new_chat= await new_chat_session.save()
        resp.status(201).json(new_chat)
    } catch (err) {
        resp.status(400).json({message: err.message})
    }
})

// Update chat session
router.patch('/:id', getChat, async (req, resp)=> {
    if (req.body.status != null) {
        resp.chat.status= req.body.status
    }

    try {
        const updated_chat= await resp.chat.seve()
        resp.json(updated_chat)
    } catch (err) {
        resp.status(400).json({message: err.message})
    }
})


// Delete chat session
router.delete('/:id', getChat, async (req, resp)=> {
    try {
        await resp.chat.remove()
        resp.json({message: 'Sesión de chat eliminada'})
    } catch (err) {
        resp.status(500).json({message: err.message})
    }
})

// Middleware to get chat session by id
async function getChat(req, resp, next){
    try {
        chat= await ChatSession.findById(req.params.id)

        if (chat == null) {
            return resp.status(404).json({message: 'No se pudo hallar la sesión de chat'})
        }
    } catch (err) {
        return resp.status(500).json({message: err.message})
    }

    resp.chat= chat
    next()
}

module.exports = router

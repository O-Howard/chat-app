import Message from '../models/message.model.js'

const getMessages = async(req, res)=>{
    try {
        const {chatId} = req.params;
        if (!chatId) {
            return res.status(400).json({ message: "chatId is required" });
        }

        const messages = await Message.find({chat: chatId})
        .sort({createdAt: 1})
        
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export {getMessages};
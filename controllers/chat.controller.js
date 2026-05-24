import Chat from "../models/chat.model.js";

const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({
      participants: userId,
    })
      .populate("participants", "username")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const accessChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const receiverId = req.body.id;

    if (!receiverId) {
      return res.status(400).json({ message: "Userid is required" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, receiverId] },
    })
      .populate("participants", "username")
      .populate("lastMessage");

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, receiverId],
      });

      chat = await Chat.findById(chat._id)
        .populate("participants", "username")
        .populate("lastMessage");
    }

    return res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {getUserChats, accessChat};
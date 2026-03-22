const dmService = require("./dmService");

async function openChat(req, res) {
  const userId = req.user.id;
  const { targetId } = req.body;

  const chat = await dmService.openChat(userId, targetId);
  res.json({ chat });
}

async function sendMessage(req, res) {
  const userId = req.user.id;
  const { chatId, text } = req.body;

  const message = await dmService.sendMessage(chatId, userId, text);
  res.json({ message });
}

async function getMessages(req, res) {
  const { chatId } = req.params;

  const messages = await dmService.getMessages(chatId);

  if (!messages) {
    return res.status(404).json({ error: "Чат не найден" });
  }

  res.json({ messages });
}

async function listChats(req, res) {
  const userId = req.user.id;

  const chats = await dmService.getUserChats(userId);
  res.json({ chats });
}

module.exports = {
  openChat,
  sendMessage,
  getMessages,
  listChats,
};

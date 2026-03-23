import { getChatList } from "./api/channels.js";
import { renderChatList } from "./ui/chatUI.js";

async function init() {
  const chats = await getChatList();

  if (chats.error) {
    alert(chats.error);
    return;
  }

  renderChatList(chats.chats);
}

init();

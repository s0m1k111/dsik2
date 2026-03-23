export function renderChatList(chats) {
  const container = document.getElementById("chatList");
  container.innerHTML = "";

  chats.forEach((chat) => {
    const div = document.createElement("div");
    div.className = "chat-item";

    const name = chat.partner ? chat.partner.username : "Неизвестный";
    const last = chat.lastMessage ? chat.lastMessage.text : "Нет сообщений";

    div.innerHTML = `
      <strong>${name}</strong><br>
      <span>${last}</span>
    `;

    div.addEventListener("click", () => {
      console.log("Открыть чат:", chat.chatId);
      // позже добавим открытие чата
    });

    container.appendChild(div);
  });
}

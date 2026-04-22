import getFetchInstance from "./fetch";

interface TelegramMessage {
    chat: { id: number }
    text: string
}

const userState = new Map<number, "awaiting_answer">()

async function sendMessage(token: string, chatId: number, text: string): Promise<unknown> {
    const fetchInstance = await getFetchInstance(token);
    return fetchInstance.post('sendMessage', {
        chat_id: chatId,
        text: text
    });
}

async function handleMessage(token: string, messageObject: TelegramMessage): Promise<unknown> {
    const messageChatId = messageObject.chat.id
    const messageText = messageObject.text

    if (messageText.charAt(0) === "/") {
        switch (messageText) {
            case "/start":
                userState.set(messageChatId, "awaiting_answer")
                return sendMessage(token, messageChatId, "What is 5 + 5?");
            default:
                return sendMessage(token, messageChatId, "Unknown command");
        }
    } else {
        if (userState.get(messageChatId) === "awaiting_answer") {
            userState.delete(messageChatId)
            if (messageText.trim() === "10") {
                return sendMessage(token, messageChatId, "correct")
            } else {
                return sendMessage(token, messageChatId, "YOU DUMBASS LMFAO")
            }
        }
        return sendMessage(token, messageChatId, messageText)
    }
}

export default handleMessage;

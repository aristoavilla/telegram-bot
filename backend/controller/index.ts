import handleMessage from "./lib/Telegram"

interface TelegramBody {
    message: {
        chat: { id: number }
        text: string
    }
}

async function handler(body: TelegramBody | undefined): Promise<void> {
    if (body) {
        const messageObj = body.message;
        await handleMessage(messageObj);
    }
}

export default handler

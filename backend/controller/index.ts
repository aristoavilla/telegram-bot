import handleMessage from "./lib/Telegram"

interface TelegramBody {
    message: {
        chat: { id: number }
        text: string
    }
}

async function handler(body: TelegramBody | undefined, token: string): Promise<void> {
    if (body) {
        const messageObj = body.message;
        await handleMessage(token, messageObj);
    }
}

export default handler

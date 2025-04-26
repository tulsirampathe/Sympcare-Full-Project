// whatsappRoutes.js
import express from 'express';
import client from '../whatsappClient.js';

const router = express.Router();

router.post('/send-message', async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Please provide valid messages.' });
    }

    let failedNumbers = [];
    let successfulNumbers = [];

    for (const messageObj of messages) {
        const { type, numbers, message } = messageObj;

        if (!numbers || !Array.isArray(numbers) || numbers.length === 0 || !message || !type) {
            return res.status(400).json({ error: 'Invalid data format. Please include type, numbers, and message.' });
        }

        for (const number of numbers) {
            const chatId = `91${number}@c.us`;
            
            try {
                await client.sendMessage(chatId, message);
                console.log(`Message sent to ${number} with type ${type}`);
                successfulNumbers.push(number);
            } catch (error) {
                console.log(`Failed to send ${type} message to ${number}:`, error);
                failedNumbers.push(number);
            }
        }
    }

    if (failedNumbers.length > 0) {
        return res.status(500).json({ error: `Failed to send messages to: ${failedNumbers.join(', ')}` });
    }

    return res.status(200).json({ success: `Messages sent successfully to: ${successfulNumbers.join(', ')}` });
});

export default router;

// whatsappRoutes.js
import express from 'express';
import whatsappWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsappWeb;
import qrcode from 'qrcode-terminal';

const router = express.Router();
const client = new Client({
    authStrategy: new LocalAuth(),
});

let qrGenerated = false;

// Generate QR code for authentication
client.on('qr', (qr) => {
    if (!qrGenerated) {
        qrcode.generate(qr, { small: true });
        console.log('Please scan the QR code above with your WhatsApp mobile app.');
        qrGenerated = true;
    }
});

// When the client is ready
client.on('ready', () => {
    console.log('WhatsApp Web is ready!');
});

// Send message to multiple numbers
router.post('/send-message', async (req, res) => {
    const { numbers, message } = req.body;  // Expect an array of numbers

    if (!numbers || !Array.isArray(numbers) || numbers.length === 0 || !message) {
        return res.status(400).json({ error: 'Please provide valid numbers and message.' });
    }

    let failedNumbers = [];
    let successfulNumbers = [];

    // Loop through each number
    for (const number of numbers) {
        const chatId = `91${number}@c.us`;  // Ensure country code is added

        try {
            await client.sendMessage(chatId, message);
            console.log(`Message sent to: ${number}`);
            successfulNumbers.push(number);
        } catch (error) {
            console.log(`Failed to send message to ${number}:`, error);
            failedNumbers.push(number);
        }
    }

    if (failedNumbers.length > 0) {
        return res.status(500).json({ error: `Failed to send messages to: ${failedNumbers.join(', ')}` });
    }

    return res.status(200).json({ success: `Messages sent successfully to: ${successfulNumbers.join(', ')}` });
});

// Initialize WhatsApp client
client.initialize();

// Export router
export default router;

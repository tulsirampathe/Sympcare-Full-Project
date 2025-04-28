import express from 'express';
import client from '../whatsappClient.js';

const router = express.Router();

// Validate if the number is a valid 10-digit phone number (no country code)
const isValidNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
};

router.post('/send-message', async (req, res) => {
    const { number, type, message } = req.body;

    // Basic validations
    if (!number || !message || !type) {
        return res.json({ success: false, message: 'Missing required fields' });
    }

    // Trim and validate the number
    const trimmedNumber = number.trim();
    if (!isValidNumber(trimmedNumber)) {
        return res.json({ success: false, message: 'Invalid number format' });
    }

    // Append the country code (91 for India) dynamically at runtime
    const chatId = `91${trimmedNumber}@c.us`;

    try {
        // Log chatId for debugging purposes
        console.log(`Attempting to send message to ${chatId}`);

        // Send the message using WhatsApp Web client
        await client.sendMessage(chatId, message);
        console.log(`Message sent to ${trimmedNumber} with type ${type}`);
        return res.json({ success: true, message: `Message sent to ${trimmedNumber}` });
    } catch (error) {
        // Log detailed error message for debugging
        console.error(`Failed to send ${type} message to ${trimmedNumber}:`, error);

        // Return a user-friendly error message
        if (error.message.includes('invalid wid')) {
            return res.json({ success: false, message: 'User does not exist or is not available on WhatsApp' });
        }

        return res.json({ success: false, message: 'Failed to send message' });
    }
});

export default router;

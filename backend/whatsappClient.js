// whatsappClient.js
import whatsappWeb from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const { Client, LocalAuth } = whatsappWeb;

const client = new Client({
    authStrategy: new LocalAuth(),
});

// Flag to ensure QR code is generated only once
let qrGenerated = false;

// Event listener for QR code generation
client.on('qr', (qr) => {
    if (!qrGenerated) {
        qrcode.generate(qr, { small: true });
        console.log('Please scan the QR code above with your WhatsApp mobile app.');
        qrGenerated = true;
    }
});

// Event listener when the client is ready
client.on('ready', () => {
    console.log('WhatsApp Web is ready!');
});

client.on('message', async (message) => {
    console.log(`Received message from ${message.from}: ${message.body}`);

    // Check if the message is valid (you can add more logic here as per your requirement)
    if (message.body.toLowerCase() === 'hi') {
        await message.reply('Hello! How can I assist you today?');
    }

    // Handle other message types (media, contacts, etc.)
    // You can add more conditions to process other types of messages if needed
});

// Event listener for any errors in the WhatsApp client
client.on('error', (error) => {
    console.error('WhatsApp Web Client error:', error);
});

export default client;

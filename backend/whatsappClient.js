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

// Event listener for any errors in the WhatsApp client
client.on('error', (error) => {
    console.error('WhatsApp Web Client error:', error);
});

export default client;

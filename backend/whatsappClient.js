import whatsappWeb from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const { Client, LocalAuth } = whatsappWeb;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox'],
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // your path here
    }
  });
  

// Flag to ensure QR code is generated only once
let qrGenerated = false;

// QR Code Event
client.on('qr', (qr) => {
  if (!qrGenerated) {
    qrcode.generate(qr, { small: true });
    console.log('📱 Scan the QR code above with your WhatsApp mobile app.');
    qrGenerated = true;
  }
});

// Ready Event
client.on('ready', () => {
  console.log('✅ WhatsApp Web client is ready!');
});

// Error Event
client.on('error', (error) => {
  console.error('❌ WhatsApp Web Client error:', error.message || error);
});

// Disconnection Handler (optional but helpful)
client.on('disconnected', (reason) => {
  console.warn('⚠️ WhatsApp disconnected:', reason);
});

// Export a function to initialize with retry logic
export const initializeWhatsApp = async () => {
  try {
    console.log('🔄 Initializing WhatsApp client...');
    await client.initialize();
  } catch (error) {
    console.error('❌ Failed to initialize WhatsApp client:', error.message || error);
  }
};

export default client;

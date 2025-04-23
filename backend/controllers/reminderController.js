const { Client } = require('whatsapp-web.js');
const { generate } = require('qrcode-terminal');

// Initialize the WhatsApp client
const client = new Client();

// Generate and display QR code
client.on('qr', (qr) => {
    generate(qr, { small: true });  // Display QR code in terminal
    console.log('📱 Scan this QR code with your WhatsApp app');
});

// Client ready event
client.on('ready', () => {
    console.log('✅ WhatsApp is ready!');
    
    const phoneNumber = '7692057868@c.us';
    const message = "Test message from SympCare!";
    
    client.sendMessage(phoneNumber, message)
        .then(response => {
            console.log('Message Sent: ', response);
        })
        .catch(err => {
            console.log('Error: ', err);
        });
});
;

// Function to send reminder
const sendReminder = (req, res) => {
    // Check if WhatsApp client is ready before sending the message
    if (!client.pupPage || !client.pupPage.isConnected()) {
        return res.status(500).json({ message: '❌ WhatsApp client is not connected.' });
    }

    const phoneNumber = '8962738918';  // Replace with actual phone number
    const chatId = phoneNumber + "@c.us";  // Format for WhatsApp

    const message = "⏰ Hey! This is a reminder from SympCare: Your appointment is today at 5PM. Stay healthy! 💚";

    // Send the message
    client.sendMessage(chatId, message)
        .then(response => {
            res.status(200).json({ message: '✅ Reminder sent successfully!' });
        })
        .catch(err => {
            res.status(500).json({ message: '❌ Failed to send reminder: ' + err });
        });
};

// Initialize client and listen for 'ready' event before allowing messages
client.initialize();

module.exports = { sendReminder };

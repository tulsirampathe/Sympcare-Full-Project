import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSms = async (req, res) => {
    try {
        const { to, message } = req.body;

        console.log(req.body);
        
        if (!to || !message) {
            return res.status(400).json({ success: false, error: "❌ Missing phone number or message!" });
        }

        const sms = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });

        res.status(200).json({ success: true, message: "✅ SMS sent!", sid: sms.sid });

    } catch (error) {
        console.error("Twilio Error:", error);
        res.status(500).json({ success: false, error: "⚠ Failed to send SMS." });
    }
};
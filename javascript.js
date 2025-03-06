// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

const API_TOKEN = 'YOUR_WHATSAPP_API_TOKEN'; // Replace with your API token
const PHONE_NUMBER_ID = '9313727359'; // Replace with your phone number ID

// Endpoint to send WhatsApp messages
app.post('/send-message', async (req, res) => {
    const { phoneNumber, message } = req.body;

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'text',
                text: { body: message },
            },
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
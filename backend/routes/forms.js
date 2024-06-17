const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

router.post('/', async (req, res) => {
    const { type, name, countryCode, phoneNumber } = req.body;
    try {
        const form = await Form.create({ type, name, countryCode, phoneNumber });
        res.status(201).json(form);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const forms = await Form.findAll();
        res.json(forms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to refresh the Google Sheet
router.get('/refresh', async (req, res) => {
    try {
        const forms = await Form.findAll();

        // Dynamically import node-fetch
        const fetch = await import('node-fetch').then(mod => mod.default);

        // Iterate over each form and send it to Google Sheets
        const webAppURL = 'https://script.google.com/macros/s/AKfycbyN0kbiWng5AYmGs-yCzxwDcLHrCkFgzL9fIbA9XRpewleBJ2oDN1b844UaJ9Kj4MvSpg/exec'; 

        for (const form of forms) {
            const response = await fetch(webAppURL, {
                method: 'POST',
                body: JSON.stringify({
                    type: form.type,
                    name: form.name,
                    countryCode: form.countryCode,
                    phoneNumber: form.phoneNumber
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            console.log('Response from Google Sheets:', data);
        }

        res.status(200).json({ message: 'Data refreshed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

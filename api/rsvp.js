export default async function handler(req, res) {
    if (req.method === 'POST') {
        const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

        if (!scriptUrl) {
            return res.status(500).json({ error: 'Server misconfiguration: GOOGLE_SCRIPT_URL is missing' });
        }

        try {
            // Forward the request to Google Apps Script
            // Note: Google Apps Script Web Apps require following redirects for POST requests usually,
            // but fetch handles redirects by default.
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                throw new Error(`Google Script returned ${response.status}`);
            }

            // Read response usually as text or json from Google
            const data = await response.text();

            // Google Apps Script usually returns a redirect or text/plain success message
            // We'll wrap it in a JSON response for our frontend
            return res.status(200).json({ success: true, message: 'RSVP sent', data });

        } catch (error) {
            console.error('Proxy Error:', error);
            return res.status(500).json({ error: 'Failed to send RSVP', details: error.message });
        }
    }

    // Handle other methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

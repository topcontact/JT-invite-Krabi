import QRCode from 'qrcode';
import fs from 'fs';

const baseUrl = 'https://jt-invite.vercel.app'; // Based on your GitHub repo name

const links = [
    { name: 'all', url: `${baseUrl}/` },
    { name: 'bangkok', url: `${baseUrl}/?invite=bangkok` },
    { name: 'krabi', url: `${baseUrl}/?invite=krabi` }
];

const generateQRs = async () => {
    // Create 'qrcodes' directory if it doesn't exist
    if (!fs.existsSync('qrcodes')) {
        fs.mkdirSync('qrcodes');
    }

    console.log('Generating QR Codes for:', baseUrl);

    for (const link of links) {
        try {
            const fileName = `qrcodes/qr-${link.name}.png`;
            await QRCode.toFile(fileName, link.url, {
                color: {
                    dark: '#1B2A41',  // Navy (Matches your theme)
                    light: '#FFFFFF'
                },
                width: 500
            });
            console.log(`✅ Generated: ${fileName} -> ${link.url}`);
        } catch (err) {
            console.error(`Error generating ${link.name}:`, err);
        }
    }
};

generateQRs();

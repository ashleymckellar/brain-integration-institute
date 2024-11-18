const { google } = require('googleapis');

async function addDrivePermission(documentId, userEmail) {
    // Initialize OAuth2 client with your credentials
    const oauth2Client = new google.auth.OAuth2(
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'GOOGLE_DOC_REDIRECT_URI'
    );

    // Set OAuth2 token
    oauth2Client.setCredentials({
        access_token: 'YOUR_ACCESS_TOKEN',
        refresh_token: 'YOUR_REFRESH_TOKEN',
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    try {
       
        await drive.permissions.create({
            fileId: documentId,
            requestBody: {
                role: 'reader',
                type: 'user',
                emailAddress: userEmail,
            },
        });
        console.log(`Successfully added ${userEmail} as a reader to the document.`);
    } catch (error) {
        console.error('Error adding permission:', error.message);
    }
}


const documentId = 'YOUR_DOCUMENT_ID';
const userEmail = 'user@example.com';
addDrivePermission(documentId, userEmail);

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

export const echoRequestBody = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method Not Allowed' });
        return;
    }

    const requestBody = req.body;

    if (!requestBody) {
        res.status(400).send({ message: 'Bad Request: Missing body' });
        return;
    }

    res.status(200).send({
        message: 'Received body successfully',
        body: requestBody,
    });
});

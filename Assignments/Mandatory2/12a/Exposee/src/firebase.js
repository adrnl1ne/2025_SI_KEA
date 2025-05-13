const admin = require('firebase-admin');
const serviceAccount = require('../firebase-key.json'); // Your downloaded service account key

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
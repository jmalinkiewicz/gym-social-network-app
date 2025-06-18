require("dotenv").config();

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require(process.env.SERVICE_ACCOUNT_KEY_PATH);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db };

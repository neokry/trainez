var admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            type: "service_account",
            project_id: "trainez-a0455",
            private_key_id: "2873637cfabb131c7d5b18d7ab737ccf88644707",
            private_key: `-----BEGIN PRIVATE KEY-----${process.env.FIRE_ADMIN_SECRET}-----END PRIVATE KEY-----\n`,
            client_email:
                "firebase-adminsdk-k4phl@trainez-a0455.iam.gserviceaccount.com",
            client_id: "103503259350022555331",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url:
                "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url:
                "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k4phl%40trainez-a0455.iam.gserviceaccount.com",
        }),
        databaseURL: "https://trainez-a0455.firebaseio.com",
    });
}

const firestore = admin.firestore();

export { firestore };

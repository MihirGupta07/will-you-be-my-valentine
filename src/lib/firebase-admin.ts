import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let app: App | null = null;
let db: Firestore | null = null;
let initialized = false;
let initError: Error | null = null;

function initializeFirebaseAdmin(): { app: App | null; db: Firestore | null } {
  // Only try to initialize once
  if (initialized) {
    return { app, db };
  }
  initialized = true;

  if (getApps().length > 0) {
    app = getApps()[0];
    db = getFirestore(app);
    return { app, db };
  }

  // Try different credential formats
  const credentialsJson = process.env.FIREBASE_ADMIN_CREDENTIALS;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  try {
    // Option 1: Full JSON credentials in FIREBASE_ADMIN_CREDENTIALS
    if (credentialsJson) {
      try {
        const serviceAccount = JSON.parse(credentialsJson);
        app = initializeApp({
          credential: cert(serviceAccount),
        });
        db = getFirestore(app);
        console.log("[Firebase Admin] Initialized with JSON credentials");
        return { app, db };
      } catch (parseError) {
        console.warn(
          "[Firebase Admin] Failed to parse FIREBASE_ADMIN_CREDENTIALS as JSON, trying individual env vars"
        );
      }
    }

    // Option 2: Individual environment variables
    if (projectId && clientEmail && privateKey) {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          // Handle escaped newlines in private key
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
      db = getFirestore(app);
      console.log("[Firebase Admin] Initialized with individual env vars");
      return { app, db };
    }

    // Neither option available - that's okay for dev mode
    console.log(
      "[Firebase Admin] No credentials configured - running in dev mode"
    );
    return { app: null, db: null };
  } catch (error) {
    initError = error instanceof Error ? error : new Error(String(error));
    console.error("[Firebase Admin] Initialization error:", initError.message);
    return { app: null, db: null };
  }
}

// Initialize on module load
const firebase = initializeFirebaseAdmin();

export const adminDb = firebase.db;
export const adminApp = firebase.app;
export const isFirebaseAdminConfigured = (): boolean => firebase.db !== null;
export const getInitError = (): Error | null => initError;

export default firebase.app;

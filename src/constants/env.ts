export const FIREBASE_ENV = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const EMAIL_SERVICE_ENV = {
  emailService: process.env.EMAIL_SERVICE,
  emailSender: process.env.EMAIL_SENDER,
  emailSenderPass: process.env.EMAIL_SENDER_PASS,
};

export const RECAPTCHA_V3 = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  secretKey: process.env.RECAPTCHA_SECRET_KEY,
  validationBaseURL: process.env.NEXT_PUBLIC_VALIDATION_BASE_URL,
};

export const APP_ROLES = {
  ADMIN: process.env.ADMIN_ROLE,
  SUPER_ADMIN: process.env.SUPER_ADMIN_ROLE,
  ORGANISATEUR: process.env.ORGANISATEUR_ROLE,
  PARTICIPANT: process.env.PARTICIPANT_ROLE,
};

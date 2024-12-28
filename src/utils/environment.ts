export function getEnvironment() {
  return {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    origin: window.location.origin
  };
}

export function validateEnvironment() {
  const requiredVars = {
    VITE_GMAIL_API_KEY: import.meta.env.VITE_GMAIL_API_KEY,
    VITE_GMAIL_CLIENT_ID: import.meta.env.VITE_GMAIL_CLIENT_ID
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}
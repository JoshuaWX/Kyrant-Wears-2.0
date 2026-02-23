/**
 * Error Message Mapper — Converts Supabase error strings into
 * human-friendly messages that feel personal and helpful.
 *
 * Call `friendlyError(rawMessage)` anywhere in the app to get
 * a warm, user-facing error string.
 */

const ERROR_MAP: Record<string, string> = {
  /* ── Sign-up errors ── */
  "User already registered":
    "Looks like you already have an account with us! Try logging in instead.",
  "user already exists":
    "Looks like you already have an account with us! Try logging in instead.",
  "A user with this email address has already been registered":
    "Looks like you already have an account with us! Try logging in instead.",
  "Email rate limit exceeded":
    "Whoa, slow down! Too many attempts — please wait a minute and try again.",
  "For security purposes, you can only request this after":
    "For your security, please wait a bit before trying again.",
  "Password should be at least 6 characters":
    "Your password needs to be at least 6 characters long. A little longer goes a long way!",
  "Signup requires a valid password":
    "Please enter a valid password (at least 6 characters).",

  /* ── Login errors ── */
  "Invalid login credentials":
    "Hmm, that email or password doesn't look right. Give it another try!",
  "Email not confirmed":
    "You haven't confirmed your email yet. Please check your inbox (and spam folder) for the confirmation link.",
  "Invalid Refresh Token: Refresh Token Not Found":
    "Your session has expired. Please log in again.",
  "invalid claim: missing sub claim":
    "Something went wrong with your session. Please log in again.",

  /* ── OAuth errors ── */
  "Error getting user email from external provider":
    "We couldn't get your email from Google. Please make sure you allow email access and try again.",
  "Multiple accounts with the same email address in the same linking domain detected":
    "An account with this email already exists. Try logging in with your email and password instead.",
  "Unverified email with external provider":
    "Google didn't verify your email. Please try again or sign up with email and password.",

  /* ── Rate limits / server ── */
  "Request rate limit reached":
    "Too many requests — please take a breather and try again in a moment.",
  "over_email_send_rate_limit":
    "We've sent too many emails recently. Please wait a few minutes and try again.",

  /* ── Network errors ── */
  "Failed to fetch":
    "Couldn't reach our servers. Please check your internet connection and try again.",
  "NetworkError when attempting to fetch resource":
    "It looks like you're offline. Check your connection and give it another shot.",
  "Load failed":
    "Connection lost — please check your internet and try again.",
};

/**
 * Convert a raw Supabase error message to a friendly, human one.
 * Falls back to a polished generic message if no match is found.
 */
export function friendlyError(raw: string | null | undefined): string {
  if (!raw) return "Something unexpected happened. Please try again.";

  // ── Role mismatch (from AuthContext signIn) ──
  // Format: ROLE_MISMATCH:actualRole:expectedRole
  if (raw.startsWith("ROLE_MISMATCH:")) {
    const parts = raw.split(":");
    const actualRole = parts[1] ?? "other";
    const expectedRole = parts[2] ?? "this";
    const friendlyActual = actualRole.charAt(0).toUpperCase() + actualRole.slice(1);
    const friendlyExpected = expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1);
    return `You're registered as a ${friendlyActual}. Please use the ${friendlyActual} login page instead of the ${friendlyExpected} one.`;
  }

  // Exact match
  if (ERROR_MAP[raw]) return ERROR_MAP[raw];

  // Partial / substring match (for messages that vary slightly)
  const lowerRaw = raw.toLowerCase();
  for (const [key, friendly] of Object.entries(ERROR_MAP)) {
    if (lowerRaw.includes(key.toLowerCase())) return friendly;
  }

  // Fallback — still friendly
  return "Something went wrong on our end. Please try again in a moment.";
}

/**
 * Simple email format validation.
 * Returns a friendly message or null if valid.
 */
export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Please enter your email address.";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email.trim()))
    return "That doesn't look like a valid email. Double-check and try again!";
  return null;
}

/**
 * Password strength check for signup.
 * Returns a friendly message or null if valid.
 */
export function validatePassword(password: string): string | null {
  if (!password) return "Please enter a password.";
  if (password.length < 6)
    return "Your password needs to be at least 6 characters. Almost there!";
  return null;
}

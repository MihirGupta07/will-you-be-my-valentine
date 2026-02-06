/**
 * Slug generation utility for AskYourValentine
 *
 * Format: 6 characters, case-sensitive alphanumeric
 * Character set: A-Z, a-z, 0-9 (62 characters)
 * Total combinations: 62^6 = 56,800,235,584 (~56.8 billion)
 */

const SLUG_LENGTH = 6;
const SLUG_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generates a random 6-character alphanumeric slug
 */
export function generateSlug(): string {
  let slug = "";
  for (let i = 0; i < SLUG_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * SLUG_CHARS.length);
    slug += SLUG_CHARS[randomIndex];
  }
  return slug;
}

/**
 * Validates if a string is a valid slug format
 */
export function isValidSlug(slug: string): boolean {
  if (slug.length !== SLUG_LENGTH) {
    return false;
  }
  return /^[A-Za-z0-9]+$/.test(slug);
}

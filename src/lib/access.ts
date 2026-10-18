// Shared password gate. Set SITE_PASSWORD to turn it on; leave it unset to keep the site open.
export const ACCESS_COOKIE = "site_access";

/** The cookie holds a hash of the password, never the password itself. */
export async function accessToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`peakprep:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Only allow redirects back to a path on this site. */
export function safeNext(next: string | null | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

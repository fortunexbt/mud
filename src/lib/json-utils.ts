export function safeJsonParse<T>(
  json: string | null | undefined,
  fallback: T
): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    console.error("Failed to parse JSON, returning fallback:", json, e);
    return fallback;
  }
}

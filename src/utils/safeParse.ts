// Utility function for safe JSON parsing
export function safeParse(raw: string | null | undefined, fallback: any = {}) {
  if (!raw || typeof raw !== 'string' || raw.trim() === '') return fallback;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

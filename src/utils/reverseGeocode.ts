// utils/reverseGeocode.ts
// Converts coordinates to a human-readable location using OpenStreetMap Nominatim API
export async function reverseGeocode(lat: number, lon: number): Promise<any> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

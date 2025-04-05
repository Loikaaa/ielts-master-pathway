
export async function detectUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_name || 'Unknown';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'Unknown';
  }
}

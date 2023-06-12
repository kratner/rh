export function getRandomCoordinate(
  minLat: number = -90,
  maxLat: number = 90,
  minLng: number = -180,
  maxLng: number = 180
): { lat: string, lng: string } {
  const lat: string = (Math.random() * (maxLat - minLat) + minLat).toFixed(6);
  const lng: string = (Math.random() * (maxLng - minLng) + minLng).toFixed(6);
  return { lat, lng };
}

export function getRandomCoordinate(
  minLat = -90,
  maxLat = 90,
  minLng = -180,
  maxLng = 180
) {
  // const lat = Math.random() * (maxLat - minLat) + minLat;
  // const lng = Math.random() * (maxLng - minLng) + minLng;

  const lat = (Math.random() * maxLng - maxLat).toFixed(6);
  const lng = (Math.random() * (maxLng * 2) - maxLng).toFixed(6);
  return { lat, lng };
}

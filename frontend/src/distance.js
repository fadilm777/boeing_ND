export function geoVectorNM(heading, lat1, lon1, lat2, lon2) {
  const toRad = deg => (deg * Math.PI) / 180;

  // Convert degrees to radians
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const deltaPhi = phi2 - phi1;
  const deltaLambda = toRad(lon2 - lon1);

  const R = 3440.065; // Earth radius in nautical miles

  // Haversine formula for distance
  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Bearing calculation
  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  let bearing = Math.atan2(y, x);

  // Vector components
  const vectorX = distance * Math.sin(bearing); // east component
  const vectorY = distance * Math.cos(bearing); // north component

  const rotationDeg = heading;
  const rotationRad = toRad(rotationDeg);

  const cosA = Math.cos(rotationRad);
  const sinA = Math.sin(rotationRad);

  const xRot = vectorX * cosA - vectorY * sinA;
  const yRot = vectorX * sinA + vectorY * cosA;

  return { distance: distance, x: xRot, y: yRot }
}


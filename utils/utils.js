const calculateFare = (
  baseFare,
  timeRate,
  time,
  distance,
  distanceRate,
  surge
) => {
  const distanceInKm = distance * 0.001;
  const timeInMin = time * 0.0166667;
  const pricePerMin = timeRate * timeInMin;
  const pricePerKm = distanceInKm * distanceRate;
  const totalFare = (baseFare / pricePerKm / pricePerMin) * surge;
  return Math.round(totalFare);
};

export default calculateFare;

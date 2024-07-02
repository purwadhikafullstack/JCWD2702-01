interface ILocation {
  lng: number;
  lat: number;
}

function rad(degrees: number | string) {
  const pi = Math.PI;
  return Number(degrees) * (pi / 180);
}
function getDistance(loc1: ILocation, loc2: ILocation) {
  const { lng: lng1, lat: lat1 } = loc1;
  const { lng: lng2, lat: lat2 } = loc2;
  const EarthRadius = 6371000; //radius of earth in meters
  const pi1 = rad(lat1);
  const pi2 = rad(lat2);
  const delta_pi = rad(lat2 - lat1);
  const delta_lambda = rad(lng2 - lng1);
  const a =
    Math.sin(delta_pi / 2.0) ** 2 +
    Math.cos(pi1) * Math.cos(pi2) * Math.sin(delta_lambda / 2.0) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const meters = (EarthRadius * c) / 1000.0; //output distance in meteres

  return meters;
}

export function nearToFar(point: ILocation, locations: any[]) {
  return locations.sort(
    (a: any, b: any) =>
      getDistance(point, a.location_coordinate) -
      getDistance(point, b.location_coordinate),
  );
}

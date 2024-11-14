export default async function geoLocation(setLat, setLong, setError) {
  const success = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  };

  const error = () => {
    setError(["Permission denied"]);
  };

  if (!navigator.geolocation) {
    setError(["Unsupported by browser"]);
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  return true;
}

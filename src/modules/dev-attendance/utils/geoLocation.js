export default function geoLocation() {
  const obj = { data: [], error: [] };
  const success = (position) => {
    obj.data[0] = position.coords.latitude;
    obj.data[1] = position.coords.longitude;
    console.log(obj);
  };

  const error = () => {
    obj.error[1] = "Unknown error";
  };

  if (!navigator.geolocation) {
    obj.error[0] = "Unsupported error";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  return obj;
}

import { AdvancedMarker, APIProvider, Map, useMapsLibrary, useMap, useApiIsLoaded } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react";

const Directions = ({ startStop, endStop }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map || !startStop || !endStop || (startStop.name !== "" && startStop.name === endStop.name)) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
      map,
      polylineOptions: {
        strokeColor: 'green',
        strokeOpacity: 1.0,
        strokeWeight: 6.5
      },
    }));
  }, [routesLibrary, map, startStop, endStop]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !startStop.id || !endStop.id || (startStop.name !== "" && startStop.name === endStop.name)) return;

    directionsService
      .route({
        origin: { lat: parseFloat(startStop.latitude), lng: parseFloat(startStop.longitude) },
        destination: { lat: parseFloat(endStop.latitude), lng: parseFloat(endStop.longitude) },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, startStop, endStop]);

  return null;
}

const GoogleMap = ({ startStop, endStop }) => {
  const position = { lat: 13.6504976, lng: 100.4951147 };
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map defaultCenter={position} defaultZoom={14} mapId={import.meta.env.VITE_GOOGLE_MAP_MAP_ID} gestureHandling={'greedy'} fullscreenControl={false} fullscreenControlOptions={false}>
        <Directions startStop={startStop} endStop={endStop} />
      </Map>
    </APIProvider>
  )
}

export default GoogleMap
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLngTuple } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MapProps {
  className?: string;
  center?: LatLngTuple;
  zoom?: number;
}

const MyMap = ({ 
  className = "", 
  center = [-1.955792181823006, 30.104155282768925],
  zoom = 13 
}: MapProps) => {
  const defaultIcon = icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className={`h-80 w-full rounded-lg overflow-hidden shadow-sm ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={defaultIcon}>
          <Popup className="rounded-md">
            Your location <br /> 
            Lat: {center[0].toFixed(6)}, <br />
            Lng: {center[1].toFixed(6)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MyMap;
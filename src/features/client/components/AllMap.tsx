import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLngTuple } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// You can import custom marker icons
// import customIcon1 from "../assets/marker-icon-1.png";
// import customIcon2 from "../assets/marker-icon-2.png";

interface MapProps {
  className?: string;
  center?: LatLngTuple;
  zoom?: number;
}

// Define a type for the marker data
interface MarkerData {
  position: LatLngTuple;
  title: string;
  description: string;
  iconType: "default" | "restaurant" | "hotel" | "attraction";
}

const MyMap = ({
  className = "",
  // center = [-1.955792181823006, 30.104155282768925],
  center = [-2.3355641814324883, 28.781648569314893],
  zoom = 13,
}: MapProps) => {
  // Default icon
  const defaultIcon = icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Restaurant icon (red)
  const restaurantIcon = icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "restaurant-marker", // You can use this with CSS to customize color
  });

  // Hotel icon (blue)
  const hotelIcon = icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "hotel-marker", // You can use this with CSS to customize color
  });

  // Attraction icon (green)
  const attractionIcon = icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "attraction-marker", // You can use this with CSS to customize color
  });

  // Helper function to get the right icon based on type
  const getIconForType = (type: string) => {
    switch (type) {
      case "restaurant":
        return restaurantIcon;
      case "hotel":
        return hotelIcon;
      case "attraction":
        return attractionIcon;
      default:
        return defaultIcon;
    }
  };

  // Sample marker data - you could fetch this from an API or pass as props
  const markers: MarkerData[] = [
    {
      position: center,
      title: "Main Location",
      description: "This is the main center location",
      iconType: "default",
    },
    {
      position: [-1.952, 30.105],
      title: "Kigali Restaurant",
      description: "Popular local restaurant",
      iconType: "restaurant",
    },
    {
      position: [-1.96, 30.11],
      title: "City Hotel",
      description: "Luxury hotel in downtown",
      iconType: "hotel",
    },
    {
      position: [-1.95, 30.099],
      title: "Tourist Attraction",
      description: "Famous tourist spot",
      iconType: "attraction",
    },
  ];

  return (
    <div
      className={`h-80 w-full rounded-lg overflow-hidden shadow-sm ${className}`}
    >
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

        {/* Render all markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={getIconForType(marker.iconType)}
          >
            <Popup className="rounded-md">
              <strong>{marker.title}</strong>
              <br />
              {marker.description}
              <br />
              Lat: {marker.position[0].toFixed(6)},<br />
              Lng: {marker.position[1].toFixed(6)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;

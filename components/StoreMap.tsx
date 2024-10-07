import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { Store } from "../common/types";

const STORE_ICON = icon({
  iconUrl: "/images/store.png",
  iconSize: [32, 32],
});

export default function StoreMap({ stores }: { stores: Store[] }) {
  const markers = stores.map((store) => (
    <Marker
      key={store.store_id}
      icon={STORE_ICON}
      position={[store.latitude, store.longitude]}
    >
      <Popup>
        {store.street}, {store.city}
      </Popup>
    </Marker>
  ));

  return (
    <MapContainer
      style={{ height: "500px" }}
      center={[-20.3484, 57.5522]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

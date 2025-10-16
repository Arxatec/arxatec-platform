import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  type FormEvent,
} from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, MapPinIcon } from "lucide-react";
import { useAutocompleteSuggestions, useDebounce } from "@/hooks";

interface LocationData {
  lat: number;
  lng: number;
  address?: string;
  placeId?: string;
}

interface MapPickerProps {
  apiKey: string;
  mapId?: string;
  onLocationSelect?: (location: LocationData) => void;
  onConfirm?: (location: LocationData) => void;
  initialLocation?: LocationData;
  className?: string;
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
  placeholder?: string;
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  onPlaceSelect,
  placeholder = "Buscar ubicación...",
}) => {
  const places = useMapsLibrary("places");
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const debouncedInputValue = useDebounce(inputValue, 300);
  const { suggestions, resetSession } =
    useAutocompleteSuggestions(debouncedInputValue);

  const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
  }, []);

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places) return;
      if (!suggestion.placePrediction) return;

      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: [
          "viewport",
          "location",
          "formattedAddress",
          "displayName",
          "id",
        ],
      });

      setInputValue(suggestion.placePrediction.text.text || "");
      setShowSuggestions(false);

      resetSession();

      onPlaceSelect(place);
    },
    [places, onPlaceSelect, resetSession]
  );

  const clearInput = useCallback(() => {
    setInputValue("");
    setShowSuggestions(false);
    resetSession();
  }, [resetSession]);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
      <Input
        value={inputValue}
        onInput={handleInput}
        placeholder={placeholder}
        className="pl-10"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-accent cursor-pointer text-sm border-b border-border last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-2">
                  <MapPinIcon className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate text-popover-foreground">
                    {suggestion.placePrediction?.text.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {inputValue && (
            <div className="px-3 py-2 border-t border-border bg-muted">
              <button
                onClick={clearInput}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MapWithMarker: React.FC<{
  location: LocationData;
  onLocationChange: (location: LocationData) => void;
  mapId?: string;
}> = ({ location, onLocationChange, mapId = "DEMO_MAP_ID" }) => {
  const map = useMap();

  const geocoder = useRef<google.maps.Geocoder | null>(null);

  useEffect(() => {
    if (map && !geocoder.current) {
      geocoder.current = new google.maps.Geocoder();
    }
  }, [map]);

  useEffect(() => {
    if (map && location) {
      map.panTo({ lat: location.lat, lng: location.lng });
    }
  }, [map, location.lat, location.lng]);

  const getAddressFromCoords = useCallback(async (lat: number, lng: number) => {
    if (!geocoder.current) return;

    try {
      const response = await geocoder.current.geocode({
        location: { lat, lng },
      });

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        return {
          address: result.formatted_address,
          placeId: result.place_id,
        };
      }
    } catch (error) {
      console.error("Error geocoding:", error);
    }
    return {};
  }, []);

  const handleMapClick = useCallback(
    async (event: { latLng?: google.maps.LatLng | null }) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const addressData = await getAddressFromCoords(lat, lng);

      const newLocation: LocationData = {
        lat,
        lng,
        ...addressData,
      };

      onLocationChange(newLocation);
    },
    [onLocationChange, getAddressFromCoords]
  );

  const handleMarkerDragEnd = useCallback(
    async (event: { latLng?: google.maps.LatLng | null }) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const addressData = await getAddressFromCoords(lat, lng);

      const newLocation: LocationData = {
        lat,
        lng,
        ...addressData,
      };

      onLocationChange(newLocation);
    },
    [onLocationChange, getAddressFromCoords]
  );

  return (
    <div
      data-testid="map-container"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <Map
        mapId={mapId}
        style={{ width: "100%", height: "300px" }}
        defaultCenter={location}
        defaultZoom={15}
        gestureHandling="cooperative"
        disableDefaultUI={true}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={handleMapClick as any}
      >
        <AdvancedMarker
          position={location}
          draggable={true}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onDragEnd={handleMarkerDragEnd as any}
        />
      </Map>
    </div>
  );
};

// Componente principal MapPicker
export const MapPicker: React.FC<MapPickerProps> = ({
  apiKey,
  mapId = "DEMO_MAP_ID",
  onLocationSelect,
  onConfirm,
  initialLocation = { lat: 19.4326, lng: -99.1332 },
  className = "",
}) => {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationData>(initialLocation);

  const handlePlaceSelect = useCallback(
    (place: google.maps.places.Place | null) => {
      if (!place?.location) return;

      const location: LocationData = {
        lat: place.location.lat(),
        lng: place.location.lng(),
        address: place.formattedAddress || undefined,
        placeId: place.id || undefined,
      };

      setSelectedLocation(location);
      onLocationSelect?.(location);
    },
    [onLocationSelect]
  );

  const handleLocationChange = useCallback(
    (location: LocationData) => {
      setSelectedLocation(location);
      onLocationSelect?.(location);
    },
    [onLocationSelect]
  );

  const handleConfirm = useCallback(() => {
    onConfirm?.(selectedLocation);
  }, [selectedLocation, onConfirm]);

  return (
    <APIProvider apiKey={apiKey} libraries={["places", "marker"]}>
      <div
        className={`space-y-4 ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <PlaceAutocomplete
          onPlaceSelect={handlePlaceSelect}
          placeholder="Buscar ubicación..."
        />

        <div className="border rounded overflow-hidden">
          <MapWithMarker
            location={selectedLocation}
            onLocationChange={handleLocationChange}
            mapId={mapId}
          />
        </div>

        {selectedLocation.address && (
          <div className="bg-muted p-3 rounded">
            <div className="flex items-start gap-2">
              <MapPinIcon className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm text-foreground">
                <p className="font-medium">Ubicación seleccionada:</p>
                <p>{selectedLocation.address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Lat: {selectedLocation.lat.toFixed(6)}, Lng:{" "}
                  {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button onClick={handleConfirm} className="w-full">
          Confirmar ubicación
        </Button>
      </div>
    </APIProvider>
  );
};

export type { LocationData };

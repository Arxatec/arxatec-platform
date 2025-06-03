import React, { useState, useRef, useEffect } from "react";
import {
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";
import { toSnakeCase } from "~/utilities/string_utilities";
import { MapIcon } from "@heroicons/react/24/outline";
import { ToastManager } from "~/components/molecules/toast_manager";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface GoogleMapEvent {
  latLng: google.maps.LatLng;
}

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  className?: string;
  required?: boolean;
  onChange?: (address: string, coordinates: Coordinates) => void;
  value?: string;
  googleMapsApiKey: string;
}

export const CustomInputMap: React.FC<Props> = ({
  label,
  className,
  required,
  onChange,
  value = "",
  googleMapsApiKey,
  ...rest
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<Coordinates | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const id = toSnakeCase(label ?? "");

  useEffect(() => {
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com"]`
      );
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [googleMapsApiKey]);

  // Inicializar el mapa cuando se abre el dropdown
  const initializeMap = () => {
    if (!mapLoaded || !mapRef.current || !window.google) return;

    // Coordenadas por defecto (ejemplo: Ciudad de México)
    const defaultLocation = selectedCoordinates || {
      lat: 19.4326,
      lng: -99.1332,
    };

    // Si ya existe una instancia del mapa, la actualizamos
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(defaultLocation);
      markerRef.current?.setPosition(defaultLocation);
      return;
    }

    // Crear el mapa
    const mapOptions: google.maps.MapOptions = {
      center: defaultLocation,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

    // Crear el marcador
    const markerOptions: google.maps.MarkerOptions = {
      position: defaultLocation,
      map: mapInstanceRef.current,
      draggable: true,
      title: "Arrastra para seleccionar ubicación",
    };

    markerRef.current = new google.maps.Marker(markerOptions);
    geocoderRef.current = new google.maps.Geocoder();

    // Evento cuando se arrastra el marcador
    markerRef.current.addListener("dragend", () => {
      const position = markerRef.current?.getPosition();
      if (!position) return;

      const coordinates: Coordinates = {
        lat: position.lat(),
        lng: position.lng(),
      };

      setSelectedCoordinates(coordinates);
      getAddressFromCoordinates(coordinates);
    });

    // Evento cuando se hace clic en el mapa
    mapInstanceRef.current.addListener("click", (event: GoogleMapEvent) => {
      const coordinates: Coordinates = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      markerRef.current?.setPosition(coordinates);
      setSelectedCoordinates(coordinates);
      getAddressFromCoordinates(coordinates);
    });
  };

  // Obtener dirección desde coordenadas usando Geocoding API
  const getAddressFromCoordinates = (coordinates: Coordinates) => {
    if (!geocoderRef.current) return;

    setIsLoading(true);

    const request: google.maps.GeocoderRequest = {
      location: coordinates,
    };

    geocoderRef.current.geocode(
      request,
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        setIsLoading(false);

        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          onChange?.(address, coordinates);
        } else {
          console.error("Error en geocodificación:", status);
        }
      }
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      const newState = !prev;
      if (newState && mapLoaded) {
        setTimeout(initializeMap, 100);
      }
      return newState;
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      ToastManager.error(
        "Geolocalización no disponible",
        "Tu navegador no soporta la geolocalización selecciona tu ubicación manualmente en el mapa"
      );
      return;
    }

    setIsLoading(true);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const coordinates: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setSelectedCoordinates(coordinates);

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setCenter(coordinates);
          markerRef.current.setPosition(coordinates);
          getAddressFromCoordinates(coordinates);
        }
      },
      (error: GeolocationPositionError) => {
        setIsLoading(false);
        const title = "No se pudo obtener tu ubicación";
        let message: string;

        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            message =
              "Necesitamos tu permiso para acceder a tu ubicación activa los permisos en el navegador y recarga la página";
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            message =
              "Activa los servicios de ubicación en tu dispositivo o selecciona manualmente en el mapa";
            break;
          case GeolocationPositionError.TIMEOUT:
            message =
              "La búsqueda de tu ubicación tardó demasiado verifica tu conexión o selecciona manualmente";
            break;
          default:
            message =
              "Ocurrió un error inesperado selecciona tu ubicación manualmente en el mapa";
        }

        ToastManager.error(title, message);
      },
      options
    );
  };

  const handleCloseDropdown = () => {
    if (markerRef.current) {
      google.maps.event.clearInstanceListeners(markerRef.current);
      markerRef.current.setMap(null);
      markerRef.current = null;
    }

    if (mapInstanceRef.current) {
      google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      mapInstanceRef.current = null;
    }

    geocoderRef.current = null;
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label}
          {!required && (
            <span className="text-gray-400 font-normal ml-1">(Opcional)</span>
          )}
        </label>
      )}

      <div className="relative">
        {/* Input principal */}
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center justify-center h-full">
            <MapPinIcon className="size-5 text-gray-400" />
          </div>

          <input
            id={id}
            type="text"
            value={value}
            readOnly
            onClick={toggleDropdown}
            className={twMerge(
              "block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 ring-1 ring-gray-300 shadow-sm cursor-pointer",
              "outline outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-600",
              "focus:ring-0 focus:ring-offset-0 pl-10 pr-10",
              className
            )}
            placeholder="Haz clic para seleccionar ubicación en el mapa"
            {...rest}
          />

          <div className="absolute right-3 flex items-center justify-center h-full">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            ) : (
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-center"
              >
                {isDropdownOpen ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Dropdown con el mapa */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="p-4">
              {/* Botón para obtener ubicación actual */}
              <button
                type="button"
                onClick={getCurrentLocation}
                className="mb-3 w-full px-3 py-2 text-sm flex items-center justify-center bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
              >
                <MapIcon className="size-5 text-blue-700 mr-2" />
                Usar mi ubicación actual
              </button>

              {/* Contenedor del mapa */}
              <div
                ref={mapRef}
                className="w-full h-64 rounded-md border border-gray-200"
                style={{ minHeight: "256px" }}
              />

              {mapLoaded && (
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Arrastra el marcador o haz clic en el mapa para seleccionar
                  una ubicación
                </p>
              )}

              {!mapLoaded && (
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Cargando mapa...</p>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseDropdown}
                  className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                {selectedCoordinates && (
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedCoordinates) {
                        getAddressFromCoordinates(selectedCoordinates);
                      }
                      handleCloseDropdown();
                    }}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Confirmar ubicación
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay para cerrar el dropdown al hacer clic fuera */}
      {isDropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={handleCloseDropdown} />
      )}
    </div>
  );
};

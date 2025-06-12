declare global {
  interface Window {
    google: typeof google;
  }
}

import type { LawyerDTO, LegalCategoryDTO } from "../dtos";
import type { LawyerModel, LegalCategoryModel } from "../models";

const GOOGLE_MAPS_API_KEY = "AIzaSyAAYe4kdm0lZzHHsEcQym3DmBlIJOnNE7I";

class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private loadPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  public async load(): Promise<void> {
    if (typeof window === "undefined") return;
    if (window.google?.maps) return;

    if (!this.loadPromise) {
      this.loadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Error al cargar Google Maps"));
        document.head.appendChild(script);
      });
    }

    return this.loadPromise;
  }
}

export const toLegalCategoryModel = (
  dto: LegalCategoryDTO
): LegalCategoryModel => ({
  id: dto.id,
  name: dto.name,
});

async function getAddressFromCoordinates(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    await GoogleMapsLoader.getInstance().load();

    if (!window.google?.maps) {
      throw new Error("No se pudo cargar Google Maps");
    }

    const geocoder = new google.maps.Geocoder();
    const response = await new Promise<google.maps.GeocoderResult[]>(
      (resolve, reject) => {
        geocoder.geocode(
          { location: { lat: latitude, lng: longitude } },
          (results, status) => {
            if (status === "OK" && results?.[0]) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          }
        );
      }
    );

    return response[0].formatted_address;
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return "Dirección desconocida";
  }
}

export const toLawyerModel = async (dto: LawyerDTO): Promise<LawyerModel> => {
  let fullAddress = dto.location.fullAddress;

  if (!fullAddress) {
    const { latitude, longitude } = dto.location;
    fullAddress = await getAddressFromCoordinates(latitude, longitude);
  }

  return {
    id: crypto.randomUUID(),
    name: dto.firstName + " " + dto.lastName,
    email: dto.email,
    avatar: dto.profilePicture,
    licenseNumber: dto.licenseNumber,
    direction: fullAddress,
  };
};

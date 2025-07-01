declare global {
  interface Window {
    google: typeof google;
  }
}

import type { ClientDTO, LegalCategoryDTO } from "../dtos";
import type { ClientModel, LegalCategoryModel } from "../models";

export const toLegalCategoryModel = (
  dto: LegalCategoryDTO
): LegalCategoryModel => ({
  id: dto.id,
  name: dto.name,
});

export const toClientModel = async (dto: ClientDTO): Promise<ClientModel> => {
  return {
    id: crypto.randomUUID(),
    clientId: dto.id,
    name: dto.full_name,
    email: dto.email,
    avatar: dto.profile_image ?? "",
    dni: dto.dni,
    phone: dto.phone,
  };
};

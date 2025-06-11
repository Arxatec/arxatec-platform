import type { LegalCategoryDTO } from "../dtos";
import type { LegalCategoryModel } from "../models";

export const toLegalCategoryModel = (
  dto: LegalCategoryDTO,
): LegalCategoryModel => ({
  id: dto.id,
  name: dto.name,
});

export interface NutritionDTO {
  id: number;
  name: string;
  nutrientQuantity: number;
  unitOfMeasurement: string;
  color: string;
}

export interface ListNutrientDTO {
  nutrients: NutritionDTO[];
}

// Intakes
export interface DetailedIntakeDTO {
  id: number;
  name: string;
  categoryIntake: string;
  categoryFood: string;
  unitOfMeasurement: string;
  quantity: number;
  date: string;
  nutrients: NutritionDTO[];
}

// Foods
export interface DetailedFoodDTO {
  id: number;
  name: string;
  categoryIntake: string;
  categoryFood: string;
  unitOfMeasurement: string;
  quantity: number;
  nutrients: NutritionDTO[];
}

export interface AddIntakeDTO {
  foodId: number;
  quantity: number;
  unitOfMeasurement: string;
  date: string;
}

export interface EditIntakeDTO {
  eatId: number;
  foodId?: number;
  quantity: number;
  unitOfMeasurement: string;
  date: string;
}

// Nutrients
export interface NutritionDTO {
  id: number;
  name: string;
  nutrientQuantity: number;
  unitOfMeasurement: string;
  color: string;
}

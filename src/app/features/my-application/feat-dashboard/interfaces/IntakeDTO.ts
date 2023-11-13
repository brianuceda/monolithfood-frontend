export interface FoodResponse {
  id: number;
  name: string;
  information: string;
  imgUrl: string;
  sourceOfOrigin: string;
  categoryFood: CategoryFood;
  nutrients: Nutrient[];
}

export interface CategoryFood {
  categoryName: string;
  information: string;
  benefits: string;
  disadvantages: string;
}

export interface Nutrient {
  name: string;
  nutrientQuantity: number;
  unitOfMeasurement: string;
  imgUrl: string;
}

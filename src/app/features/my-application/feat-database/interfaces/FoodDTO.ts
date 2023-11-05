export interface FoodDTO {
  foodId: number;
  foodName: string;
  information: string;
  imgUrl: string;
  isFavorite: boolean;
}

export interface ListFoodDTO {
  foods: FoodDTO[];
}

export interface FoodDTO {
  foodId: number;
  foodName: string;
  foodCategory: string;
  information: string;
  imgUrl: string;
  isFavorite: boolean;
}

export interface ListFoodDTO {
  foods: FoodDTO[];
}

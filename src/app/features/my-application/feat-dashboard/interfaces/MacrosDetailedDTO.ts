export interface AllMacrosAndIntakesDTO {
  message?: string;
  statusCode: number;
  type: string;
  macros: MacrosDetailedDTO;
  categories: CategoryDTO;
}

export interface MacrosDetailedDTO {
  consumedCalories: number;
  dailyCaloricIntake: number;
  consumedProteins: number;
  dailyProteinIntake: number;
  consumedCarbohydrates: number;
  dailyCarbohydrateIntake: number;
  consumedFats: number;
  dailyFatIntake: number;
}

export interface CategoryDTO {
  desayuno: CategoryDetails;
  almuerzo: CategoryDetails;
  cena: CategoryDetails;
}

export interface CategoryDetails {
  macrosConsumedPerCategory: MacrosConsumedPerCategory;
  myIntakes: CategoryIntake[];
}

export type MacrosConsumedPerCategory = {
  consumedCalories: number;
  consumedProteins: number;
  consumedCarbohydrates: number;
  consumedFats: number;
};

export type CategoryIntake =
  | {
      id: number;
      name: string;
      imgUrl: string;
      quantity: number;
      unitOfMeasurement: string;
    }
  | {
      message: string;
    };

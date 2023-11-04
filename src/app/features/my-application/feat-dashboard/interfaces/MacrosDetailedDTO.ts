// export interface MacrosDetailedDTO {
//   message?: string;
//   statusCode?: number;
//   type?: string;
//   consumedCalories: number;
//   dailyCaloricIntake: number;
//   consumedProteins: number;
//   dailyProteinIntake: number;
//   consumedCarbohydrates: number;
//   dailyCarbohydrateIntake: number;
//   consumedFats: number;
//   dailyFatIntake: number;
// }

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
      // categoryFood: string;
      imgUrl: string;
      quantity: number;
      unitOfMeasurement: string;
      // date: string;
    }
  | {
      message: string;
    };

export interface CategoryDetails {
  macrosConsumedPerCategory: MacrosConsumedPerCategory;
  myIntakes: CategoryIntake[];
}

export interface CategoryDTO {
  desayuno: CategoryDetails;
  almuerzo: CategoryDetails;
  cena: CategoryDetails;
}

export interface AllMacrosAndIntakesDTO {
  message?: string;
  statusCode: number;
  type: string;
  macros: MacrosDetailedDTO;
  categories: CategoryDTO;
}

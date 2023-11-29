export class FitnessDataDTO {
  gender: string = '';
  age: number = 0;
  height: number = 0;
  weight: number = 0;
  targetWeightKg: number = 0;
  targetDate: string = '';
  activityLevel: string = '';
  activityLevelQuotient: number = 0;
  imc: number = 0;
  clasification: string = '';
  dailyCaloricIntake: number = 0;
  dailyProteinIntake: number = 0;
  dailyCarbohydrateIntake: number = 0;
  dailyFatIntake: number = 0;
  avgProteinPerKg: number = 0;
  tmb: number = 0;
}

export class FitnessProgressDTO {
  percentence: number = 0;
  currentWeight: number = 0;
  startWeight: number = 0;
  targetWeight: number = 0;
}

export class MacrosPerDaysDTO {
  domingo: number = 0;
  lunes: number = 0;
  martes: number = 0;
  miercoles: number = 0;
  jueves: number = 0;
  viernes: number = 0;
  sabado: number = 0;
}

export class MacrosPerWeekDTO {
  calories: MacrosPerDaysDTO = new MacrosPerDaysDTO();
  proteins: MacrosPerDaysDTO = new MacrosPerDaysDTO();
  carbohydrates: MacrosPerDaysDTO = new MacrosPerDaysDTO();
  fats: MacrosPerDaysDTO = new MacrosPerDaysDTO();
}

export class avgMacrosPerWeekDTO {
  avgCalories: number = 0;
  avgProteins: number = 0;
  avgCarbohydrates: number = 0;
  avgFats: number = 0;
}

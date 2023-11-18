export interface FitnessDataDTO {
  gender: string;
  age: number;
  height: number;
  weight: number;
  targetWeightKg: number;
  targetDate: string;
  activityLevel: string;
  activityLevelQuotient: number;
  imc: number;
  clasification: string;
  dailyCaloricIntake: number;
  dailyProteinIntake: number;
  dailyCarbohydrateIntake: number;
  dailyFatIntake: number;
  avgProteinPerKg: number;
  tmb: number;
}

export interface FitnessProgressDTO {
  percentence: number;
  currentWeight: number;
  startWeight: number;
  targetWeight: number;
}

export interface ObjectiveDTO {
  name: string;
  imgUrl: string;
  information: string;
  proteinPerKg: number;
  selected: boolean;
}

export interface ListObjectivesDTO {
  objectives: ObjectiveDTO[];
}

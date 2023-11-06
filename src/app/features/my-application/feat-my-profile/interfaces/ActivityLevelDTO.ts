export interface ActivityLevelDTO {
  name: string;
  imgUrl: string;
  days: string;
  information: string;
  quotient: number;
  selected: boolean;
}

export interface ListActivityLevelsDTO {
  activityLevels: ActivityLevelDTO[];
}

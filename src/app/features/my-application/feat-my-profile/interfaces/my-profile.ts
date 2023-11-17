export interface MyProfile {
  statusCode: number;
  username: string;
  profileImg: string;
  email: string;
  names: string;
  gender: string;
  borndate: Date;
  location: string;
  weightKg: number;
  heightCm: number;
  imc: string;
  currencySymbol: string;
  currency: number;
}

enum Genre {
  M,
  F,
}

export interface PutMyProfile {
  names: string;
  gender: Genre;
  borndate: string;
}

export interface HeightAndWeight {
  weightKg: number;
  heightCm: number;
}

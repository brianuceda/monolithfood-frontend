interface Role {
  authority: string;
}

export interface TokenPayload {
  roles: Role[];
  profileStage: string;
  sub: string;
  iat: number;
  exp: number;
}

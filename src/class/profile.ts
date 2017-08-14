export class Profile {
    created_at: string;
    email: string;
    id: number;
    name: string;
    updated_at: string;
}

export class Authorization {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

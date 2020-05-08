export interface Token {
    aud: string;
    email: string;
    exp: number;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    iat: string;
    iss: string;
    nbf: number;
    nickname: string;
    sub: string;
}
export interface AuthResult {
    token: string;
    expirationDate: string;
    email: string;
    name:string;
    error?:any;
}
export interface IUser {
    email: string;
    name: string;
    _token: string;
    _tokenExpirationDate: string;
}

export class User {
    constructor(
        public email: string,
        public name: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token(): string {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            this._token = null;
            return this._token;
        }
        return this._token;
    }
}

export class User {
  constructor(
    public user: string,
    public password: string,
    // Future improvements
    private _token?: string,
    private expirationDate?: Date
  ) {}

  // Future improvements
  get token() {
    if (new Date() > this.expirationDate) {
      return null;
    }
    return this._token;
  }
}

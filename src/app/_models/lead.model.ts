export class Lead {
  constructor(
    public name: string,
    public phone: string,
    public email: string,
    public table: Array<string>,
    public status: number
  ) {}
}

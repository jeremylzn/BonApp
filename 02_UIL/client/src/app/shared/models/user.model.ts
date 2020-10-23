export class User {
  constructor(
    public email: string,
    public id: string,
    public token: string,
    public isAdmin?: boolean,
    public name?: string,
    public phone?: string,
    public address?: string,
    public notifications?: {title: string, date: string}
  ) {}
}

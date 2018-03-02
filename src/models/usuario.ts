export class Usuario {
  private grant_type: string;
  constructor(
    public Id: string,
    public UserName: string,
    public FullName: string,
    public password: string,
    public Email: string,
    public Url: string,
  ) {
    this.grant_type = 'password';

  }
}


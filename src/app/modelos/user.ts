export class User {
  public _id: String;
  public name: String;
  public email: String;
  public nick: String;
  public password: String;
  constructor(
      _id?: String,
      name?: String,
      email?: String,
      nick?: String,
      password?: String
  ) {
      _id ? this._id = _id : this._id = null;
      name ? this.name = name : name = null;
      email ? this.email = email : this.email = null;
      nick ? this.nick = nick : this.nick = null;
      password ? this.password = password : this.password = null;
  }
}

export class Validation {
  static email = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  static time = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  static date = new RegExp(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/);
  static password = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
}
export type Role = "admin" | "user";

export interface UserDoc {
  _id?: any;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
}

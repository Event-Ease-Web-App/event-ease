export type RegisterUserInFireAuth = {
  email: string;
  password: string;
};
export type RegisterUserFieldsInFirestore = {
  role: UserRoles;
};
export enum UserRoles {
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  PARTICIPANT = "participant",
  ORGANIZER = "organizer",
}
export type UserSignUpRoles = UserRoles.PARTICIPANT | UserRoles.ORGANIZER;

export type SignUpResponse = {
  message: string;
  success: boolean;
};

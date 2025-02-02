export type AuthWithEmailAndPassword = {
  email: string;
  password: string;
};
export type AuthWithEmailAndRole = {
  email: string;
  role: UserRoles;
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

export type UserSignInOrSignUpRoles =
  | UserRoles.PARTICIPANT
  | UserRoles.ORGANIZER;

export type SignInOrSignUpResponse = {
  message: string;
  success: boolean;
};

export type FirestoreUser = {
  email: string;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
};

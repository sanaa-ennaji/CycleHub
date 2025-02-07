import { User } from "../../models/user.model";


export interface AuthState {
  users: User[];
  currentUser: User | null;
};
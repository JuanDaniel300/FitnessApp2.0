import { User } from "./type";

interface AuthStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

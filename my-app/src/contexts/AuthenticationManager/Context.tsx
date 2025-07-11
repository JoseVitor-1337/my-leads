import { Dispatch, SetStateAction, createContext } from "react";

import { User } from "@/types";

type AuthenticationContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const defaultValue = {
  user: null,
  setUser: () => {},
};

const AuthenticationContext =
  createContext<AuthenticationContextType>(defaultValue);

export default AuthenticationContext;

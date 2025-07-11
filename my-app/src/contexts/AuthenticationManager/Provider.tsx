"use client";

import { useState, useContext, FC, ReactNode, useEffect } from "react";

import { User } from "@/types";
// import callAPI from "@/services/api";
import { getFromStorage } from "@/utils/storage";
import { AUTHENTICATION_TOKEN_KEY } from "@/constants/storage";
import PageSpinner from "@/components/PageSpinner";
import AuthenticationContext from "./Context";

type Props = {
  children: ReactNode;
};

const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  async function loadUser() {
    setLoadingUser(true);
    const token = getFromStorage(AUTHENTICATION_TOKEN_KEY);
    if (token) {
      // const response = await callAPI({
      //   method: "POST",
      //   url: "",
      //   data: {
      //     token,
      //   },
      // });
      // console.log("response",response)
    }

    setLoadingUser(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (loadingUser) {
    return <PageSpinner />;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);

export default AuthenticationProvider;

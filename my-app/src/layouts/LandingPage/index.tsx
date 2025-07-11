import { JSX, useState } from "react";

import { paragraphStyle } from "@/styledTags/Paragraph";
import { headingStyle } from "@/styledTags/Heading";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { AUTHENTICATION_TOKEN_KEY } from "@/constants/storage";
import { deleteFromStorage } from "@/utils/storage";
import { useAuthentication } from "@/contexts/AuthenticationManager/Provider";
import { buttonStyle } from "@/styledTags/Button";

type Props = {
  children: JSX.Element;
  title: string;
  description?: string;
};

export default function LandingPage({ children, title, description }: Props) {
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);

  const { user } = useAuthentication();

  async function handleLogout() {
    setLoadingLogout(true);
    // const response = await callAPI({
    //   method: "POST",
    //   url: "/users/auth",
    //   data: credentials,
    // });
    // console.log("response", response);
    window.location.href = "/login";
    deleteFromStorage(AUTHENTICATION_TOKEN_KEY);
    setLoadingLogout(false);
  }

  return (
    <main>
      {user !== null && (
        <div className="absolute flex justify-between items-center w-screen p-4">
          <h1 className={headingStyle()}>Olá, {user.name}</h1>
          <ButtonWithLoading
            isLoading={loadingLogout}
            className={buttonStyle({ intent: "ghost" })}
            onClick={handleLogout}
          >
            Sair do sistema
          </ButtonWithLoading>
        </div>
      )}

      <div className="bg-gray-100 flex h-screen w-screen justify-center items-center">
        <div className="rounded-sm bg-white border-2 border-gray-300 p-4 justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className={headingStyle()}>{title}</h1>
            {description && (
              <p className={paragraphStyle({ intent: "secondary" })}>
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FormItemInput from "@/components/FormItemInput";
import callAPI from "@/services/api";
import { buttonStyle } from "@/styledTags/Button";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import LandingPage from "@/layouts/LandingPage";
import { useAuthentication } from "@/contexts/AuthenticationManager/Provider";
import { createOnStorage } from "@/utils/storage";
import { AUTHENTICATION_TOKEN_KEY } from "@/constants/storage";
import ErrorMessage from "@/components/ErrorMessage";
import useError from "@/hooks/useError";

type Credentials = {
  email: string;
  password: string;
};

export default function Login() {
  const [loadingCredentials, setLoadingCredentials] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const { error, setError } = useError();

  const { push } = useRouter();

  const { setUser } = useAuthentication();

  function handleOnChangeInput(inputEvent: ChangeEvent<HTMLInputElement>) {
    const { name, value } = inputEvent.target;
    setCredentials({ ...credentials, [name]: value });
  }

  function handleGoToNewAccount() {
    push("/account");
  }

  function handleGoToLeads() {
    push("/leads");
  }

  async function handleFormSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    setLoadingCredentials(true);
    const response = await callAPI({
      method: "POST",
      url: "/users/auth",
      data: credentials,
    });
    console.log("response", response);
    if (response.success) {
      const token = response?.data?.access_token as string;
      createOnStorage(AUTHENTICATION_TOKEN_KEY, token);
      handleGoToLeads();
      setError({
        hasError: false,
      });
      setUser({
        name: response.data?.name as string,
        email: response.data?.email as string,
      });
    } else {
      setError({
        hasError: true,
        message: response.message as string,
      });
    }

    setLoadingCredentials(false);
  }

  return (
    <LandingPage
      title="Minhas informações para contato"
      description="coloque seu email e senha para acessar"
    >
      <form
        onSubmit={(event) => handleFormSubmit(event)}
        className="flex flex-col w-96 gap-4 p-4"
      >
        <FormItemInput
          label="Email"
          inputEvent={{
            autoFocus: true,
            required: true,
            name: "email",
            type: "email",
            value: credentials.email,
            onChange: handleOnChangeInput,
          }}
        />

        <FormItemInput
          label="Senha"
          inputEvent={{
            required: true,
            name: "password",
            type: "password",
            value: credentials.password,
            onChange: handleOnChangeInput,
          }}
        />

        <ErrorMessage {...error} />

        <ButtonWithLoading
          type="submit"
          isLoading={loadingCredentials}
          className={buttonStyle()}
        >
          Logar
        </ButtonWithLoading>

        <button
          type="button"
          className={buttonStyle({ intent: "secondary" })}
          onClick={handleGoToNewAccount}
        >
          Criar conta
        </button>
      </form>
    </LandingPage>
  );
}

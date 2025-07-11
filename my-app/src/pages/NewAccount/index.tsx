import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FormItemInput from "@/components/FormItemInput";
import callAPI from "@/services/api";
import { buttonStyle } from "@/styledTags/Button";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import LandingPage from "@/layouts/LandingPage";
import ErrorMessage from "@/components/ErrorMessage";
import useError from "@/hooks/useError";

type Account = {
  name: string;
  email: string;
  password: string;
};

export default function NewAccount() {
  const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
  const [account, setAccount] = useState<Account>({
    name: "",
    email: "",
    password: "",
  });

  const { error, setError } = useError();

  const { push } = useRouter();

  function handleOnChangeInput(inputEvent: ChangeEvent<HTMLInputElement>) {
    const { name, value } = inputEvent.target;
    setAccount({ ...account, [name]: value });
  }

  function handleGoToLogin() {
    push("/login");
  }

  async function handleFormSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    setLoadingAccount(true);
    const response = await callAPI({
      method: "POST",
      url: "/users",
      data: account,
    });
    if (response.success) {
      setError({ hasError: false });
      handleGoToLogin();
    } else {
      setError({ hasError: true, message: response.message });
    }

    setLoadingAccount(false);
  }

  return (
    <LandingPage
      title="Criar nova conta"
      description="Preencha todos os campos abaixo"
    >
      <form
        onSubmit={(event) => handleFormSubmit(event)}
        className="flex flex-col w-96 gap-4 p-4"
      >
        <FormItemInput
          label="Nome"
          inputEvent={{
            required: true,
            name: "name",
            type: "text",
            value: account.name,
            onChange: handleOnChangeInput,
          }}
        />

        <FormItemInput
          label="Email"
          inputEvent={{
            required: true,
            name: "email",
            type: "email",
            value: account.email,
            onChange: handleOnChangeInput,
          }}
        />

        <FormItemInput
          label="Senha"
          inputEvent={{
            required: true,
            name: "password",
            type: "password",
            value: account.password,
            onChange: handleOnChangeInput,
          }}
        />

        <ErrorMessage {...error} />

        <ButtonWithLoading
          type="submit"
          isLoading={loadingAccount}
          className={buttonStyle()}
        >
          Criar nova conta
        </ButtonWithLoading>

        <button
          type="button"
          className={buttonStyle({ intent: "secondary" })}
          onClick={handleGoToLogin}
        >
          Voltar ao login
        </button>
      </form>
    </LandingPage>
  );
}

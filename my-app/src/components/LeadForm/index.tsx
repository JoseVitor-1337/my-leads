import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FormItemInput from "@/components/FormItemInput";
import { buttonStyle } from "@/styledTags/Button";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { Leads } from "@/types";
import FormItemTextarea from "@/components/FormItemTextarea";

const initialLead = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type Props = {
  defaultLead?: Leads;
  submiteButtonText: string;
  onSubmit: (lead: Leads) => Promise<void>;
};

export default function LeadForm({
  defaultLead,
  submiteButtonText,
  onSubmit,
}: Props) {
  const [loadingSubmiteLead, setLoadingSubmiteLead] = useState<boolean>(false);
  const [lead, setLead] = useState<Leads>(defaultLead || initialLead);

  const { push } = useRouter();

  function handleOnChangeInput(inputEvent: ChangeEvent<HTMLInputElement>) {
    const { name, value } = inputEvent.target;
    setLead({ ...lead, [name]: value });
  }

  function handleOnChangeTextarea(
    textareaEvent: ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = textareaEvent.target;
    setLead({ ...lead, [name]: value });
  }

  function handleGoToLeads() {
    push("/leads");
  }

  async function handleFormSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    setLoadingSubmiteLead(true);
    await onSubmit(lead);
    setLoadingSubmiteLead(false);
  }

  return (
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
          value: lead.name,
          onChange: handleOnChangeInput,
        }}
      />

      <FormItemInput
        label="Email"
        inputEvent={{
          required: true,
          name: "email",
          type: "email",
          value: lead.email,
          onChange: handleOnChangeInput,
        }}
      />

      <FormItemInput
        label="Telefone"
        inputEvent={{
          required: true,
          name: "phone",
          type: "number",
          inputMode: "numeric",
          value: lead.phone,
          onChange: handleOnChangeInput,
        }}
      />

      <FormItemTextarea
        label="Message"
        textareaEvent={{
          required: true,
          name: "message",
          value: lead.message,
          onChange: handleOnChangeTextarea,
        }}
      />

      <ButtonWithLoading
        type="submit"
        isLoading={loadingSubmiteLead}
        className={buttonStyle()}
      >
        {submiteButtonText}
      </ButtonWithLoading>

      <button
        type="button"
        className={buttonStyle({ intent: "secondary" })}
        onClick={handleGoToLeads}
      >
        Voltar a listagem
      </button>
    </form>
  );
}

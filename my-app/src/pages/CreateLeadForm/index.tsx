import { useCallback } from "react";

import { useRouter } from "next/navigation";
import LandingPage from "@/layouts/LandingPage";
import { Leads } from "@/types";
import callAPI, { ResponseReturn } from "@/services/api";
import useError from "@/hooks/useError";
import LeadForm from "@/components/LeadForm";

export default function CreateLeadForm() {
  const { setError } = useError();

  const { push } = useRouter();

  const handleResponseReturn = useCallback(
    (response: ResponseReturn) => {
      if (response.success) {
        setError({ hasError: false });
        push("/leads");
      } else {
        setError({ hasError: true, message: response.message });
      }
    },
    [setError, push]
  );

  async function handleFormSubmit(lead: Leads) {
    const response = await callAPI({
      method: "POST",
      url: "/leads",
      data: lead,
    });
    handleResponseReturn(response);
  }

  return (
    <LandingPage
      title="Criar informação de contato"
      description="Preencha todos os campos abaixo"
    >
      <LeadForm
        submiteButtonText="Criar informação de contato"
        onSubmit={(lead: Leads) => handleFormSubmit(lead)}
      />
    </LandingPage>
  );
}

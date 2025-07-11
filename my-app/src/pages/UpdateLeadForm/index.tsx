import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LandingPage from "@/layouts/LandingPage";
import { Leads } from "@/types";
import callAPI from "@/services/api";
import useError from "@/hooks/useError";
import LeadForm from "@/components/LeadForm";
import PageSpinner from "@/components/PageSpinner";

export default function UpdateLeadForm() {
  const [loadingLead, setLoadingLead] = useState<boolean>(true);
  const [currentLead, setCurrentLead] = useState<Leads>({});

  const { setError } = useError();

  const { push } = useRouter();

  const searchParams = useSearchParams();
  const leadId = searchParams?.get("leadId");

  const handleGetLeadById = useCallback(async () => {
    setLoadingLead(true);
    const response = await callAPI({ method: "GET", url: `lead/${leadId}` });
    if (response.success) {
      setError({ hasError: false });
      setCurrentLead(response.data || {});
    } else {
      setError({ hasError: true, message: response.message });
    }
    setLoadingLead(false);
  }, [leadId, setError]);

  async function handleFormSubmit(lead: Leads) {
    const response = await callAPI({
      method: "PATCH",
      url: `/leads/${leadId}`,
      data: lead,
    });
    if (response.success) {
      setError({ hasError: false });
      push("/leads");
    } else {
      setError({ hasError: true, message: response.message });
    }
  }

  useEffect(() => {
    if (leadId) handleGetLeadById();
  }, [leadId, handleGetLeadById]);

  if (loadingLead) {
    return <PageSpinner />;
  }

  return (
    <LandingPage
      title="Atualizar informação de contato"
      description="Preencha todos os campos abaixo"
    >
      <LeadForm
        defaultLead={currentLead}
        submiteButtonText="Atualizar informação de contato"
        onSubmit={(lead: Leads) => handleFormSubmit(lead)}
      />
    </LandingPage>
  );
}

import { Dispatch, SetStateAction, useState } from "react";

import callAPI from "@/services/api";
import { Leads } from "@/types";
import { buttonStyle } from "@/styledTags/Button";
import ButtonWithLoading from "@/components/ButtonWithLoading";

type Props = {
  lead: Leads;
  setLeads: Dispatch<SetStateAction<Leads[]>>;
};

export default function DeleteLeadButton({ lead, setLeads }: Props) {
  const [loadingDeleteLead, setLoadingDeleteLead] = useState<boolean>(false);

  const deleteLead = async () => {
    setLoadingDeleteLead(true);
    const response = await callAPI({
      method: "DELETE",
      url: `leads/${lead.id}`,
    });
    console.log("response", response);
    setLeads((currentLeads) => {
      const updatedLeads = currentLeads.filter((leadItem) => {
        return leadItem.id !== lead.id;
      });
      return updatedLeads;
    });
    setLoadingDeleteLead(false);
  };

  return (
    <ButtonWithLoading
      isLoading={loadingDeleteLead}
      className={buttonStyle({ intent: "danger", size: "sm" })}
      onClick={() => deleteLead()}
    >
      Deletar
    </ButtonWithLoading>
  );
}

// import callAPI from "@/services/api";
import { useRouter } from "next/navigation";
import { Leads } from "@/types";
import { buttonStyle } from "@/styledTags/Button";

type Props = {
  lead: Leads;
};

export default function EditLeadButton({ lead }: Props) {
  const { push } = useRouter();

  const goToUpdatePage = async () => {
    const params = new URLSearchParams({
      leadId: lead.id as string,
    });

    push(`/leads/update?${params.toString()}`);
  };

  return (
    <button
      className={buttonStyle({ intent: "secondary", size: "sm" })}
      onClick={() => goToUpdatePage()}
    >
      Editar
    </button>
  );
}

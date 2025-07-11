import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LandingPage from "@/layouts/LandingPage";
import callAPI from "@/services/api";
import { Leads } from "@/types";
import Spinner from "@/components/Spinner";
import { paragraphStyle } from "@/styledTags/Paragraph";
import { buttonStyle } from "@/styledTags/Button";
import { deleteFromStorage } from "@/utils/storage";
import { AUTHENTICATION_TOKEN_KEY } from "@/constants/storage";
import EditLeadButton from "./components/EditLeadButton";
import DeleteLeadButton from "./components/DeleteLeadButton";

export default function LeadsPage() {
  const [loadingLeads, setLoadingLeads] = useState<boolean>(true);
  const [leads, setLeads] = useState<Leads[]>([]);

  const { push } = useRouter();

  const goToNewLead = () => {
    push("/leads/create");
  };

  const goBackToLogin = useCallback(() => {
    deleteFromStorage(AUTHENTICATION_TOKEN_KEY);
    push("/");
  }, [push]);

  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);
    const response = await callAPI({ method: "GET", url: "/leads" });
    console.log("response", response);
    if (response.success) {
      setLeads((response?.data as Leads[]) || []);
    } else {
      goBackToLogin();
    }

    setLoadingLeads(false);
  }, [goBackToLogin]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return (
    <LandingPage title="Minhas informações para contato">
      <div className="p-4 flex flex-col gap-8 justify-center items-center">
        <button className={`${buttonStyle()} w-80`} onClick={goToNewLead}>
          Criar nova informação de contato
        </button>

        {loadingLeads ? (
          <div className="w-100">
            <Spinner />
          </div>
        ) : (
          <Fragment>
            {leads.length > 0 ? (
              <div className="overflow-x-auto w-200">
                <table className="border-2 border-gray-300 min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Telefone
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-100">
                        <td className="px-3 whitespace-nowrap">
                          <div className="text-center text-sm text-gray-900">
                            {lead.name}
                          </div>
                        </td>
                        <td className="px-3 whitespace-nowrap">
                          <div className="text-center text-sm text-gray-900">
                            {lead.email}
                          </div>
                        </td>
                        <td className="px-3 whitespace-nowrap">
                          <div className="text-center text-sm text-gray-900">
                            {lead.phone}
                          </div>
                        </td>
                        <td className="px-3 whitespace-nowrap">
                          <div className="flex justify-center items-center gap-2">
                            <DeleteLeadButton lead={lead} setLeads={setLeads} />
                            <EditLeadButton lead={lead} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={paragraphStyle({ intent: "secondary" })}>
                Não existe nenhuma pista cadastrada
              </p>
            )}
          </Fragment>
        )}
      </div>
    </LandingPage>
  );
}

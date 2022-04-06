import { api, makeRequest } from "../../../api";
import { InferQueryOptions } from "../../../types/react-query";
import { useQuery } from "react-query";
import { invoiceKeys } from "./keys";

type Data = {
  status?: Parameters<typeof api.invoiceList>[0];
  offset?: number;
  limit?: number;
};

async function invoiceListApi({ limit, status, offset }: Data) {
  return makeRequest(api.invoiceList(status, limit, offset));
}

function useInvoiceList(
  data?: Data,
  options?: InferQueryOptions<typeof invoiceListApi>
) {
  // TODO: Integrate with pagination
  return useQuery(invoiceKeys.all, () => invoiceListApi({}), options);
}

export { useInvoiceList, invoiceListApi };

import { MakeGenerics, Route } from "@tanstack/react-location";
import { HomePage } from "../components/home-page";
import { AuthPages } from "../features/auth";
import { queryClient } from "../lib/react-query";
import { invoiceKeys } from "../features/invoice/service/keys";
import { invoiceListApi } from "../features/invoice/service/invoice-list";
import { ListInvoiceResponseDto } from "@invoicer/api";

type LocationGenerics = MakeGenerics<{
  LoaderData: {
    invoicesResponse: ListInvoiceResponseDto;
  };
}>;

function buildRouting<T extends Record<string, Route<LocationGenerics>>>(
  routing: T
) {
  return routing;
}

const Routing = buildRouting({
  Home: {
    path: "/",
    element: <HomePage />,
    loader: async () => {
      const response = await queryClient.fetchQuery(invoiceKeys.all, () =>
        invoiceListApi({})
      );
      return {
        invoicesResponse: response,
      };
    },
  },
  Register: {
    path: "/register",
    element: <AuthPages.RegisterPage />,
  },
  Login: {
    path: "login",
    element: <AuthPages.LoginPage />,
  },
});

export { Routing };
export type { LocationGenerics };

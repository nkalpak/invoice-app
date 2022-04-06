import { ReactLocation, Route, Router } from "@tanstack/react-location";
import { EmptyPropsWithChildren } from "../types/react";
import { AuthService } from "../features/auth";
import { RelativeLoadingIndicator } from "../components/loading-indicator";
import { LocationGenerics, Routing } from "../utils/routing";

const location = new ReactLocation<LocationGenerics>();

const authRoutes: Route[] = [Routing.Home];

const unAuthRoutes: Route[] = [
  Routing.Login,
  Routing.Register,
  {
    element: Routing.Login.element,
  },
];

function ReactLocationProvider({ children }: EmptyPropsWithChildren) {
  const currentUser = AuthService.useCurrentUser();

  if (currentUser.isLoading) {
    return <RelativeLoadingIndicator />;
  }

  return (
    <Router
      location={location}
      // eslint-disable-next-line eqeqeq
      routes={currentUser.data == undefined ? unAuthRoutes : authRoutes}
    >
      {children}
    </Router>
  );
}

export { ReactLocationProvider };

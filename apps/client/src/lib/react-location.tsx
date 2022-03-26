import { ReactLocation, Route, Router } from "@tanstack/react-location";
import { EmptyPropsWithChildren } from "../types/react";
import { AuthPages } from "../features/auth";

const location = new ReactLocation();

function ReactLocationProvider({ children }: EmptyPropsWithChildren) {
  const routesUnauthenticated: Route[] = [
    {
      path: "/login",
      element: <AuthPages.LoginPage />,
    },
    {
      path: "/register",
      element: <AuthPages.RegisterPage />,
    },
    {
      element: <AuthPages.LoginPage />,
    },
  ];

  return (
    <Router location={location} routes={routesUnauthenticated}>
      {children}
    </Router>
  );
}

export { ReactLocationProvider };

import { EmptyPropsWithChildren } from "../types/react";
import { RollbarProvider } from "../lib/rollbar";
import React from "react";
import { ModalContainer } from "../features/modal/modal-container";
import { ReactLocationProvider } from "../lib/react-location";

function AppProvider({ children }: EmptyPropsWithChildren) {
  return (
    <RollbarProvider>
      <ReactLocationProvider>
        <React.Fragment>{children}</React.Fragment>
        <ModalContainer />
      </ReactLocationProvider>
    </RollbarProvider>
  );
}

export { AppProvider };

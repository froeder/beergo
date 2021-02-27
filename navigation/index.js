import React from "react";
import { AuthUserProvider } from "./AuthUserProvider";
import Routes from "./Routes";
import { ModalPortal } from "react-native-modals";

export const navigationRef = React.createRef();

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}

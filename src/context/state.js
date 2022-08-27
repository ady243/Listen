import { createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";

const defaultState = {};

const AppContext = createContext(defaultState);

export function AppWrapper({ children }) {
  const { status, data: session } = useSession();

  return (
    <AppContext.Provider value={{ session, status }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

import { createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";

const defaultState = {};

const AppContext = createContext(defaultState);

export function AppWrapper({ children }) {
  const { status, data: session } = useSession();
  const [play, setPlay] = useState(false);
  const [songUri, setSongUri] = useState(false);

  return (
    <AppContext.Provider
      value={{ session, status, play, setPlay, songUri, setSongUri }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

import "../styles/globals.css";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { AppWrapper } from "../src/context/state";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppWrapper>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </AppWrapper>
    </SessionProvider>
  );
}
export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Component {...pageProps} />
    </MeshProvider>
  );
}

export default App;


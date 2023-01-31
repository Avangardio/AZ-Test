import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from "@/components/Navigation/Navbar";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <NavBar/>
        <Component {...pageProps} />
      </>
  )
}

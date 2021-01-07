import NextHead from 'next/head'
import React from 'react'
import '../styles/globals.css'
import GoogleFonts from "next-google-fonts";

function MyApp({ Component, pageProps }) {
  return (
  <Component {...pageProps} > 
  
     <NextHead>
     <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />


        <title>Intermedicina</title>

        <link rel="icon" href="/favicon.ico" /> 
      </NextHead>
  </Component>
  )

}

export default MyApp

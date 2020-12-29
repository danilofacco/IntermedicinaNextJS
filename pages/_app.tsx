import Head from 'next/head'
import React from 'react'
import '../styles/globals.css'
import GoogleFonts from "next-google-fonts";

function MyApp({ Component, pageProps }) {
  return (
  <Component {...pageProps} >
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Raleway:wght@400;700&display=swap"/>
     <Head>
        <title>Intermedicina</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      </Head>
  </Component>
  )

}

export default MyApp

import NextHead from 'next/head'
import React from 'react'
import '../styles/globals.css'  

function MyApp({ Component, pageProps }) {
  return (
  <Component className="antialiased" {...pageProps} > 
  
     <NextHead>
     <meta charSet="UTF-8" />
       
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

      <meta httpEquiv="x-ua-compatible" content="ie=edge" /> 
      <link rel="stylesheet" href="/assets/tailwind.css"/>  
        <title>Intermedicina</title> 
      <link rel="icon" href="/favicon.ico" /> 
      </NextHead>
  </Component>
  )

}

export default MyApp

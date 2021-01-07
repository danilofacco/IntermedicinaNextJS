import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'
import {Main, Divider, ButtonGreen, CenteredText} from '../styles/Home'
import { FiArrowRight } from 'react-icons/fi';
import AOutlineButton from '../components/AOutlineButton'

export default function Home() {
  return (
    <div>
      <Main >
      <CenteredText>
        <Image
          src="/assets/familia.png"
          alt="Intermedicina" 
          width={500}
          height={500}
        />
        <Divider/>
        <div className="container">
          <div className="preheader">
            <Image
                src="/assets/logo_intermedicina.svg"
                alt="Intermedicina" 
                width={152}
                height={24}
              />
            <span>Consultas com <strong>Especialistas</strong></span>
          </div>

          <Link href="/contratar"> 
            <ButtonGreen  > 
              <span className="texto"><strong>Quero</strong> fazer parte!</span>
              <FiArrowRight size={24}/> 
            </ButtonGreen>
          </Link>

          <Link href="/login"> 
            <AOutlineButton>
              <span>Sou Intermedicina</span> 
            </AOutlineButton>
          </Link>
        
        </div> 
        </CenteredText>
      </Main>
      
      <Footer/>

      

       
    </div>
  )
}

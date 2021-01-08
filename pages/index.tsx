import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer' 
import { FiArrowRight } from 'react-icons/fi'; 
import SliderItemMedico from '../components/SliderItemMedico'

import Carousel from 'react-elastic-carousel'

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center" >
       
      <div className="w-full">
         <Carousel itemsToShow={1} showArrows={false}>
           <SliderItemMedico 
           nome="Dra. BÁRBARA C. COLNAGO"
           atuacao="ULTRASSONOGRAFIA"
           cidades={["Santa Teresa","Santa Maria de Jetibá"]}
           imagem="/assets/medicos/barbara.png"/> 
               <SliderItemMedico 
           nome="Dra. BÁRBARA C. COLNAGO"
           atuacao="ULTRASSONOGRAFIA"
           cidades={["Santa Teresa","Santa Maria de Jetibá"]}
           imagem="/assets/medicos/barbara.png"/> 
           </Carousel>
      </div>
        <div className="w-full h-0.5 bg-gray-200  mt-3 mx-4" />
        <div className="flex flex-col w-full p-8">
          <div className="flex flex-col w-full items-start">
            <Image
                src="/assets/logo_intermedicina.svg"
                alt="Intermedicina" 
                width={152}
                height={24}
              />
            <span className="text-sm text-cinza text-raleway italic" >Consultas com <strong className="text-sm text-cinza text-raleway-bold italic">Especialistas</strong></span>
          </div>

          <Link href="/contratar"> 
            <div className="flex justify-between bg-verde text-white rounded-md mt-4 mb-4 p-4 items-center" > 
            <div><span className="text-sm text-bold bold">Quero</span> <span className="text-sm text-regular"> fazer parte!</span></div>
              <FiArrowRight size={24}/> 
            </div>
          </Link>

          <Link href="/login"> 
            <div className="rounded-md border-azul border p-4 text-center  ">
              <span className="text-azul text-sm text-regular">Sou Intermedicina </span>
            </div>
          </Link>
        
        </div>  
      </div>
      
      <Footer/>

      

       
    </div>
  )
}

import React from 'react' 
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer' 
import { FiArrowRight } from 'react-icons/fi'; 
import SliderItemMedico from '../components/SliderItemMedico'

import Carousel from 'react-elastic-carousel'
import SliderItemLocal from '../components/SliderItemLocal';

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center" >
       
      <div className="w-full sm:hidden">
         <Carousel itemsToShow={1} showArrows={false}>
           <SliderItemMedico 
           nome="Dra. BÁRBARA C. COLNAGO"
           atuacao="ULTRASSONOGRAFIA"
           cidades={["Santa Teresa","Santa Maria de Jetibá"]}
           imagem="/assets/medicos/barbara.png"/> 

          <SliderItemLocal
           titulo="MERIDIONAL EM CARIACICA"
           descricao="Consultas e Exames com Especialistas" 
           imagem="/assets/locais/meridional-cariacica.png"/> 

          <SliderItemMedico 
           nome="Dr. romulo t. santos"
           atuacao="UROLOGISTA"
           cidades={["Santa Teresa","Santa Maria de Jetibá"]}
           imagem="/assets/medicos/romulo.png"/>  
            
          <SliderItemMedico 
           nome="DrA. RAISSA TOTOLA RUDIO"
           atuacao="ORTODONTIA"
           cidades={["Santa Teresa","Itarana"]}
           imagem="/assets/medicos/raissa.png"/> 
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
            <span className="text-sm text-cinza  raleway-italic" >Consultas com <span className="text-sm text-cinza raleway-bold-italic">Especialistas</span></span>
          </div>

          <Link href="/contratar"> 
            <div className="flex justify-between bg-verde text-white rounded-md mt-4 mb-4 p-4 items-center" > 
            <div><span className="text-sm montserrat-bold">Quero</span> <span className="text-sm montserrat-regular"> fazer parte!</span></div>
              <FiArrowRight size={24}/> 
            </div>
          </Link>

          <a onClick={()=> window.open("https://app.intermedicina.com.br")} href="#"> 
            <div className="rounded-md border-azul border p-4 text-center  ">
              <span className="text-azul text-sm   montserrat-regular">Sou Intermedicina </span>
            </div>
          </a>
        
        </div>  
      </div>
      
      <Footer/>

      

       
    </div>
  )
}

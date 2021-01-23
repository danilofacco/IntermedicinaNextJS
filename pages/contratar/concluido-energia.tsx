 
import React, {   useEffect } from 'react'; 
import HeaderContratar from '../../components/HeaderContratar' 
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'  
import Image from 'next/image'  
 


import { ImWhatsapp as Whatsapp } from 'react-icons/im';

import {ContratarStore} from '../../store/contratar'
 
 
const ConcluidoEnergia: React.FC = () => {
 
 
  useEffect(()=>{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },[])


    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/pagamento/energia"/> 
    <HeaderContratar page={4} cor="azul"/>
    <div className="bg-azul flex w-full h-screen text-white montserrat-regular flex-col pt-8 items-center text-center">
      <Image src="/assets/check_branco_azul.svg" width={32} height={32}/>
      <span className="text-lg mt-2 montserrat-bold">Quase lá!</span>
      <span className="text-sm  ">Recebemos sua Assinatura</span>
      <span className="text-xs my-6  mx-8 text-center">A Intermedicina entrará em contato por telefone, para formalizar a <strong>AUTORIZAÇÃO DE DÉBITO</strong> em seu talão de energia, conforme exigência das concessionárias elétricas.
      </span>

      <a className="text-xs mb-2 text-center" href="tel:08007226967"><strong>DÚVIDAS? </strong>LIGUE 0800 722 6967</a>
      <a href="https://bit.ly/359nBXw" target="_blank"><Whatsapp size={18}/></a>
    

    </div> 
  
 
    </>   );
};
export default ConcluidoEnergia;

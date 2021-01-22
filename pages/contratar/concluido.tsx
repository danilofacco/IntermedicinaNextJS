import React, { useRef, useCallback, useEffect } from 'react'
import HeaderContratar from '../../components/HeaderContratar'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'  
import Image from 'next/image'
import {useRouter} from 'next/router'

import { ImWhatsapp as Whatsapp } from 'react-icons/im'
import { ContratarStore } from '../../store/contratar'
 
const Concluido: React.FC = () => {

  const router = useRouter()

  useEffect(()=>{
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
  },[])

    return (
      <>
    <HeaderVoltarAzul voltar="/"/> 
    <HeaderContratar page={4}/>
    <div className="bg-verde flex w-full h-screen text-white flex-col pt-8 items-center text-center">
        <Image src="/assets/check_branco_verde.svg" width={32} height={32}/>
      <span className="text-lg mt-2 montserrat-bold">Parabéns</span>
      <span className="text-sm my-6 raleway-italic mx-8 text-center">
      Você já pode marcar<br/>
      suas consultas com <span className="raleway-bold-italic">Especialistas.</span>
      </span>

      <button onClick={()=>router.push("/")} className="shadow border rounded bg-verde border-white p-3 text-xs montserrat-bold text-center mb-12">PORTAL DO CLIENTE</button>

      <a className="text-xs mb-2 text-center" href="tel:08007226967"><strong>DÚVIDAS? </strong>LIGUE 0800 722 6967</a>
      <a href="https://web.whatsapp.com/send?phone=5527999897838&text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es!%20Pode%20me%20ajudar?" target="_blank"><Whatsapp size={18}/></a>

    </div> 
  
    </>   );
};
export default Concluido
